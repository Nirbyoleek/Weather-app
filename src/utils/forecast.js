const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8dd1a073100d5dccdbf3dc1523f26aee&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Cannot connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        ` ${body.current.weather_descriptions[0]}.It is currently ${body.current.temperature} degrees. It feels like  ${body.current.feelslike} degrees.`
      );
    }
  });
};

module.exports = forecast;
