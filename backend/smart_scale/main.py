from pathlib import Path


def main():
    new_weight_path = Path.home() / "iCloud_drive/smart-scale-data/today_weight.txt"


# [ ] create iOS shortcut that pushes date and bodyweight
    # [ ] pings web endpoint by opening URL
    # [ ] provides date (YYYY-MM-DD)
    # [ ] provides bodyweight (xxx.x float)
    # [ ] opens PWA at the end as separate application

# Data Processing
# TODO: server takes new points, incorporates into rolling average
# TODO: displays upper and lower bounds

# web app
# [ ] start with web app
# [x] make web app openable from iPhone

if __name__ == "__main__":
    main()
