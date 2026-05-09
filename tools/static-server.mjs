import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const root = process.cwd();
const port = readPort();

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
};

const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method ?? "")) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method Not Allowed");
    return;
  }

  const target = resolveRequestPath(request.url ?? "/");
  if (!target) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await resolveFile(target);
    const fileStat = await stat(file);

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Length": fileStat.size,
      "Content-Type": contentTypes[extname(file).toLowerCase()] ?? "application/octet-stream",
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(file).pipe(response);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 500);
    response.end(error.code === "ENOENT" ? "Not Found" : "Internal Server Error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}`);
});

process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);

function readPort() {
  const index = process.argv.indexOf("--port");
  const value = index >= 0 ? process.argv[index + 1] : process.env.PORT;
  const parsed = Number(value ?? 4173);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65_535) {
    throw new Error(`Invalid port: ${value}`);
  }

  return parsed;
}

function resolveRequestPath(rawUrl) {
  const { pathname } = new URL(rawUrl, "http://localhost");
  const decodedPath = decodeURIComponent(pathname);
  const target = resolve(root, `.${decodedPath}`);

  if (target !== root && !target.startsWith(`${root}${sep}`)) {
    return null;
  }

  return target;
}

async function resolveFile(target) {
  const initialStat = await stat(target);

  if (initialStat.isDirectory()) {
    return join(target, "index.html");
  }

  if (!initialStat.isFile()) {
    const error = new Error("Not Found");
    error.code = "ENOENT";
    throw error;
  }

  return target;
}

function closeServer() {
  server.close(() => process.exit(0));
}
