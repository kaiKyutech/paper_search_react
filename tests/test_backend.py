import os
import sys
from fastapi.testclient import TestClient

# backend モジュールへのパスを追加
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.main import app  # noqa: E402

client = TestClient(app)


def test_search_endpoint():
    response = client.get("/search", params={"query": "machine learning", "limit": 1})
    assert response.status_code == 200
    assert isinstance(response.json(), list)
