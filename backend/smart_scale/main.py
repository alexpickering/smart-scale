from pathlib import Path

def main():
    new_weight_path = Path.home() / "iCloud_drive/smart-scale-data/today_weight.txt"


# TODO: build Progressive Web App for this
# [ ] create iOS shortcut that pushes date and bodyweight
    # [ ] pings web endpoint by opening URL
    # [ ] opens PWA at the end as separate application

# Data Processing
# TODO: server takes new points, incorporates into rolling average
# TODO: displays upper and lower bounds

# web app
# TODO: start with web app
# TODO: make web app openable from iPhone
# LATER: give web app access to weight data from Apple Health?
#       - or to shortcuts on iPhone?

if __name__ == "__main__":
    main()
