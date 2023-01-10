import "core-js/stable";
import fetch from "unfetch";
import buildCalendar from "./modules/buildCalendar";

// Get current date
let date = new Date();

let today = date.setTime(date.getTime());
let day = 24 * 60 * 60 * 1000;
let initDateSum = (today += 48 * 60 * 60 * 1000);
let displayInitDate = new Date(initDateSum);
let dateVal;
let controlDate;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const dateChanger = (controlDate, days) => {
  let formattedControlDate = controlDate.toISOString().slice(0, 10);
  let displayDate = controlDate.toLocaleDateString();
  let dayOfWeek = days[controlDate.getDay()];

  return {
    formattedControlDate: formattedControlDate,
    dayOfWeek: dayOfWeek,
    displayDate: displayDate,
  };
};

let setInitDate = dateChanger(displayInitDate, days);

const provisionalBookingsInfo = document.querySelector("#provisionalbookings");

provisionalBookingsInfo.innerHTML = sessionStorage.getItem("pb")
  ? sessionStorage.getItem("pb")
  : null;

let retrieveDayOfWeek = sessionStorage.getItem("dayOfWeek")
  ? sessionStorage.getItem("dayOfWeek")
  : null;

// Store date in sessionStorage
retrieveDayOfWeek
  ? retrieveDayOfWeek
  : sessionStorage.setItem("dayOfWeek", setInitDate.dayOfWeek);

let retrieveDisplayDate = sessionStorage.getItem("displayDate")
  ? sessionStorage.getItem("displayDate")
  : null;

// Store date in sessionStorage
retrieveDisplayDate
  ? retrieveDisplayDate
  : sessionStorage.setItem("displayDate", setInitDate.displayDate);

// Insert date picker element
const controlsWrapper = document.querySelector(".controls");

const buttonPrev = `<button class="button--dc prev" title="Previous day"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path></svg></button>`;

const buttonNext = `<button class="button--dc next" title="Next day"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path></svg></button>`;

controlsWrapper.innerHTML = `${buttonPrev}<span class="controls__date">${
  retrieveDayOfWeek ? retrieveDayOfWeek : setInitDate.dayOfWeek
}, ${
  retrieveDisplayDate ? retrieveDisplayDate : setInitDate.displayDate
}</span>${buttonNext}`;

let displayDateEl = document.querySelector(".controls__date");

const next = document.querySelector(".next");

const prev = document.querySelector(".prev");

export const domain = `https://www.royalgreenwich.gov.uk/`;

export const setUrlDate = (todaysDate) => {
  // Get current date for API URL
  return todaysDate.toISOString().slice(0, 10);
};

let urlDate = setUrlDate(date);

let retrieveDate = sessionStorage.getItem("date")
  ? sessionStorage.getItem("date")
  : null;

// Store date in sessionStorage
retrieveDate
  ? retrieveDate
  : sessionStorage.setItem("date", setInitDate.formattedControlDate);

export const setSavedDateUrl = (urlDate) => {
  let url = `${domain}/calendar-json.php?sport=24&todayDate=${urlDate}`;

  return url;
};

// Set API URL
export const setUrl = (urlDate) => {
  let url = `${domain}/calendar-json.php?sport=24&todayDate=${urlDate}`;

  return url;
};

const apiUrl = retrieveDate
  ? setSavedDateUrl(retrieveDate)
  : setUrl(setInitDate.formattedControlDate);

export const fetchData = (url) => {
  return fetch(url) // return this promise
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
};

next.addEventListener("click", (e) => {
  e.preventDefault();
  dateVal = today += day;
  controlDate = new Date(dateVal);
  let controlDateChange = dateChanger(controlDate, days);

  // Store date in sessionStorage
  sessionStorage.setItem("date", controlDateChange.formattedControlDate);
  displayDateEl.innerHTML = `${controlDateChange.dayOfWeek}, ${controlDateChange.displayDate}`;
  sessionStorage.setItem("dayOfWeek", controlDateChange.dayOfWeek);
  sessionStorage.setItem("displayDate", controlDateChange.displayDate);

  fetchData(setUrl(controlDateChange.formattedControlDate)).then((data) => {
    buildCalendar(data);
  });
});

prev.addEventListener("click", (e) => {
  e.preventDefault();
  dateVal = today -= day;
  controlDate = new Date(dateVal);
  let controlDateChange = dateChanger(controlDate, days);

  // Store date in sessionStorage
  sessionStorage.setItem("date", controlDateChange.formattedControlDate);
  displayDateEl.innerHTML = `${controlDateChange.dayOfWeek}, ${controlDateChange.displayDate}`;
  sessionStorage.setItem("dayOfWeek", controlDateChange.dayOfWeek);
  sessionStorage.setItem("displayDate", controlDateChange.displayDate);

  fetchData(setUrl(controlDateChange.formattedControlDate)).then((data) => {
    buildCalendar(data);
  });
});

fetchData(apiUrl).then((data) => {
  buildCalendar(data);
}); // call `then()` on the returned promise
