// @ts-nocheck
// 獲取頁面元素
const logContentDiv = document.getElementById("logContent");
const logForm = document.getElementById("logForm");
const section = document.getElementById("section");
console.log("這是主頁的 JavaScript 檔案。");

// 頁面加載時獲取並顯示日誌內容
document.addEventListener("DOMContentLoaded", () => {
  // 從URL中提取文件名
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  let pageName = pathParts.pop() || "index";
  // 如果路徑中包含文件擴展名，去除它
  pageName = pageName.split(".")[0];

  fetchLogData(pageName);

  const selectElement = document.getElementById("section");
  const currentPath = window.location.pathname;

  // 假設你的 URL 結構是像 /about.html
  // 以下代碼將提取 'about' 並將選項設為對應值
  const currentPage = currentPath.split("/").pop().split(".").shift();
  selectElement.value = currentPage;

  selectElement.addEventListener("change", function (event) {
    const selectedValue = event.target.value;
    window.location = "/" + selectedValue + ".html";
  });
});
// 獲取特定部分的日誌數據
function fetchLogData(section) {
  fetch("/api/logs")
    .then((response) => response.json())
    .then((data) => {
      if (data[section]) {
        displayLogEntries(data[section]);
      }
    })
    .catch((error) => console.error("Error fetching log data:", error));
}

// 顯示日誌條目 函數以包含刪除按鈕的邏輯
function displayLogEntries(logEntries) {
  logContentDiv.innerHTML = "";
  Object.entries(logEntries).forEach(([key, value]) => {
    const entry = document.createElement("div");
    entry.innerHTML = `<strong>${key}:</strong> ${value} `;

    // 創建刪除按鈕
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      deleteLogEntry(section.value, key);
    };

    // 添加按鈕到日誌條目
    entry.appendChild(deleteBtn);
    logContentDiv.appendChild(entry);
  });
}

// 實現刪除日誌條目的函數
function deleteLogEntry(section, key) {
  // 創建刪除請求的數據
  const deleteData = {};
  deleteData[section] = { [key]: null };

  // 發送刪除請求
  fetch("/api/logs", {
    method: "DELETE", // 使用 DELETE 方法
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deleteData),
  })
    .then((response) => response.json())
    .then((data) => {
      // 刪除成功後更新顯示的日誌條目
      displayLogEntries(data[section]);
    })
    .catch((error) => console.error("Error deleting log entry:", error));
}

// 更新日誌條目
function updateLogData(method, updateData, currentSection) {
  fetch("/api/logs", {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((data) => {
      displayLogEntries(data[currentSection]);
    })
    .catch((error) => console.error("Error updating log data:", error));
}

// 表單提交事件處理
logForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const currentSection = document.getElementById("section").value;
  const key = document.getElementById("key").value;
  const value = document.getElementById("value").value;
  const updateData = { [currentSection]: { [key]: value } };
  updateLogData("POST", updateData, currentSection);
});

// 新增部分：窗口加載時加載日誌數據和表單提交處理
window.onload = function () {
  fetchLogData();
};
