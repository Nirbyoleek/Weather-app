const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

const port = process.env.PORT || 3000;

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name,
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "what may I help you with?",
    title: "Help",
    name,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an appropriate address",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({
            error,
          });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            res.send({
              error,
            });
          }
          res.send({
            location,

            forecast: forecastData.weather[0].description,
            feelsLike: forecastData.main.feels_like,
            temperature: forecastData.main.temp,
            humidity: forecastData.main.humidity,
            pressure: forecastData.pressure,
            wind: forecastData.wind.speed,
          });
        });
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    title: "Help",
    name,
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page Not Found",
    title: "404",
    name,
  });
});

// PORT CONFIG
app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
