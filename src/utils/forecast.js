const request = require("request");

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/6f71a5b8b66ae8d3de560d516d2e3ab4/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ". It is currently " +
          body.currently.temperature +
          " degress out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
