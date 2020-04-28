$(document).ready(function() {

    $("#searchButton").on("click", function() {
        let inputCity = $("#citySearch").val();

        addCityToList(inputCity);

        console.log(currentWeatherData(inputCity));

    });

    function addCityToList (inputCity) {
        let newRow = $("<button>").addClass("newAddedRow").text(inputCity);
        $("#previousSearches").append(newRow);
        $("#citySearch").val("");
    }

    function currentWeatherData (inputCity) {
        $.ajax({
            type: "GET",
            url: "api.openweathermap.org/data/2.5/weather?q=" + inputCity +"&appid=bc27f66aec34ec713bbdaac02025b3ac",
            dataType: "json",
            success: function(data) {
                console.log(data.name);
            }
        })
    }

});