$(document).ready(function() {

    $("#searchButton").on("click", function() {
        let inputCity = $("#citySearch").val();

        addCityToList(inputCity);

    });

    function addCityToList (inputCity) {
        let newRow = $("<button>").addClass("newAddedRow").text(inputCity);
        $("#previousSearches").append(newRow);
        $("#citySearch").val("");
    }

});