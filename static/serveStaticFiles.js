// @ts-nocheck
const fs = require("fs");
const path = require("path");

function serveStaticFiles(req, res, trimmedPath) {
  // 設定默認文件路徑為 index.html，如果請求的路徑不是空的，則使用該路徑
  let filePath = path.join(
    __dirname,
    "..",
    "public",
    trimmedPath === "" ? "index.html" : trimmedPath
  );

  // 獲取文件擴展名，用於後續確定Content-Type
  let extname = path.extname(filePath);

  // 如果沒有文件擴展名，假設它是一個HTML文件
  if (!extname) {
    filePath += ".html";
  }

  // 根據文件類型設定Content-Type
  const contentTypeMap = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    // 可以根據需要添加更多文件類型
  };

  const contentType = contentTypeMap[extname] || "text/plain";

  // 讀取並返回文件內容
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // 文件未找到，返回404錯誤頁面
        fs.readFile(
          path.join(__dirname, "..", "public", "404.html"),
          (error, content404) => {
            if (error) {
              res.writeHead(500);
              return res.end("Server error");
            }
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content404, "utf-8");
          }
        );
      } else {
        // 發生其他錯誤，返回500錯誤
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      // 成功找到文件，返回相應內容
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
}

module.exports = serveStaticFiles;
