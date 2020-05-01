$(document).ready(function() {

    $("#searchButton").on("click", function() {
        let inputCity = $("#citySearch").val();

        addCityToList(inputCity);

        currentWeatherData(inputCity);

        fiveDayForecast (inputCity)

    });

    $("#previousSearches").on("click", "button", function() {
        currentWeatherData($(this).text());
        fiveDayForecast($(this).text());
    })

    function addCityToList (inputCity) {
        let newRow = $("<button>").addClass("newAddedRow").text(inputCity);
        $("#previousSearches").append(newRow);
        $("#citySearch").val("");
    }

    function currentWeatherData (inputCity) {
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&units=imperial&appid=d4e0d5067632cdd06a4bad12b5b1e650"
        }).then(function(data) {

            if(history.indexOf(inputCity) === -1)
            {
                history.push(inputCity);
                localStorage.setItem("history", history);
            }
            
            //html content to create city card to display info
            let card = $("<div>").addClass("card");
            let cardBody = $("<div>").addClass("card-body");
            let temperature = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "F");
            let windSpeed = $("<p>").addClass("card-text").text("Wind speed: " + data.wind.speed + "mph");
            let sunny = $("<p>").addClass("card-text").text("Cloudy/Sunny: " + data.weather[0].main + ".");
            let cardTitle = $("<h2>").addClass("card-title").text(data.name);
            cardBody.append(cardTitle, sunny, temperature, windSpeed);
            card.append(cardBody);
            $("#weatherToday").html(card);
        });
    }

    function fiveDayForecast (inputCity) {
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?appid=70e75079715aaa88f8897acff6d0352b&q=" + inputCity
        }).then(function(data) {

            $("#weatherForecast").html("<h2>5-Day Forecast</h2>").append("<div class=\"row\">");

            //html content to display 5 day forecast

            let myNecessaryData = data.list;

            for(let i = 0; i < myNecessaryData.length; i++)
            {   
                let myDate = myNecessaryData[i].dt_txt;

                let forecastDate = myDate.split(" ")[0];

                if(myDate.split(" ")[1] === "00:00:00")
                {
                    let card = $("<div>").addClass("card col-md-2").attr("id", "forecastCard");
                    let cityName = $("<h5>").addClass("card-title").attr("id", "forecastCityName").text(data.city.name);
                    let date = $("<p>").addClass("card-text").text(forecastDate);
                    let temperature = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp + "F")
                    card.append(cityName, date, temperature);
                    $("#weatherForecast").append(card);
                }
            }
            
        })
    }

    var history = [];
    if(localStorage.getItem("history"))
    {
        history = localStorage.getItem("history").split(",")
    }

    if(history.length > 1)
    {
        currentWeatherData(history[history.length-1]);
        fiveDayForecast(history[history.length-1])
    }

    for(let i = 0; i < history.length; i++)
    {
        var cityToAdd = history[i].charAt(0).toUpperCase() + history[i].substring(1)
        addCityToList(cityToAdd);
    }

});