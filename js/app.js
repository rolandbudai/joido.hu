window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let airPressure = document.querySelector(".air-pressure");
    let dailyForecast = document.querySelector(".daily-forecast");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/59969333754a826141998456c9042a38/${lat},${long}`;

            fetch(api)
                .then(response => {
                return response.json();
                })
                .then(data => {
                console.log(data);
                const {temperature, summary, pressure} = data.currently;
                // set DOM elements from API data
                temperatureDegree.textContent = Math.round(((temperature-32)/9)*5);
                temperatureDescription.textContent = summary.toLowerCase();
                airPressure.textContent = pressure;
                locationTimezone.textContent = data.timezone;
                dailyForecast.textContent = data.hourly.summary.toLowerCase();

                if(Math.round(((temperature-32)/9)*5) < 18) {
                    document.body.style.background = "rgb(60,100,160)";
                }
                else if (Math.round(((temperature-32)/9)*5) > 26) {
                    document.body.style.background = "rgb(200,180,60)";
                }

                })

        });
    }else{
        let h1 = document.getElementsByTagName("h1")
        h1.textContent = "Nem állnak rendelkezésre adatok a helymeghatározáshoz, engedélyezd a hozzáférést vagy frissítsd a böngészőt!"
    }


});