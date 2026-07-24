const VectorSvgIO = (() => {
  function parseColor(v, fallback) {
    if (v == null || v === "none" || v === "transparent") return null;
    const s = String(v).trim();
    if (!s || s.startsWith("url(")) return fallback ?? null;
    return s;
  }

  function parseFloatAttr(el, name, fallback = 0) {
    const v = el.getAttribute(name);
    if (v == null || v === "") return fallback;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function parseTransform(attr) {
    const t = { tx: 0, ty: 0, rotation: 0, sx: 1, sy: 1 };
    if (!attr) return t;
    const re = /(matrix|translate|scale|rotate)\s*\(([^)]*)\)/gi;
    let m;
    while ((m = re.exec(attr))) {
      const kind = m[1].toLowerCase();
      const nums = m[2]
        .trim()
        .split(/[\s,]+/)
        .map(parseFloat)
        .filter((n) => Number.isFinite(n));
      if (kind === "translate") {
        t.tx += nums[0] || 0;
        t.ty += nums[1] || 0;
      } else if (kind === "scale") {
        t.sx *= nums[0] ?? 1;
        t.sy *= nums[1] ?? nums[0] ?? 1;
      } else if (kind === "rotate") {
        const deg = nums[0] || 0;
        t.rotation += (deg * Math.PI) / 180;
        if (nums.length >= 3) {
          // rotate(a cx cy) ≈ translate(cx,cy) rotate(a) translate(-cx,-cy)
          const cx = nums[1];
          const cy = nums[2];
          t.tx += cx;
          t.ty += cy;
          // approximate by leaving geometric coords; bake offset into tx after rotation is imperfect
          const cos = Math.cos(t.rotation);
          const sin = Math.sin(t.rotation);
          const dx = -cx;
          const dy = -cy;
          t.tx += dx * cos - dy * sin;
          t.ty += dx * sin + dy * cos;
        }
      } else if (kind === "matrix" && nums.length >= 6) {
        t.sx *= nums[0];
        t.sy *= nums[3];
        t.tx += nums[4];
        t.ty += nums[5];
        if (Math.abs(nums[1]) > 0.001 || Math.abs(nums[2]) > 0.001) {
          t.rotation += Math.atan2(nums[1], nums[0]);
        }
      }
    }
    return t;
  }

  function styleFromEl(el, inherited) {
    const fillAttr = el.getAttribute("fill");
    const strokeAttr = el.getAttribute("stroke");
    const style = {
      fill: fillAttr != null ? parseColor(fillAttr, null) : inherited.fill,
      stroke: strokeAttr != null ? parseColor(strokeAttr, null) : inherited.stroke,
      strokeWidth: el.hasAttribute("stroke-width")
        ? parseFloatAttr(el, "stroke-width", inherited.strokeWidth)
        : inherited.strokeWidth,
      opacity: el.hasAttribute("opacity") ? parseFloatAttr(el, "opacity", 1) : inherited.opacity,
      strokeLinecap: el.getAttribute("stroke-linecap") || inherited.strokeLinecap,
      strokeLinejoin: el.getAttribute("stroke-linejoin") || inherited.strokeLinejoin,
      dash: inherited.dash,
    };
    const dash = el.getAttribute("stroke-dasharray");
    if (dash && dash !== "none") {
      const parts = dash
        .trim()
        .split(/[\s,]+/)
        .map(parseFloat)
        .filter((n) => Number.isFinite(n) && n > 0);
      style.dash = parts.length >= 2 ? [parts[0], parts[1]] : parts.length === 1 ? [parts[0], parts[0]] : null;
    }
    return style;
  }

  function parsePathD(d) {
    if (!d) return [];
    const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
    const subpaths = [];
    let points = [];
    let closed = false;
    let i = 0;
    let cx = 0;
    let cy = 0;
    let startX = 0;
    let startY = 0;
    let lastCmd = "";

    function flush() {
      if (points.length) {
        subpaths.push({ points, closed });
      }
      points = [];
      closed = false;
    }

    function num() {
      return parseFloat(tokens[i++]);
    }

    while (i < tokens.length) {
      let cmd = tokens[i];
      if (/[a-zA-Z]/.test(cmd)) {
        i++;
        lastCmd = cmd;
      } else {
        cmd = lastCmd;
      }
      const abs = cmd === cmd.toUpperCase();
      const c = cmd.toUpperCase();

      if (c === "M") {
        flush();
        cx = abs ? num() : cx + num();
        cy = abs ? num() : cy + num();
        startX = cx;
        startY = cy;
        points.push({ x: cx, y: cy, in: null, out: null });
        lastCmd = abs ? "L" : "l";
        while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) {
          cx = abs ? num() : cx + num();
          cy = abs ? num() : cy + num();
          points.push({ x: cx, y: cy, in: null, out: null });
        }
      } else if (c === "L") {
        while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) {
          cx = abs ? num() : cx + num();
          cy = abs ? num() : cy + num();
          points.push({ x: cx, y: cy, in: null, out: null });
        }
      } else if (c === "H") {
        while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) {
          cx = abs ? num() : cx + num();
          points.push({ x: cx, y: cy, in: null, out: null });
        }
      } else if (c === "V") {
        while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) {
          cy = abs ? num() : cy + num();
          points.push({ x: cx, y: cy, in: null, out: null });
        }
      } else if (c === "C") {
        while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) {
          const x1 = abs ? num() : cx + num();
          const y1 = abs ? num() : cy + num();
          const x2 = abs ? num() : cx + num();
          const y2 = abs ? num() : cy + num();
          const x = abs ? num() : cx + num();
          const y = abs ? num() : cy + num();
          const prev = points[points.length - 1];
          if (prev) prev.out = { x: x1 - prev.x, y: y1 - prev.y };
          points.push({ x, y, in: { x: x2 - x, y: y2 - y }, out: null });
          cx = x;
          cy = y;
        }
      } else if (c === "Q") {
        while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) {
          const qx = abs ? num() : cx + num();
          const qy = abs ? num() : cy + num();
          const x = abs ? num() : cx + num();
          const y = abs ? num() : cy + num();
          const prev = points[points.length - 1];
          // Approximate quadratic as cubic
          if (prev) {
            prev.out = { x: ((qx - prev.x) * 2) / 3, y: ((qy - prev.y) * 2) / 3 };
          }
          points.push({
            x,
            y,
            in: { x: ((qx - x) * 2) / 3, y: ((qy - y) * 2) / 3 },
            out: null,
          });
          cx = x;
          cy = y;
        }
      } else if (c === "Z") {
        closed = true;
        cx = startX;
        cy = startY;
      } else if (c === "A") {
        // Approximate arcs as line to endpoint (solid fallback)
        while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) {
          num();
          num();
          num();
          num();
          num();
          cx = abs ? num() : cx + num();
          cy = abs ? num() : cy + num();
          points.push({ x: cx, y: cy, in: null, out: null });
        }
      } else {
        // Skip unknown
        while (i < tokens.length && !/[a-zA-Z]/.test(tokens[i])) i++;
      }
    }
    flush();
    return subpaths;
  }

  function elementToObjects(el, inherited) {
    const tag = el.tagName?.toLowerCase();
    if (!tag || tag === "defs" || tag === "clippath" || tag === "mask" || tag === "style") return [];
    const style = styleFromEl(el, inherited);
    const localT = parseTransform(el.getAttribute("transform"));
    const objects = [];

    function withTransform(obj) {
      obj.transform = {
        tx: localT.tx,
        ty: localT.ty,
        rotation: localT.rotation,
        sx: localT.sx,
        sy: localT.sy,
      };
      return obj;
    }

    if (tag === "g" || tag === "svg" || tag === "a") {
      const childInherited = { ...style };
      Array.from(el.children || []).forEach((child) => {
        objects.push(...elementToObjects(child, childInherited));
      });
      // Bake group transform into children approximately via compose
      if (localT.tx || localT.ty || localT.rotation || localT.sx !== 1 || localT.sy !== 1) {
        objects.forEach((obj) => {
          obj.transform.tx += localT.tx;
          obj.transform.ty += localT.ty;
          obj.transform.rotation += localT.rotation;
          obj.transform.sx *= localT.sx;
          obj.transform.sy *= localT.sy;
        });
      }
      return objects;
    }

    if (tag === "rect") {
      const obj = VectorModel.createRectObject(
        parseFloatAttr(el, "x"),
        parseFloatAttr(el, "y"),
        parseFloatAttr(el, "width"),
        parseFloatAttr(el, "height"),
        style
      );
      objects.push(withTransform(obj));
    } else if (tag === "circle") {
      const cx = parseFloatAttr(el, "cx");
      const cy = parseFloatAttr(el, "cy");
      const r = parseFloatAttr(el, "r");
      const obj = VectorModel.createEllipseObject(cx - r, cy - r, r * 2, r * 2, style);
      objects.push(withTransform(obj));
    } else if (tag === "ellipse") {
      const cx = parseFloatAttr(el, "cx");
      const cy = parseFloatAttr(el, "cy");
      const rx = parseFloatAttr(el, "rx");
      const ry = parseFloatAttr(el, "ry");
      const obj = VectorModel.createEllipseObject(cx - rx, cy - ry, rx * 2, ry * 2, style);
      objects.push(withTransform(obj));
    } else if (tag === "line") {
      const obj = VectorModel.createLineObject(
        parseFloatAttr(el, "x1"),
        parseFloatAttr(el, "y1"),
        parseFloatAttr(el, "x2"),
        parseFloatAttr(el, "y2"),
        style
      );
      objects.push(withTransform(obj));
    } else if (tag === "polyline" || tag === "polygon") {
      const raw = (el.getAttribute("points") || "")
        .trim()
        .split(/[\s,]+/)
        .map(parseFloat)
        .filter((n) => Number.isFinite(n));
      const pts = [];
      for (let i = 0; i + 1 < raw.length; i += 2) {
        pts.push({ x: raw[i], y: raw[i + 1], in: null, out: null });
      }
      if (pts.length >= 2) {
        const obj = VectorModel.createPathObject(pts, {
          ...style,
          closed: tag === "polygon",
          fill: tag === "polygon" ? style.fill : null,
        });
        objects.push(withTransform(obj));
      }
    } else if (tag === "path") {
      const subpaths = parsePathD(el.getAttribute("d") || "");
      subpaths.forEach((sp) => {
        if (sp.points.length < 2) return;
        const obj = VectorModel.createPathObject(sp.points, {
          ...style,
          closed: sp.closed,
          fill: sp.closed ? style.fill : null,
        });
        objects.push(withTransform(obj));
      });
    } else if (tag === "text") {
      const text = (el.textContent || "").trim();
      if (text) {
        const obj = VectorModel.createTextObject(
          parseFloatAttr(el, "x"),
          parseFloatAttr(el, "y"),
          text,
          {
            fill: style.fill || style.stroke || "#000",
            opacity: style.opacity,
            fontSize: parseFloatAttr(el, "font-size", 32),
            fontFamily: el.getAttribute("font-family") || undefined,
            fontWeight: el.getAttribute("font-weight") || "normal",
            textAlign:
              el.getAttribute("text-anchor") === "middle"
                ? "center"
                : el.getAttribute("text-anchor") === "end"
                  ? "right"
                  : "left",
          }
        );
        objects.push(withTransform(obj));
      }
    }

    return objects;
  }

  function importSvgText(svgText, fileName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");
    if (doc.querySelector("parsererror")) {
      throw new Error("Invalid SVG");
    }
    const root = doc.documentElement;
    const inherited = {
      fill: parseColor(root.getAttribute("fill"), null),
      stroke: parseColor(root.getAttribute("stroke"), "#000000"),
      strokeWidth: parseFloatAttr(root, "stroke-width", 2),
      opacity: 1,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      dash: null,
    };
    const objects = elementToObjects(root, inherited);
    const name = (fileName || "Imported SVG").replace(/\.[^.]+$/, "");
    return { name, objects };
  }

  function importSvgFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          resolve(importSvgText(String(reader.result || ""), file.name));
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  return { importSvgText, importSvgFile, parsePathD };
})();
