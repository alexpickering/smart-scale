import uvicorn

def run():
    """Run the FastAPI dev server."""
    uvicorn.run(
        "smart_scale.app:app",
        reload=True,
        log_level="info",
    )

if __name__ == "__main__":
    run()