// @ts-nocheck
const fs = require("fs");
const path = require("path");
const handleLogUpdate = require("../utils/handleLogUpdate");

function handleApiRequest(req, res, method) {
  const logFilePath = path.join(__dirname, "..", "data", "log.json");

  // 處理GET請求: 讀取日誌文件並返回
  if (method === "get") {
    fs.readFile(logFilePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Server error");
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
  }
  // 處理POST、PUT和DELETE請求: 讀取請求主體，然後更新日誌文件
  else if (["post", "put", "delete"].includes(method)) {
    let body = "";

    // 接收數據
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // 數據接收完畢，調用 handleLogUpdate 進行處理
    req.on("end", () => {
      handleLogUpdate(method, body, logFilePath, res);
    });
  }
  // 不支持的HTTP方法
  else {
    res.writeHead(405);
    res.end("Method Not Allowed");
  }
}

module.exports = handleApiRequest;
