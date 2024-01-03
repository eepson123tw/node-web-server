//@ts-nocheck
const http = require("http");
const handleApiRequest = require("./api/handleApiRequest");
const serveStaticFiles = require("./static/serveStaticFiles");

const server = http.createServer((req, res) => {
  let trimmedPath = req.url.replace(/^\/+|\/+$/g, "");
  let method = req.method.toLowerCase();

  if (trimmedPath.startsWith("api/logs")) {
    handleApiRequest(req, res, method);
  } else {
    serveStaticFiles(req, res, trimmedPath);
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
