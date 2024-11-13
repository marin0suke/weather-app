import "./styles.css";

let weatherElement = document.querySelector(".weather"); // connect this to "sunny" "mostly cloudy" etc in response obj from promise.
let locationElement = document.querySelector(".city");
let descriptionElement = document.querySelector(".description");
let tempElement = document.querySelector(".temp");
let dateElement = document.querySelector(".date");
let feelsElement = document.querySelector(".feels-like");

let intervalId;

async function getWeather(location = "Tokyo") {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=H7EDVY9B9BDNRTN2UEGTTXJLU`,
      { mode: "cors" }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const weatherData = await response.json(); // gets all the data from URL.
    console.log(weatherData);

    weatherElement.textContent = weatherData.currentConditions.conditions;
    locationElement.textContent = weatherData.address; 
    descriptionElement.textContent = weatherData.description;
    tempElement.textContent = `Current temperature is ${weatherData.currentConditions.temp} °F`;

    const timezone = weatherData.timezone;

    // Clear any existing interval
    clearInterval(intervalId);

    // Start a new interval to update the time every second
    intervalId = setInterval(() => {
      // Get the current time in the specified timezone
      const currentTime = new Date();
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(currentTime);

      // Update the displayed time
      dateElement.textContent = formattedTime;
    }, 1000);

    feelsElement.textContent = `Feels like ${weatherData.currentConditions.feelslike} °F`;

  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

getWeather();

document.querySelector(".check-weather-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.querySelector("#location").value;
    if (searchInput) {
        getWeather(searchInput);
    }
});


