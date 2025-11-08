from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend"), name="static")

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage 
# LATER: replace with database
weight_db: list[dict] = []

# Pydantic model for validation
class WeightEntry(BaseModel):
    weight: float
    date: datetime


# API endpoints
@app.get("/api/weights")
def get_weights():
    print(f"GET /api/weights - Returning {len(weight_db)} entries")
    return {"weights": weight_db}

@app.post("/api/weights")
def add_weight(entry: WeightEntry):
    new_entry = {
        "weight": entry.weight,
        "date": entry.date,
        "timestamp": datetime.now().isoformat()
    }
    weight_db.append(new_entry)
    print(f"POST /api/weights - Added: {new_entry}")
    return {"success": True, "entry": new_entry}

@app.delete("/api/weights")
def clear_weights():
    weight_db.clear()
    print("DELETE /api/weights - Cleared all weights")
    return {"success": True}

@app.get("/")
def read_root():
    return FileResponse("frontend/index.html")

# Serve frontend
app.mount("/static", StaticFiles(directory="frontend"), name="static")