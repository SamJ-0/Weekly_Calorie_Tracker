const weeklyLabel = document.querySelector("#weeklyOverUnder dt");
const weeklyValue = document.querySelector("#weeklyOverUnder dd");
const dailyAvgValue = document.querySelector("#dailyAverage dd");
const dateRangeDisplay = document.querySelector(".date-range");
const tabs = document.querySelectorAll(".tabs");

const saveBtn = document.querySelector("#save-btn");
const input = document.querySelector("#calorie-input");
const form = document.querySelector("form");
input.value = "";

saveBtn.addEventListener("click", main);
input.addEventListener("keydown", submitOnEnterKey);

function submitOnEnterKey(e) {
  if (e.key === "Enter" && !isNaN(parseFloat(input.value))) {
    e.preventDefault();
    saveBtn.click();
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", switchTab);
});

function switchTab(e) {
  const activeTab = document.querySelectorAll(".active");
  const currentTab = e.target.getAttribute("href");
  const tabPanels = document.querySelectorAll(".tab-content");

  const currentTabString = currentTab.slice(1);

  activeTab.forEach((tab) => {
    tab.classList.remove("active");
  });

  e.target.classList.add("active");

  tabPanels.forEach((panel) => {
    if (currentTabString == panel.id) {
      panel.classList.add("active-panel");
    } else {
      panel.classList.remove("active-panel");
    }
  });
}

const dailyGoal = 1700;
const dateRange = 7;

const dailyIntake = localStorage.getItem("dailyIntake")
  ? JSON.parse(localStorage.getItem("dailyIntake"))
  : {};

const objLength = Object.keys(dailyIntake).length;

if (objLength > 0) {
  onPageLoad();
}

function onPageLoad() {
  const sum = calculateData(dailyIntake, dailyGoal, dateRange);
  displayData(sum, dateRange);
}

function main() {
  saveInput(dailyIntake);
  const returnedSum = calculateData(dailyIntake, dailyGoal, dateRange);
  displayData(returnedSum, dateRange, returnedSum.filteredDates);
  console.log(returnedSum.filteredDates);
  console.log(dailyIntake);
  form.reset();
}

function saveInput(intakeObj) {
  const currentDate = new Date().toLocaleDateString("en-CA");
  const userInputCalories = calorieInput();

  if (userInputCalories > 0) {
    intakeObj[currentDate] = userInputCalories;
    saveToLocalStorage(intakeObj);
  }
}

function calculateData(intakeObj, dailyGoal, dateRange) {
  const intakeKeys = Object.keys(intakeObj);
  const filteredDate = filterDates(intakeKeys, dateRange);
  const filteredValues = filteredDate.map((date) => intakeObj[date]);
  const weeklyTarget = dailyGoal * dateRange;

  const summedCals = sumCalories(filteredValues);

  const calculations = {
    summedCals: summedCals,
    averageDailyCals: Math.ceil(summedCals / dateRange),
    weeklyConsumed: weeklyTarget - summedCals,
    filteredDates: filteredDate,
  };

  return calculations;
}

function displayData(weeksIntake, dateRange) {
  displayWeeklyOverUnder(weeksIntake.weeklyConsumed, weeklyLabel, weeklyValue);
  dailyAvgValue.textContent = weeksIntake.averageDailyCals.toLocaleString();
  displayDate(dateRange);
}

function calorieInput() {
  const userInput = parseFloat(input.value);
  if (isNaN(userInput)) {
    return 0;
  } else {
    return userInput;
  }
}

function sumCalories(value) {
  return value.reduce((acc, val) => acc + val);
}

function filterDates(dates, dateRange) {
  const date = new Date();
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - dateRange);

  const result = dates.filter((day) => {
    return (
      day >= sevenDaysAgo.toLocaleDateString("en-CA") &&
      day <= date.toLocaleDateString("en-CA")
    );
  });
  return result;
}

function displayDate(dateRange) {
  const currentDate = new Date();
  const firstDate = new Date();

  const options = {
    day: "numeric",
    month: "short",
  };

  firstDate.setDate(firstDate.getDate() - dateRange);
  dateRangeDisplay.textContent = `${firstDate.toLocaleDateString("en-gb", options)} - ${currentDate.toLocaleDateString("en-gb", options)}`;
}

function displayWeeklyOverUnder(value, weeklyLabel, weeklyValue) {
  if (value < 0) {
    weeklyLabel.textContent = "Calories over weekly goal: ";
  } else if (value > 0) {
    weeklyLabel.textContent = "Calories under weekly goal: ";
  } else {
    weeklyLabel.textContent = "Calories align with weekly goal: ";
  }
  weeklyValue.textContent = Math.abs(value).toLocaleString();
}

function saveToLocalStorage(intakeObj) {
  localStorage.setItem("dailyIntake", JSON.stringify(intakeObj));
}
