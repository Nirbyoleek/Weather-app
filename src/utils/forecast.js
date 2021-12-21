const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f706bc5e2104b5ec6e4d233dfa77473c&units=metric`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body
        // `${body.weather[0].description}.It is currently ${body.main.temp} degrees and feels like ${body.main.feels_like}.
        // The Humidity is around ${body.main.humidity}`
      );
    }
  });
};

module.exports = forecast;
