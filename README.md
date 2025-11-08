# Smart Scale
A simple PWA (Progressive Web App) for taking weight (via iOS Shortcuts) from Apple Health,
hitting an endpoint on my server, analyzing the rolling average, and displaying related
metrics.

## For Developers
### Setup 
- `smart-scale-server` to start uvicorn app (leave running)
- `ngrok http 8000` to grab url for app (leave running, split terminal)
#### on iPhone
- bookmark ngrok url on iPhone home screen 
- open and test