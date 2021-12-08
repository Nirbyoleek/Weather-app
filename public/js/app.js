console.log("Client side javascript is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const loading = document.querySelector("#Loading");
const forecastData = document.querySelector("#Forecast");

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
      }
    });
  });
});
