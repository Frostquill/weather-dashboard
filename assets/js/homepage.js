// debugger;
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentDayEl = document.querySelector("#current-container");
// console.log(currentDayEl);
var fiveDayEl = document.getElementById("five-day-forecast");
var currentCitySearch = document.querySelector("#city-search-term");
var cityContainer = document.querySelector("#city-container");
var tempHistory = document.querySelector("#searchHistory");
var btnSearch = document.querySelector("#btnSearch");
var fiveContainer = document.querySelector("#fivecontainer");

var recentHistory = [];
var dupli = false;

// fetch weather api for selected city
var getWeatherApi = function () {
    var city = cityInputEl.value.trim();
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=imperial" +
            "&appid=44780b34048acb040f5cd25cd5d97105"
    ).then(
        function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return alert("City does not exist.");
            }
        })
            

    .then(function (response) {
        currentDayEl.textContent = "";
            cityContainer.classList = "list-group col-12 col-md-8";
            var temp = document.createElement("p");
            temp.setAttribute("class", "weather-details");
            temp.textContent = "Temp:" + response.main.temp + " F";
            currentDayEl.appendChild(temp);

            var wind = document.createElement("p");
            wind.setAttribute("class", "weather-details");
            wind.textContent = "Wind:" + response.wind.speed + " MPH";
            currentDayEl.appendChild(wind);

            var humidity = document.createElement("p");
            humidity.setAttribute("class", "weather-details");
            humidity.textContent = "Humidity:" + response.main.humidity + "%";
            currentDayEl.appendChild(humidity);
            createBtn(city);
        // console.log(response);
        // saveSearch(city);

});
}


 function loadSearch(){
    var loS = JSON.parse(localStorage.getItem('cities'));
     if(loS === null) 
     {loS= [] }
    loS.forEach(function(data) {
        createBtn(data);
    
    });
}

var createBtn = function (recent) {
    noDupli(recent);
    if(!dupli) {
    var btn = document.createElement("button");
    btn.innerText = recent;
    btn.classList = "recent-btn btn btn-secondary btn-w";
    tempHistory.appendChild(btn);
    recentHistory.push(recent);
    // console.log(saveData);
    localStorage.setItem('cities', JSON.stringify(recentHistory));
    // console.log(recent);
    return;
    } 
}



var noDupli = function(city) {
    
    for (var i = 0; i < recentHistory.length; i++ ) {
        if(city === recentHistory[i]) {
            return (dupli = true);
        } else {
            dupli = false;
        }
    }
}


var fiveDay = function () {
    var dayFore= cityInputEl.value.trim();
    
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
            dayFore+
            "&units=imperial" +
            "&appid=44780b34048acb040f5cd25cd5d97105"
    ).then(
        function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }
        }) .then (
            function(response) {
                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;
                // console.log(lat);
                // console.log(lon);
                fetch(
                    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                    lat + "&lon=" + lon + 
                    "&units=imperial" +
                    "&exclude=hourly,minutely,alerts" + 
                    "&appid=44780b34048acb040f5cd25cd5d97105"
                ).then(
                    function (response) {
                        if (response.ok) {
                            // console.log(response);
                            return response.json();
                        }
            }) .then(function (response) {
                    fiveDayEl.textContent = "";
                    for(var i = 1; i < 6; i++) {
                    var card = document.createElement("div");
                    card.setAttribute("id", "card");
                     card.classList = "col-2 col-md-8 card card-set";
                     fiveDayEl.appendChild(card);
                     var fiveDate = document.createElement("p");
                     fiveDate.classList = "card-txt-header";
                     var fiveDateTime= moment.unix(response.daily[i].dt).format("MM/DD/YYYY");
                     fiveDate.innerText = fiveDateTime;
                    card.appendChild(fiveDate);
                     console.log(response);
                     var fiveIcon = document.createElement("img");
                     fiveIcon.classList = "icon-size";
                     fiveIcon.setAttribute("src" , "https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
                     card.appendChild(fiveIcon);
                     var fiveTemp = document.createElement("p");
                     fiveTemp.classList = "card-txt";
                     fiveTemp.innerText = "Temp: " + response.daily[i].temp.day + " F";
                    card.appendChild(fiveTemp);
                     var fiveWind = document.createElement("p");
                     fiveWind.classList = "card-txt";
                     fiveWind.innerText = "Wind: " + response.daily[i].wind_speed + " MPH";
                     card.appendChild(fiveWind);
                     var fiveHumid = document.createElement("p");
                     fiveHumid.classList = " card-txt";
                     fiveHumid.innerText = "Humidity: " + response.daily[i].humidity + "%";
                     card.appendChild(fiveHumid);
                     
                       
                    }
                
                    var uV = document.createElement("p");
                    uV.innerText = "UV Index: " + response.current.uvi;
                    uV.setAttribute("class", "weather-details");
                    currentDayEl.appendChild(uV);
                    // console.log(response);
                    var currentDay = moment.unix(response.current.dt).format("MM/DD/YYYY");
                    currentCitySearch.innerText = dayFore + ":" + "(" +  currentDay + ")";
                    var currentI = document.createElement("img");
                    currentI.classList="icon-size";
                    currentI.setAttribute("src", "https://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");
                    currentCitySearch.appendChild(currentI);
                   
                    
                    

                })

                
               
            })
        }

       






loadSearch();
// console.log(recentBtn);
var recentBtn = document.querySelectorAll(".recent-btn");
recentBtn.forEach(function(btn){
    btn.addEventListener("click", function(){
        var btnVal = this.textContent;
        // console.log(btnVal);
        cityInputEl.value = btnVal; 
    })
})


btnSearch.addEventListener("click", function () {
    getWeatherApi();
    fiveDay();

})

