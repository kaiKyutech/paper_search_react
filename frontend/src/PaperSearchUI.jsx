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

