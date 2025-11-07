from pathlib import Path
from watchfiles import watch



def main():
    new_weight_path = Path("~/iCloud_drive/smart-scale-data/today_weight.txt")

    # [ ] add watcher to check for changes
    for changes in watch(new_weight_path):
        print(changes)


# Client-server web stuff
# TODO: apple health api to send new body weight data

# Data Processing
# TODO: server takes new points, incorporates into rolling average
# TODO: displays upper and lower bounds

# web app
# TODO: start with web app
# TODO: make web app openable from iPhone

if __name__ == "__main__":
    main()
