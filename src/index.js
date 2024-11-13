import "./styles.css";

let weatherElement = document.querySelector(".weather"); // connect this to "sunny" "mostly cloudy" etc in response obj from promise.
let locationElement = document.querySelector(".city");
let descriptionElement = document.querySelector(".description");

async function getWeather(event) {
  event.preventDefault();  
  const searchInput = document.querySelector("#location").value;
  console.log(searchInput);
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchInput}?key=H7EDVY9B9BDNRTN2UEGTTXJLU`,
      { mode: "cors" }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const weatherData = await response.json(); // gets all the data from URL.
        weatherElement.textContent = weatherData.currentConditions.conditions;
        locationElement.textContent = weatherData.address; // grabs the location and saves it to the DOM element location.
        descriptionElement.textContent = weatherData.description;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

document.querySelector(".check-weather-form").addEventListener("submit", getWeather);
