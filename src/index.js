function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time*1000);
    let weatherIcon = document.querySelector("#icon");
 
 
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/hr`;
    
    
    if(response.data.condition.description =="scattered clouds"){
     weatherIcon.src = "src/cloudy.svg";
     }
    else if(response.data.condition.description =="broken clouds"){
    weatherIcon.src = "src/cloudy.svg";
        }
     else if(response.data.condition.description =="overcast clouds"){
    weatherIcon.src = "src/cloudy.svg";
        }    
    else if(response.data.condition.description == "few clouds"){
      weatherIcon.src = "src/cloudy.svg";
            }   
     else if(response.data.condition.description == "clear sky"){
     weatherIcon.src = "src/clear-day.svg";
     }
     else if(response.data.condition.description = "moderate rain"){
     weatherIcon.src = "src/rain.svg";
     }
     
     else if(response.data.condition.description == "light rain"){
     weatherIcon.src = "src/drizzle.svg";
     }
     else if(response.data.condition.description == "mist"){
     weatherIcon.src = "src/mist.svg";
     }
     else if(response.data.condition.description == "snow"){
     weatherIcon.src = "src/snow.svg";
     }
     else if(response.data.condition.description == "thunderstorm"){
     weatherIcon.src = "src/thunderstorms-rain.svg";
     }
     else if(response.data.condition.description == "heavy intensity rain"){
        weatherIcon.src = "src/thunderstorms-rain.svg";
     }
     
     getForecast(response.data.city);
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
     let apiKey = "boa39a3f44a79ftd068d914f94c6a976";
     let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
     axios.get(apiUrl).then(refreshWeather);
 }
 
 
 function handleSearchSubmit(event){
     event.preventDefault();
     let searchInput = document.querySelector("#search-form-input");
     
     
     searchCity(searchInput.value);
 
 }
 
 
 
 function getForecast(city) {
  let apiKey = "boa39a3f44a79ftd068d914f94c6a976";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
 
 }
 
 function formartDay(timestamp){
     let date = new Date (timestamp * 1000);
     let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri","Sat"];
    
     return days[date.getDay()];
    
    }
 function displayForecast(response){
  
     let forecastHtml = "";  
 
     response.data.daily.forEach (function(day,index) {
       if(index < 5) {
         let weatherIconSrc;
 
         switch (day.condition.description) {
             case "scattered clouds":
                 weatherIconSrc = "src/cloudy.svg";
                 break;
             case "broken clouds":
                weatherIconSrc = "src/cloudy.svg";
                break; 
            case "few clouds":
                 weatherIconSrc = "src/cloudy.svg";
                break; 
            case "overcast clouds":
                    weatherIconSrc = "src/cloudy.svg";
                   break;                
             case "sky is clear":
                 weatherIconSrc = "src/clear-day.svg";
                 break;
             case "moderate rain":
                 weatherIconSrc = "src/rain.svg";
                 break;
             case "light rain":
                 weatherIconSrc = "src/drizzle.svg";
                 break;
             case "mist":
                 weatherIconSrc = "src/mist.svg";
                 break;
             case "snow":
                 weatherIconSrc = "src/snow.svg";
                 break;
             case "thunderstorm":
                 weatherIconSrc = "src/thunderstorms-rain.svg";
                 break;
          case "very heavy rain":
                 weatherIconSrc = "src/thunderstorms-rain.svg";
                 break;
              case "heavy intensity rain":
                    weatherIconSrc = "src/thunderstorms-rain.svg";
                    break;    
             default:
                 weatherIconSrc = ""; // Set a default value if none of the conditions match
         }
             forecastHtml += 
             `
             <div class="weather-forecast-day">
             <div class="weather-forecast-date">${formartDay(day.time)}</div>
             
             <img src="${weatherIconSrc}" class="weather-forecast-icon"/>
             
             <div class="weather-forecast-temperatures">
             <span class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong> 
              </span>
              <span class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</span>
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
 
 searchCity("Nairobi");
 
 