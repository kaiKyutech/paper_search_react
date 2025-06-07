# Codex エージェント向けガイドライン

以下は本リポジトリで作業を行う際の指針です。変更を加える前に必ず目を通してください。

## 現在のディレクトリ構成

```
paper_search_react/
├── AGENTS.md
├── Dockerfile
├── backend
│   ├── app
│   │   └── main.py
│   └── requirements.txt
└── frontend
    ├── eslint.config.js
    ├── index.html
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── PaperSearchUI.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── ChatPanel.jsx
    │   │   ├── PaperList.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── SearchOptions.jsx
    │   ├── index.css
    │   └── main.jsx
    └── vite.config.js
```

ファイル構成を変更した際は `pulling_files.py` を実行し、このツリー情報を更新してからコミットしてください。

## コードスタイル

### Python (FastAPI)
- [PEP8](https://pep8-ja.readthedocs.io/ja/latest/) に準拠
- インデントは4スペース
- クラス名は **PascalCase**
- 変数名・関数名は **snake_case**
- コメントおよび docstring は日本語で記述

### TypeScript / React
- `Prettier` と `ESLint` の利用を推奨
- インデントは2スペース
- コンポーネント名は **PascalCase**
- 変数名・関数名は **camelCase**
- コメントは日本語で記述
- UI 部品は再利用可能な形で `components/` に配置
- API アクセスは `utils/apiClient.ts` にまとめること
- 可能であれば `material-ui` を利用して視認性の高い UI を心掛ける

## Pull Request
- 本文は日本語で作成すること
- 変更内容の概要、動作確認手順、関連 Issue があれば記載してください

