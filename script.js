const apiKey = '8cae15a37f2eb4faf2aaceeadc1df7e9'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherResult = document.getElementById("weatherResult");

    if (city === "") {
        weatherResult.innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
            return;
        }

        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        weatherResult.innerHTML = `<p>Error fetching weather data.</p>`;
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById("weatherResult");
    const { name, main, weather, wind } = data;

    weatherResult.innerHTML = `
        <p><strong>City:</strong> ${name}</p>
        <p><strong>Temperature:</strong> ${main.temp} °C</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
}
