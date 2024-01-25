// const apiKey = "9b0e50479fe24fc487e33913242501";
const baseURL = "http://api.weatherapi.com/v1";
const cityForm = document.getElementById("cityForm");
const cityDisplay = document.getElementById("cityDisplay");
const cityCondition = document.getElementById("cityCondition");

cityForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cityInput = document.getElementById("cityInput");
  let city = cityInput.value;

  try {
    const response = await fetch(
      `${baseURL}/forecast.json?key=${apiKey}&q=${encodeURIComponent(
        city
      )}&days=3&aqi=yes&alerts=yes`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    cardContainer.innerHTML = "";

    data.forecast.forecastday.forEach((day, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <div>
          <h3>${day.date}</h3><img src="${day.day.condition.icon}"></img>
          <p>Temperature: ${day.day.mintemp_f}°F - ${day.day.maxtemp_f}°F</p>
          <p>Condition: ${day.day.condition.text}</p>
          <p>Moon: ${day.astro.moon_phase}</p>
          <p>Chance of Rain: ${day.day.daily_chance_of_rain}%</p>
          
        `;
      cardContainer.appendChild(card);
    });

    cityDisplay.innerHTML = `${data.location.name}, ${data.location.country}`;
    cityCondition.innerHTML = `<h2>${data.current.condition.text}</h2><img src="${data.current.condition.icon}"></img>`;

    console.log("Weather data:", data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});
