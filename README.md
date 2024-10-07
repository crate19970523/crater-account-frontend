# 專案名稱
Crater Account Frontend
## 簡介
這是專案的簡要描述。請在此處添加更多關於專案的背景信息。

## 安裝和運行
以下是配置和運行此專案的步驟：

1. 克隆此專案：
    ```sh
    git clone https://github.com/crate19970523/crater-account-frontend
    ```
2. 進入專案目錄：
    ```sh
    cd <專案目錄>
    ```
3. 建立並運行Docker容器：
    ```sh
    docker build -t crater-account-frontend-test .
    docker run --name crater-account-frontend -p 8082:8082 crater-account-frontend-test 
    ```

## Docker 配置
本專案使用Docker進行環境配置。以下是專案中的Docker設定重點：

- 我們修改了Dockerfile配置中的Nginx設定檔。設定檔現在將被直接拷貝到容器內，這樣可以避免因目錄權限問題而導致的Nginx配置失敗。
- 確保設定檔案在容器內的正確位置。

4. 創建一個Pull Request。

## 聯繫方式
如果你有任何問題，可以通過以下方式聯繫我們：

- Email: [s19970523s@gmail.com](mailto:s19970523s@gmail.com)
