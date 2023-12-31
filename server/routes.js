// routes.js
const fs = require("fs");
const path = require("path");

function handleRequest(req, res) {
  let filePath = req.url === "/" ? "./client/index.html" : `./client${req.url}`;

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  const contentTypeHeader = contentType[extname] || "application/octet-stream";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found!");
    } else {
      res.writeHead(200, { "Content-Type": contentTypeHeader });
      res.end(data);
    }
  });
}

module.exports = { handleRequest };
