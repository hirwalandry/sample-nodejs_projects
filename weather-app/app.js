const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// const url= "https://api.openweathermap.org/data/2.5/weather?lat=28.65&lon=77.22&appid=b0665983cf0db2e2a0317ee56e5b6f65";
//  const request = require("request")
// request({ url: url, json: true}, (error, response) => {
//     const getNewsWeather = "currently " + response.body.list[0].main.temp + " degrres out " + response.body.list[0].main.humidity + " humidity out"
//     console.log(getNewsWeather);
// })

const address = process.argv[2]

if (!address) {
  console.log('please provide an address');
  
}
else{
  
  geocode(address, (error, { latitude,longitude,location }) => {
    if (error) {
      return console.log(error);
    }
   
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log(forecastdata);
     
    
    });
  
  
  
  })

}







  
 





