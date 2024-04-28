function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.dt*1000);
    let weatherIcon = document.querySelector("#icon");
 
 
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = `${response.data.main.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/hr`;
    timeElement.innerHTML = formatDate(date);
    
    if(response.data.weather[0].main == "Clouds"){
     weatherIcon.src = "src/cloudy.svg";
     }
     else if(response.data.weather[0].main == "Clear"){
     weatherIcon.src = "src/clear-day.svg";
     }
     else if(response.data.weather[0].main = "Rain"){
     weatherIcon.src = "src/rain.svg";
     }
     
     else if(response.data.weather[0].main == "Drizzle"){
     weatherIcon.src = "src/drizzle.svg";
     }
     else if(response.data.weather[0].main == "Mist"){
     weatherIcon.src = "src/mist.svg";
     }
     else if(response.data.weather[0].main == "Snow"){
     weatherIcon.src = "src/snow.svg";
     }
     else if(response.data.weather[0].main == "Thunderstorm"){
     weatherIcon.src = "src/thunderstorms-night-rain.svg";
     }
     
     getForecast(response.data.name);
 }
 function formatDate(date){
   let minutes = date.getMinutes();
   let hours = date.getHours();
   let ampm = hours >=12 ? 'PM': 'AM';
   let formattedHours = hours % 12 || 12; 
 
   let days = [
     "Sunday",
     "Monday",
     "Tuesday",
     "Wednesday",
     "Thursday",
     "Friday",
     "Saturday" 
      ];
   let day = days[date.getDay()];
   
 
   if(minutes < 10){
     minutes = `0${minutes}`
    };
   return`${day} ${formattedHours}:${minutes}`;
   
 
 }
 
 function searchCity(city){
     let apiKey = "50da24d4c009f8e56953c014274fe893";
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
     axios.get(apiUrl).then(refreshWeather);
 }
 
 
 function handleSearchSubmit(event){
     event.preventDefault();
     let searchInput = document.querySelector("#search-form-input");
     
     
     searchCity(searchInput.value);
 
 }
 
 
 
 function getForecast(city) {
  let apiKey = "50da24d4c009f8e56953c014274fe893";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
 
 
 }
 
 function formartDay(timestamp){
     let date = new Date (timestamp * 1000);
     let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri","Sat"];
    
     return days[date.getDay()];
    
    }
 function displayForecast(response){
  
     let forecastHtml = "";
 
     response.data.list.forEach(function(day,index) {
       if(index < 5) {
         let weatherIconSrc;
 
         switch (day.weather[0].main) {
             case "Clouds":
                 weatherIconSrc = "src/cloudy.svg";
                 break;
             case "Clear":
                 weatherIconSrc = "src/clear-day.svg";
                 break;
             case "Rain":
                 weatherIconSrc = "src/rain.svg";
                 break;
             case "Drizzle":
                 weatherIconSrc = "src/drizzle.svg";
                 break;
             case "Mist":
                 weatherIconSrc = "src/mist.svg";
                 break;
             case "Snow":
                 weatherIconSrc = "src/snow.svg";
                 break;
             case "Thunderstorm":
                 weatherIconSrc = "src/thunderstorms-night-rain.svg";
                 break;
             default:
                 weatherIconSrc = ""; // Set a default value if none of the conditions match
         }
             forecastHtml += 
             `
             <div class="weather-forecast-day">
             <div class="weather-forecast-date">${formartDay(day.dt)}</div>
             
             <img src="${weatherIconSrc}" class="weather-forecast-icon"/>
             
             <div class="weather-forecast-temperatures">
             <span class="weather-forecast-temperature">
              <strong>${Math.round(day.main.temp_max)}°</strong> 
              </span>
              <span class="weather-forecast-temperature">${Math.round(day.main.temp_min)}°</span>
             </div>
             </div>
             `;
       }
     });
 
     let forecastElement = document.querySelector("#forecast");
     forecastElement.innerHTML = forecastHtml;
 }
 
 let searchFormElement = document.querySelector("#search-form");
 searchFormElement.addEventListener("submit", handleSearchSubmit);
 
 searchCity("Sydney");
 
 