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

