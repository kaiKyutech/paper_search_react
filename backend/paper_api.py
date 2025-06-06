"""Semantic Scholar API を利用した論文検索関数"""

from typing import List, Optional
import time
import requests


def search_papers_semantic(
    query: str,
    year_from: int = 2023,
    year_to: Optional[int] = None,
    limit: int = 20,
    max_retries: int = 10,
) -> List[dict]:
    """Semantic Scholar API から論文情報を取得する。

    Args:
        query: 検索クエリ
        year_from: 取得する論文の開始年
        year_to: 取得する論文の終了年（指定しない場合は最新まで）
        limit: 取得件数上限
        max_retries: API 呼び出しの最大再試行回数
    """
    url = "http://api.semanticscholar.org/graph/v1/paper/search/"
    params = {
        "query": query,
        "fields": "title,abstract,url,publicationTypes",
        "limit": limit,
        "sort": "relevance",
    }
    if year_to is not None:
        params["year"] = f"{year_from}-{year_to}"
    else:
        params["year"] = f"{year_from}-"

    retries = 0
    while retries < max_retries:
        resp = requests.get(url, params=params, timeout=10)
        data = resp.json()
        if "data" in data:
            return data["data"]
        if data.get("code") == "429":
            time.sleep(1)
            retries += 1
            continue
        return []
    return []
