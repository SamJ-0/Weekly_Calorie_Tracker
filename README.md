# Weekly Calorie Tracker (Browser Extension)

A lightweight firefox extension built with JavaScript that tracks daily calorie intake and calculates weekly averages, using localStorage for persistence. The app displays weekly summaries including total intake, average daily calories and compares against a weekly goal.


Designed as a small data-driven frontend project focusing on DOM manipulation, state handling and time-based data aggregation.

---

## Features

- Log daily calorie intake via a simple input form
- Stores data locally in the browser (localStorage)
- Simple data update if current date / submitted date are the same
- Calculates:
  - Weekly total calorie consumption
  - Daily average intake
  - Over/under weekly calorie goal
- Automatically filters data for the last 7 days
- Displays current weekly date range
- Responsive popup-style UI

---

## Tech Stack

- JavaScript (ES6)
- HTML5
- CSS3
- Browser localStorage API

## Future Improvements

- Make daily calorie goal configurable via UI instead of hardcoded
- Add edit/delete functionality for entries
- Improve date handling robustness
- Add charts or visualisation of trends
- More visual form feedback on submission etc