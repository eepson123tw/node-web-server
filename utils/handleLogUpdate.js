// @ts-nocheck
const fs = require("fs");
const path = require("path");
function handleLogUpdate(method, body, filePath, res) {
  console.log("Received request:", method, body, filePath);
  const logFilePath = path.join(__dirname, "../data/log.txt");

  // 首先讀取現有的日誌數據
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server error");
      return;
    }

    let logs = data ? JSON.parse(data) : {};
    let newEntry = JSON.parse(body);

    if (method === "post" || method === "put") {
      // 對於 POST 和 PUT 請求，更新或添加日誌條目
      mergeLogs(logs, newEntry);
    } else if (method === "delete") {
      // 對於 DELETE 請求，刪除指定的日誌條目
      deleteLogs(logs, newEntry);
    }

    // 將更新後的日誌數據寫回文件
    fs.writeFile(filePath, JSON.stringify(logs, null, 2), (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server error");
        return;
      }
      // 写入 log.txt 文件
      updateLogTxtFile(logs, logFilePath);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(logs));
    });
  });
}

function mergeLogs(logs, newEntry) {
  // 將新條目合併進現有日誌
  Object.keys(newEntry).forEach((section) => {
    if (!logs[section]) {
      logs[section] = {};
    }
    Object.assign(logs[section], newEntry[section]);
  });
}

function deleteLogs(logs, newEntry) {
  // 刪除指定的日誌條目
  Object.keys(newEntry).forEach((section) => {
    if (logs[section]) {
      Object.keys(newEntry[section]).forEach((key) => {
        delete logs[section][key];
      });
    }
  });
}

function updateLogTxtFile(logs, logFilePath) {
  // 将日志对象转换为文本格式
  let logText = "";
  for (const section in logs) {
    logText += `[${section}]\n`;
    for (const [key, value] of Object.entries(logs[section])) {
      logText += `${key}: ${value}\n`;
    }
    logText += "\n"; // 添加空行以分隔不同的部分
  }

  // 写入 log.txt 文件
  fs.writeFile(logFilePath, logText, (err) => {
    if (err) {
      console.error("Error writing to log.txt:", err);
    } else {
      console.log("log.txt updated successfully");
    }
  });
}
module.exports = handleLogUpdate;
