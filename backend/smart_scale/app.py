from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello():
    return {"message": "Hello World"}

@app.get("/data")
def data():
    return{"weigth": 185.5, "date": "2025-11-08"}
