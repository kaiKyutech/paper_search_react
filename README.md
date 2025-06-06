# paper_search_react

`paper_search_react` は [paper_search](https://github.com/kaiKyutech/paper_search) の機能を React(TypeScript) フロントエンドと FastAPI バックエンドで再実装するためのリポジトリです。

## ディレクトリ構成
```
paper_search_react/
├── backend/       # FastAPI アプリケーション
└── frontend/      # React(TypeScript) フロントエンド
```

それぞれの簡単な起動方法は以下の通りです。

### バックエンド
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### フロントエンド
```bash
cd frontend
npm install
npm run dev
```
