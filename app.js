window.addEventListener("DOMContentLoaded", () => {
	const searchBtn = document.querySelector("#search-btn");
	const searchInputValue = document.querySelector("#search-input");
	const errorBox = document.querySelector("#error-alert");
	function getLocationInfo(cityName) {
	 	navigator.geolocation.getCurrentPosition((position) => {
			let query;
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;
			if( cityName === undefined ) {
				query = `${latitude},${longitude}`
			}else {
				query = cityName;
			}
		 	fetch(
				`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query}&days=10`,
				{
					method: "GET",
					headers: {
						"x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
						"x-rapidapi-key":
							"883222602dmsh572987bdcdee66cp1cac6ejsnb9bf2f5ea3e9",
					},
				}
			)
			.then((response) => response.json())
			.then((response) => showInfo(response))
			.catch((err) => {
				errorHandler();
			});

		});
	}
	getLocationInfo();
	function showInfo(response) {
		document.querySelector("#country").innerHTML = response.location.country;
		document.querySelector("#region").innerHTML = response.location.region;
		document.querySelector("#localTime").innerHTML = response.location.localtime.slice(0,10);
		document.querySelector("#current-temp").innerHTML = response.current.temp_c+" C°";
		document.querySelector("#current-condition").innerHTML = response.current.condition.text;
		document.querySelector("#current-humidity").innerHTML = "Humidity: "+response.current.humidity+" %";
		document.querySelector("#wind-direction").innerHTML = "Wind direction: "+response.current.wind_dir;
		document.querySelector("#wind-speed").innerHTML = "Wind speed: "+response.current.wind_kph+"KM/H";
		document.querySelector("#current-condition-img").src = response.current.condition.icon;

		const dailyForecastBox = document.querySelector("#daily-forecast");
		dailyForecastBox.innerHTML = `
		<p class="text-center">Daily Forecast</p>
		<div>
			<h3 class="text-center">${response.forecast.forecastday[1].date}</h3>
			<div class="row">
				<div class="col-6">
					<img src=${response.forecast.forecastday[1].day.condition.icon} alt="">
					<h4>${response.forecast.forecastday[1].day.condition.text}</h4>
					<h4>${response.forecast.forecastday[1].day.avgtemp_c} C°</h4>
					<p>Humidity: ${response.forecast.forecastday[1].day.avghumidity}%</p>
				</div>
				<div class="col-6">
					<p>Sunrise/Sunset: ${response.forecast.forecastday[1].astro.sunrise} / ${response.forecast.forecastday[1].astro.sunset}</p>
					<p>Moonrise/Moonset: ${response.forecast.forecastday[1].astro.moonrise} / ${response.forecast.forecastday[1].astro.moonset}</p>
				</div>
			</div>
		</div>
		<div>
			<h3 class="text-center">${response.forecast.forecastday[2].date}</h3>
			<div class="row">
				<div class="col-6">
					<img src=${response.forecast.forecastday[2].day.condition.icon} alt="">
					<h4>${response.forecast.forecastday[2].day.condition.text}</h4>
					<h4>${response.forecast.forecastday[2].day.avgtemp_c} C°</h4>
					<p>Humidity: ${response.forecast.forecastday[2].day.avghumidity}%</p>
				</div>
				<div class="col-6">
					<p>Sunrise/Sunset: ${response.forecast.forecastday[2].astro.sunrise} / ${response.forecast.forecastday[2].astro.sunset}</p>
					<p>Moonrise/Moonset: ${response.forecast.forecastday[2].astro.moonrise} / ${response.forecast.forecastday[2].astro.moonset}</p>
				</div>
			</div>
		</div>
		`;

		const hourlyForecastBox = document.querySelector("#hourly-forecast-container");
		let hourlyContent = "";
		response.forecast.forecastday[0].hour.forEach((item) => {
			hourlyContent += `
			<div id="forecast-item" class="col">
				<p class="text-center">${item.time.slice(10)}</p>
				<div class="d-flex justify-content-between">
					<div>
						<img src=${item.condition.icon} alt="">
						<p>${item.condition.text}</p>
						<p>${item.temp_c} C°</p>
					</div>
					<div>
						<p class= "text-end">Humidity: ${item.humidity}%</p>
						<p class="text-end">Wind speed: ${item.wind_kph}km/h</p>
					</div>
				</div>
			</div>
			`;
		});
		hourlyForecastBox.innerHTML = hourlyContent
	} 
	searchBtn.addEventListener("click", () => {
		getLocationInfo(searchInputValue.value);
	});
	searchInputValue.addEventListener("input", () => {
	});

	function errorHandler() {
		errorBox.style.transform = "translateX(0%)";
		setTimeout(() => {
			errorBox.style.transform = "translateX(110%)"
		},5000)
	}
});
