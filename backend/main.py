"""FastAPI アプリケーションのエントリポイント"""

from fastapi import FastAPI, Query
from typing import Optional
from .paper_api import search_papers_semantic

app = FastAPI(title="paper_search_react backend")


@app.get("/search")
def search(
    q: str = Query(..., alias="query"),
    year_from: int = 2023,
    year_to: Optional[int] = None,
    limit: int = 20,
) -> list[dict]:
    """論文検索 API"""
    return search_papers_semantic(q, year_from=year_from, year_to=year_to, limit=limit)
