# node-web-server

## 簡介

node-web-server 是一款基於 Node.js 的 Web 服務器，專門用於操作和管理日誌文件。這個服務可以讀取、更新、刪除和創建 log.json 檔案中的數據，並將操作記錄保存在一個文本文件中。

## 功能特色

- **日誌管理**: 支持 CRUD 操作，方便管理日誌數據。
- **靜態文件服務**: 提供靜態資源的訪問，如 HTML、CSS 和 JavaScript 文件。
- **日誌追踪**: 操作過程會被記錄到 .txt 文件中，便於追踪和回顧。

## 快速開始

1. **安裝依賴**: 使用 `npm install` 安裝所需的依賴。
2. **啟動服務器**: 使用 `node server.js` 啟動服務器。
3. **訪問應用**: 在瀏覽器中訪問 `http://localhost:8080`。

## 目錄結構

```bash
/your-app
│
├── server.js               # 伺服器入口點
├── api
│   └── handleApiRequest.js # 處理API請求的函數
├── static
│   └── serveStaticFiles.js # 處理靜態文件請求的函數
├── utils
│   └── handleLogUpdate.js  # 處理日誌更新的工具函數
├── data
│   └── log.json            # 日誌文件
└── public
    ├── index.html          # 主頁面
    ├── 404.html            # 404錯誤頁面
    └── ...                 # 其他靜態資源
```

## 使用指南

### 日誌文件操作

- **查看日誌**: 透過訪問 `http://localhost:8080/api/logs` 查看日誌。
- **更新日誌**: 使用相應的 HTTP 請求方法對 `api/logs` 進行操作。

### 靜態文件訪問

- **訪問靜態頁面**: 直接訪問 `http://localhost:8080/` 加上文件名。

## 貢獻指南

歡迎對本項目提出建議和改進。請先閱讀貢獻指南，然後提交 pull request。

## 授權協議

本項目採用 MIT 授權協議。詳情請參閱 LICENSE 文件。
