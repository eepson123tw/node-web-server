# 架構

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
