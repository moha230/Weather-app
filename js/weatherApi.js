const apiKey = "c421623a30b0b9fb4b4085ba2e79f095";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";





// data coming form the api get request using fetch api 

async function getWeather(city) {
  const data = apiUrl + city + '&appid=' + apiKey;
  const response = await fetch(data);
  const weatherData = await response.json();
  console.log(weatherData.timezone);

  document.querySelector('.city').innerHTML = weatherData.name;
  document.querySelector('.temperature').innerHTML = Math.floor(weatherData.main.temp);
  document.querySelector('.wind').innerHTML = (weatherData.wind.speed).toFixed(2) + "km/h";
  document.querySelector('.humidity').innerHTML = weatherData.main.humidity + "%";

  // Extract the timezone offset from the API response
  const timezoneOffsetSeconds = weatherData.timezone;

  // Get the current UTC time
  const currentUTCTime = new Date();

  // Convert UTC time to local time using the timezone offset
  const localTime = new Date(currentUTCTime.getTime() + (timezoneOffsetSeconds * 1000) + (new Date().getTimezoneOffset() * 60000)); // Multiply by 60000 to convert minutes to milliseconds

  console.log(localTime); // Output: Local time for the specified location

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


}



// lets get the value from the The input field  

let inputFieldValue = document.querySelector('.search-input');
//console.log(inputFieldValue)

// add event listener for the keydown event on the input field
inputFieldValue.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    const searchValue = inputFieldValue.value;
    getWeather(searchValue);
    //console.log(searchValue)
  }
})

