const VectorBoolean = (() => {
  function toPolygon(obj) {
    const ring = VectorModel.samplePathRing(obj, 16);
    if (!ring || ring.length < 3) return null;
    return [ring];
  }

  function multipolygonToPathObjects(mp, style) {
    const objects = [];
    (mp || []).forEach((poly) => {
      if (!poly?.[0]?.length) return;
      const outer = poly[0];
      const points = outer.map((p) => ({ x: p[0], y: p[1], in: null, out: null }));
      // Close without duplicating first point if already closed
      if (points.length > 1) {
        const a = points[0];
        const b = points[points.length - 1];
        if (Math.hypot(a.x - b.x, a.y - b.y) < 0.05) points.pop();
      }
      if (points.length < 3) return;
      objects.push(
        VectorModel.createPathObject(points, {
          stroke: style.stroke,
          fill: VectorModel.cloneFill(style.fill),
          strokeWidth: style.strokeWidth,
          strokeProfile: style.strokeProfile || "constant",
          opacity: style.opacity,
          strokeLinecap: style.strokeLinecap,
          strokeLinejoin: style.strokeLinejoin,
          dash: style.dash,
          shadow: VectorModel.cloneShadow(style.shadow),
          closed: true,
        })
      );
    });
    return objects;
  }

  function run(op, objects) {
    if (!objects || objects.length < 2) {
      return { ok: false, message: "Select at least two closed shapes." };
    }
    const polys = [];
    const skipped = [];
    objects.forEach((obj) => {
      if (obj.type === "text" || obj.type === "line") {
        skipped.push(obj.type);
        return;
      }
      const poly = toPolygon(obj);
      if (!poly) skipped.push(obj.type);
      else polys.push({ obj, poly });
    });
    if (polys.length < 2) {
      return {
        ok: false,
        message: "Need two or more closed shapes (open paths and text are skipped).",
      };
    }

    // Z-order: later in layer.objects = topmost. Caller should pass top-first or we sort by provided order.
    const styleSrc = polys[0].obj;
    const style = {
      stroke: styleSrc.stroke,
      fill: VectorModel.cloneFill(styleSrc.fill) || "#88c0d0",
      strokeWidth: styleSrc.strokeWidth ?? 2,
      strokeProfile: styleSrc.strokeProfile || "constant",
      opacity: styleSrc.opacity ?? 1,
      strokeLinecap: styleSrc.strokeLinecap || "round",
      strokeLinejoin: styleSrc.strokeLinejoin || "round",
      dash: styleSrc.dash,
      shadow: VectorModel.cloneShadow(styleSrc.shadow),
    };

    const clip = window.PolygonClipping;
    if (!clip) return { ok: false, message: "Polygon clipper not loaded." };

    let result;
    try {
      if (op === "union") {
        result = clip.union.apply(
          clip,
          polys.map((p) => p.poly)
        );
      } else if (op === "intersect") {
        result = clip.intersection.apply(
          clip,
          polys.map((p) => p.poly)
        );
      } else if (op === "exclude" || op === "xor") {
        result = clip.xor.apply(
          clip,
          polys.map((p) => p.poly)
        );
      } else if (op === "subtract") {
        // Topmost (last selected / highest z among selection) minus union of others — Illustrator-like
        const subject = polys[polys.length - 1].poly;
        const others = polys.slice(0, -1).map((p) => p.poly);
        const cutter = others.length === 1 ? others[0] : clip.union.apply(clip, others);
        result = clip.difference(subject, cutter);
      } else {
        return { ok: false, message: "Unknown boolean op." };
      }
    } catch (err) {
      return { ok: false, message: "Boolean failed: " + (err.message || err) };
    }

    const pathObjects = multipolygonToPathObjects(result, style);
    if (!pathObjects.length) {
      return { ok: false, message: "Boolean produced an empty result." };
    }
    return { ok: true, objects: pathObjects, removeIds: polys.map((p) => p.obj.id) };
  }

  return { run, toPolygon };
})();
