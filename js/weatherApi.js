const apiKey = "c421623a30b0b9fb4b4085ba2e79f095";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const weatherIcon = document.querySelector('.weather-icon');
console.log(weatherIcon)

 document.querySelector('.description');

// data coming from the api get request using fetch api 

async function getWeather(city) {
  const data = apiUrl + city + '&appid=' + apiKey;
  const response = await fetch(data);
  const weatherData = await response.json();
  
console.log(weatherData)
  

  document.querySelector('.city').innerHTML = weatherData.name;
  document.querySelector('.temperature').innerHTML = Math.floor(weatherData.main.temp);
  document.querySelector('.wind').innerHTML = (weatherData.wind.speed).toFixed(2) + "km/h";
  document.querySelector('.humidity').innerHTML = weatherData.main.humidity + "%";

  document.querySelector('.description').innerHTML = weatherData.weather[0].description
  ;

  // Extract the timezone offset from the API response
  const timezoneOffsetSeconds = weatherData.timezone;

  // Get the current UTC time
  const currentUTCTime = new Date();

  // Convert UTC time to local time using the timezone offset
  const localTime = new Date(currentUTCTime.getTime() + (timezoneOffsetSeconds * 1000) + (new Date().getTimezoneOffset() * 60000)); // Multiply by 60000 to convert minutes to milliseconds


  // Get the hour and minute components from the local time
  const hours = localTime.getHours();
  const minutes = localTime.getMinutes();
  //lets work on the date month and year 
  const month = localTime.getMonth();
  const day = localTime.getDate();
  const year = localTime.getFullYear();

  // Get the month name from the local time
  const monthName = localTime.toLocaleDateString('en-US', { month: 'long' });
  document.querySelector('.date-month-year').innerHTML = `${day} ${monthName} ${year}`;


  // get the day of the week from local time 
  const options = { weekday: 'long' };
  const dayName = localTime.toLocaleDateString('en-US', options);
  console.log(dayName)
  document.querySelector('.day-of-week').textContent = dayName;

  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  document.querySelector('.time').textContent = formattedTime;

  //lets work on the image icon


if(weatherData.weather[0].main == 'Clouds'){
  weatherIcon.src ="resources/weather-icons/cloud/cloud.svg"
} else if (weatherData.weather[0].main == 'Rain'){
  weatherIcon.src ="resources/weather-icons/rain/rain.svg"
} else if (weatherData.weather[0].main == 'Snow'){
  weatherIcon.src ="resources/weather-icons/snow/snow.svg"
} else if (weatherData.weather[0].main == 'Thunderstorm'){
  weatherIcon.src ="resources/weather-icons/thunderstorm/11d.svg"
}else if (weatherData.weather[0].main == 'Clear'){
  weatherIcon.src ="resources/weather-icons/clear/01d.svg"
}else if (weatherData.weather[0].main == 'Mist'){
  weatherIcon.src ="resources/weather-icons/mist/Mist.svg"
};

}

// lets get the value from the The input field  
let inputFieldValue = document.querySelector('.search-input');


// add event listener for the keydown event on the input field
inputFieldValue.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    const searchValue = inputFieldValue.value;
    getWeather(searchValue);
  }
})
