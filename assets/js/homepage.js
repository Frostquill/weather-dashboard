// debugger;
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentDayEl = document.querySelector("#current-container");
// console.log(currentDayEl);
var fiveDayEl = document.querySelector("#five-day-forecast");
var currentCitySearch = document.querySelector("#city-search-term");
var cityContainer = document.querySelector("#city-container");
var tempHistory = document.querySelector("#searchHistory");
var btnSearch = document.querySelector("#btnSearch");

var day = moment().format("MM/DD/YYYY");
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
            currentCitySearch.textContent = city + ":" + "(" + day + ")";
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
    btn.classList = "recent-btn btn btn-primary btn-w";
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

loadSearch();
console.log(recentBtn);
var recentBtn = document.querySelectorAll(".recent-btn");
recentBtn.forEach(function(btn){
    btn.addEventListener("click", function(){
        var btnVal = this.textContent;
        console.log(btnVal);
        cityInputEl.value = btnVal; 
    })
})
btnSearch.addEventListener("click", function () {
    getWeatherApi();
});
