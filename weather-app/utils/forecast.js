const request = require('request');

const forecast = (latitude, longitude, callback) => {
   const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=b0665983cf0db2e2a0317ee56e5b6f65';

   request({ url, json: true }, (error, { body }) => {
       if (error) {
           callback('unable to connect', undefined);
           
       }
       else if (body.error) {
           callback('try another research', undefined);
           
       }
       else{
           callback(undefined,  "currently " + body.main.temp + " degrres out " + body.main.humidity + " humidity out")
       }
   })



}

module.exports = forecast