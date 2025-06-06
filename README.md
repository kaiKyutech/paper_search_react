# paper_search_react

このリポジトリは [paper_search](https://github.com/kaiKyutech/paper_search) を参考に、React と FastAPI で構成し直したサンプルアプリです。

## 使い方

Docker を用いて簡単に起動できます。

```bash
# ビルド
docker build -t paper-search .
# 実行
docker run -p 8000:8000 paper-search
```

ブラウザで `http://localhost:8000` を開くと React フロントエンドが表示されます。

## 開発環境

- フロントエンド: React + Vite
- バックエンド: FastAPI

バックエンドは Semantic Scholar API を利用して論文検索を行います。
