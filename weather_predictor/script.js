document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const weatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorDisplay = document.getElementById("error-message");

  const API_KEY = "946d87bd4eed4f63404d558848b63a38";

  weatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim;
    if (!city) return;

    try {
      const weatherdata = await fetchWeatherData(city);
      displayWeatherData(weatherdata);
    } catch {
      errorMessage();
    }
  });

  async function fetchWeatherData(city) {
    //fetch the data from api
    const url = `https://api.openweathermap.org/data/3.0/onecall?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("response", response);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    //display the weather of that city
    //destructuring data
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;

    //unlocking the hidden class
    weatherInfo.classList.remove("hidden");
    errorDisplay.classList.add("hidden");
  }

  function errorMessage() {
    //display the error msg when city not found
    weatherInfo.classList.add("hidden");
    errorDisplay.classList.remove("hidden");
  }
});
