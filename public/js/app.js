console.log("Client side javascript is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const temp = document.querySelector("#temp");
const loading = document.querySelector("#Loading");
const forecastData = document.querySelector("#Forecast");
const Time = document.querySelector("#Time");
const Day = document.querySelector("#Day");
// const Time = document.querySelector("#Time");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  loading.textContent = "Loading ...";
  forecastData.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        loading.textContent = data.error;
      } else {
        loading.textContent = data.location;
        forecastData.textContent = data.forecast;
        temp.textContent = Math.floor(data.temperature);
      }
    });
  });
});

// DEFAULT

fetch(`/weather?address=Delhi`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      loading.textContent = data.error;
    } else {
      loading.textContent = data.location;
      forecastData.textContent = data.forecast;
      temp.textContent = `${Math.floor(data.temperature)}`;
    }
  });
});

const today = new Date();
let h = today.getHours();
let m = today.getMinutes();
m < 10 ? (m = "0" + m) : m;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
Time.textContent = h > 12 ? `${h}:${m} pm` : `${h}:${m} am`;
// date.textContent = `${today.getDate()}th ${months[today.getMonth()]}`;
Day.textContent = days[today.getDay() - 1];
