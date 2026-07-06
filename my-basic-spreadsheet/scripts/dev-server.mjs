import http from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT || 3000);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function getMimeType(filePath) {
  return MIME_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

async function serveStatic(requestUrl) {
  const url = new URL(requestUrl, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/") {
    pathname = "/index.html";
  }

  const filePath = path.resolve(ROOT_DIR, `.${pathname}`);

  if (!filePath.startsWith(ROOT_DIR)) {
    return { status: 403, body: "Forbidden" };
  }

  try {
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, "index.html");

      try {
        const indexStats = await fs.stat(indexPath);
        if (indexStats.isFile()) {
          return {
            status: 200,
            body: await fs.readFile(indexPath),
            contentType: getMimeType(indexPath),
          };
        }
      } catch {
        return { status: 403, body: "Directory listing is disabled." };
      }
    }

    return {
      status: 200,
      body: await fs.readFile(filePath),
      contentType: getMimeType(filePath),
    };
  } catch {
    return { status: 404, body: "Not found" };
  }
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Method not allowed");
      return;
    }

    const result = await serveStatic(request.url);

    response.writeHead(result.status, {
      "Content-Type": result.contentType ?? "text/plain; charset=utf-8",
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    response.end(result.body);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Spreadsheet running at http://localhost:${PORT}`);
});
