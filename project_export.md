## プロジェクト構成

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

### File: AGENTS.md

```markdown
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


```

### File: Dockerfile

```
# Frontend build stage
FROM node:20 AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend ./
RUN npm run build

# Backend stage
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt
COPY backend ./backend
COPY --from=frontend /app/frontend/dist ./frontend/dist
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]

```

### File: frontend/eslint.config.js

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

```

### File: frontend/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

### File: frontend/vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})

```

### File: frontend/public/vite.svg

```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>

```

### File: frontend/src/App.css

```css
#root {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}

.search-bar textarea {
  width: 100%;
  margin-top: 0.5rem;
}

.paper-list li {
  cursor: pointer;
  margin: 1rem 0;
  padding: 0.5rem;
  border: 1px solid #ccc;
}

.chat-panel {
  margin-top: 2rem;
}

.chat-history {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

```

### File: frontend/src/App.jsx

```javascript
import PaperSearchUI from './PaperSearchUI.jsx';

export default function App() {
  return <PaperSearchUI />;
}


```

### File: frontend/src/PaperSearchUI.jsx

```javascript
import React, { useState } from 'react';
import {
  Search,
  X,
  FileText,
  Calendar,
  Users,
  ExternalLink,
  Eye,
  Star,
  Settings,
  UserCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const PaperSearchUI = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [viewMode, setViewMode] = useState('results');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('keyword');
  const [filters, setFilters] = useState({
    year: '',
    category: '',
    sortBy: 'relevance'
  });

  const mockPapers = [
    {
      id: 1,
      title: 'Attention Is All You Need',
      authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit'],
      abstract:
        'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
      year: 2017,
      venue: 'NIPS',
      category: 'Machine Learning',
      citations: 45230,
      pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
      arxivId: '1706.03762',
      tags: ['transformer', 'attention', 'neural networks']
    },
    {
      id: 2,
      title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding',
      authors: ['Jacob Devlin', 'Ming-Wei Chang', 'Kenton Lee', 'Kristina Toutanova'],
      abstract:
        'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.',
      year: 2019,
      venue: 'NAACL',
      category: 'Natural Language Processing',
      citations: 32145,
      pdfUrl: 'https://arxiv.org/pdf/1810.04805.pdf',
      arxivId: '1810.04805',
      tags: ['bert', 'pre-training', 'language model']
    },
    {
      id: 3,
      title: 'ResNet: Deep Residual Learning for Image Recognition',
      authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren', 'Jian Sun'],
      abstract:
        'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions.',
      year: 2016,
      venue: 'CVPR',
      category: 'Computer Vision',
      citations: 89123,
      pdfUrl: 'https://arxiv.org/pdf/1512.03385.pdf',
      arxivId: '1512.03385',
      tags: ['resnet', 'deep learning', 'image recognition']
    },
    {
      id: 4,
      title: 'Generative Adversarial Networks',
      authors: ['Ian J. Goodfellow', 'Jean Pouget-Abadie', 'Mehdi Mirza'],
      abstract:
        'We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability that a sample came from the training data rather than G.',
      year: 2014,
      venue: 'NIPS',
      category: 'Machine Learning',
      citations: 67891,
      pdfUrl: 'https://arxiv.org/pdf/1406.2661.pdf',
      arxivId: '1406.2661',
      tags: ['gan', 'generative model', 'adversarial training']
    }
  ];

  const categories = ['All', 'Machine Learning', 'Computer Vision', 'Natural Language Processing', 'Robotics', 'Theory'];
  const sortOptions = [
    { value: 'relevance', label: '関連度' },
    { value: 'citations', label: '被引用数' },
    { value: 'year', label: '年度（新しい順）' },
    { value: 'year_old', label: '年度（古い順）' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        let results = mockPapers.filter((paper) =>
          paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
          paper.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          paper.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        if (filters.category && filters.category !== 'All') {
          results = results.filter((paper) => paper.category === filters.category);
        }

        results.sort((a, b) => {
          switch (filters.sortBy) {
            case 'citations':
              return b.citations - a.citations;
            case 'year':
              return b.year - a.year;
            case 'year_old':
              return a.year - b.year;
            default:
              return 0;
          }
        });

        setSearchResults(results);
        setIsSearched(true);
        setIsLoading(false);
      }, 800);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearched(false);
    setSearchResults([]);
    setViewMode('results');
  };

  const resetSearch = () => {
    clearSearch();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen ? (
        <aside className="w-56 bg-white border-r flex flex-col relative">
          <div className="p-4 flex-1 space-y-2">
            <button
              type="button"
              onClick={() => setViewMode('results')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                viewMode === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              検索結果
            </button>
            <button
              type="button"
              onClick={() => setViewMode('network')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                viewMode === 'network' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              ネットワーク
            </button>
            <button
              type="button"
              onClick={() => setViewMode('settings')}
              className={`w-full flex items-center text-left px-3 py-2 rounded-md text-sm font-medium ${
                viewMode === 'settings' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />設定
            </button>
          </div>
          <div className="p-4 border-t flex items-center space-x-2 text-sm">
            <UserCircle className="w-4 h-4" />
            <span>ゲスト</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="absolute top-2 -right-3 p-1 bg-white border rounded-full shadow"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </aside>
      ) : (
        <div className="w-8 bg-white border-r flex flex-col items-center">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="mt-2 p-1 rounded hover:bg-gray-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={resetSearch}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <FileText className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">Paper Search</h1>
              </button>
              <div className="text-sm text-gray-500">学術論文検索エンジン</div>
            </div>
          </div>
        </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-4 flex space-x-4">
            <button
              type="button"
              onClick={() => setSearchMode('keyword')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                searchMode === 'keyword'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              キーワード検索
            </button>
            <button
              type="button"
              onClick={() => setSearchMode('ai')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                searchMode === 'ai'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              AI検索
            </button>
          </div>

          <div className="relative mb-4">
            <div className="relative flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                className="flex-1 outline-none text-gray-700 text-lg bg-white"
                placeholder="論文のタイトル、著者、キーワードで検索..."
              />
              {searchQuery && (
                <button type="button" onClick={clearSearch} className="p-1 hover:bg-gray-100 rounded-full mr-2">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                {isLoading ? '検索中...' : '検索'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">カテゴリ:</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat === 'All' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">ソート:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {isSearched && (
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div>
            {viewMode === 'results' && (
              <>
                <div className="mb-4 text-sm text-gray-600">{searchResults.length} 件の論文が見つかりました</div>
                <div className="space-y-6">
                  {searchResults.map((paper) => (
                    <div key={paper.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-2">{paper.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Star className="w-4 h-4" />
                    <span>{paper.citations.toLocaleString()} 引用</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>
                      {paper.authors.slice(0, 3).join(', ')}
                      {paper.authors.length > 3 ? ' et al.' : ''}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {paper.year} • {paper.venue}
                    </span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{paper.category}</span>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{paper.abstract}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>PDF</span>
                    </a>
                    <a
                      href={`https://arxiv.org/abs/${paper.arxivId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>arXiv</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {searchResults.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">検索結果が見つかりません</h3>
              <p className="text-gray-500">別のキーワードで検索してみてください</p>
            </div>
          )}
        </>
      )}

            {viewMode === 'network' && (
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-600">
                ネットワーク表示はまだ実装されていません
              </div>
            )}
            {viewMode === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-600">
                設定画面はまだ実装されていません
              </div>
            )}
          </div>
        </div>
      )}

      {!isSearched && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">論文を検索しましょう</h2>
            <p className="text-gray-600 mb-6">タイトル、著者名、キーワードで最新の学術論文を検索できます</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Search className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">高度な検索</h3>
                  <p className="text-sm text-gray-600">タイトル、要約、著者名から包括的に検索</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">被引用数順</h3>
                  <p className="text-sm text-gray-600">影響力の高い論文を優先的に表示</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FileText className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">PDF直接アクセス</h3>
                  <p className="text-sm text-gray-600">論文PDFに直接アクセス可能</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperSearchUI;


```

### File: frontend/src/index.css

```css
body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
}

```

### File: frontend/src/main.jsx

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

### File: frontend/src/components/ChatPanel.jsx

```javascript
import { useState } from 'react'

export default function ChatPanel({ paper }) {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')

  const send = async () => {
    if (!input) return
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input, paper })
    })
    const data = await resp.json()
    setHistory([...history, { role: 'user', content: input }, { role: 'assistant', content: data.answer }])
    setInput('')
  }

  if (!paper) return <p>論文を選択してください</p>

  return (
    <div className="chat-panel">
      <h2>{paper.title}</h2>
      <div className="chat-history">
        {history.map((msg, idx) => (
          <div key={idx} className={msg.role}>{msg.content}</div>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} />
      <button onClick={send}>送信</button>
    </div>
  )
}

```

### File: frontend/src/components/PaperList.jsx

```javascript
export default function PaperList({ papers, onSelect }) {
  if (!papers || papers.length === 0) {
    return <p>結果がありません</p>
  }
  return (
    <ul className="paper-list">
      {papers.map((p, i) => (
        <li key={i} onClick={() => onSelect(p)}>
          <strong>{p.title}</strong>
          <p>{p.abstract}</p>
        </li>
      ))}
    </ul>
  )
}

```

### File: frontend/src/components/SearchBar.jsx

```javascript
import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('keyword')

  const triggerSearch = () => {
    if (!query) return
    onSearch({ query, mode })
  }

  return (
    <div className="search-bar">
      <div>
        <label>
          <input
            type="radio"
            name="mode"
            value="keyword"
            checked={mode === 'keyword'}
            onChange={() => setMode('keyword')}
          />
          キーワード検索
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="ai1"
            checked={mode === 'ai1'}
            onChange={() => setMode('ai1')}
          />
          AI検索1
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="ai2"
            checked={mode === 'ai2'}
            onChange={() => setMode('ai2')}
          />
          AI検索2
        </label>
      </div>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ここに入力..."
        rows={3}
      />
      <button onClick={triggerSearch}>検索</button>
    </div>
  )
}

```

### File: frontend/src/components/SearchOptions.jsx

```javascript
import { useState } from 'react'

export default function SearchOptions({ onChange }) {
  const [numPapers, setNumPapers] = useState(10)
  const [yearFrom, setYearFrom] = useState(2020)
  const [yearTo, setYearTo] = useState(2025)
  const [engine, setEngine] = useState('semantic')

  const notify = () => {
    onChange({ numPapers, yearFrom, yearTo, engine })
  }

  return (
    <div className="search-options">
      <div>
        <label>検索数: {numPapers}
          <input
            type="range"
            min="1"
            max="50"
            value={numPapers}
            onChange={(e) => { setNumPapers(Number(e.target.value)); notify() }}
          />
        </label>
      </div>
      <div>
        <label>開始年: {yearFrom}
          <input
            type="number"
            value={yearFrom}
            min="1970"
            max="2025"
            onChange={(e) => { setYearFrom(Number(e.target.value)); notify() }}
          />
        </label>
        <label>終了年: {yearTo}
          <input
            type="number"
            value={yearTo}
            min="1970"
            max="2025"
            onChange={(e) => { setYearTo(Number(e.target.value)); notify() }}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="engine"
            value="semantic"
            checked={engine === 'semantic'}
            onChange={() => { setEngine('semantic'); notify() }}
          />
          semantic scholar
        </label>
        <label>
          <input
            type="radio"
            name="engine"
            value="google"
            checked={engine === 'google'}
            onChange={() => { setEngine('google'); notify() }}
          />
          Google Scholar
        </label>
      </div>
    </div>
  )
}

```

### File: frontend/src/assets/react.svg

```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>

```

### File: backend/requirements.txt

```
fastapi
uvicorn[standard]
requests

```

### File: backend/app/main.py

```python
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import requests
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# フロントエンドのビルド成果物のパス
# Docker イメージでは `/app/frontend/dist` に配置される
frontend_dist = Path(__file__).resolve().parents[2] / "frontend" / "dist"

SEMANTIC_SCHOLAR_URL = "http://api.semanticscholar.org/graph/v1/paper/search/"

@app.get("/api/search")
def search_papers(query: str = Query(..., description="検索クエリ"), year_from: int = 2023, year_to: int | None = None, limit: int = 20):
    params = {
        "query": query,
        "fields": "title,abstract,url",
        "limit": limit,
        "sort": "relevance",
    }
    if year_to is not None:
        params["year"] = f"{year_from}-{year_to}"
    else:
        params["year"] = f"{year_from}-"

    resp = requests.get(SEMANTIC_SCHOLAR_URL, params=params)
    data = resp.json()
    return data.get("data", [])


from pydantic import BaseModel

class ChatRequest(BaseModel):
    question: str
    paper: dict

class ChatResponse(BaseModel):
    answer: str

@app.post('/api/chat', response_model=ChatResponse)
def chat(req: ChatRequest):
    answer = f"質問: {req.question}\n論文タイトル: {req.paper.get('title', '')}"
    return ChatResponse(answer=answer)

# ビルド済みフロントエンドを提供
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")


```

