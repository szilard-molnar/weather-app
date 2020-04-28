$(document).ready(function() {

    $("#searchButton").on("click", function() {
        let inputCity = $("#citySearch").val();
        localStorage.setItem("city", inputCity);

        addCityToList(inputCity);

        currentWeatherData(inputCity);

    });

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
            
            //html content to create city card to display info
            // let card = $("div").addClass("card");
            // let cardBody = $("div").addClass("card-body");
            let cardTitle = $("<h2>").addClass("card-title").text(data.name);

            $("#weatherToday").append(cardTitle);
        });
    }

});