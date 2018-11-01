$(document).ready(function () {
    var animal = ["cat", "dog", "zebra", "bear", "tiger", "hamster"];

    function button_generator(stuff_array) {
        $("#button_div").empty();
        for (var x = 0; x < animal.length; x++) {
            $("#button_div").append("<button type='button' class='btn btn-primary animal-class' data-type='" + stuff_array[x] + "' id='" + stuff_array[x] + "'>" + stuff_array[x]);
            console.log("button generated " + x);
        }

    }

    function apicall(searchStuff) {
        console.log("API stuff")
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchStuff + "&api_key=Ls4e1MV3ct8HEsAFNff595snmsxQggyI"
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (res) {
                console.log(JSON.stringify(res.data))
                var comeback = res.data;
                for (var i = 0; i < comeback.length; i++) {
                    var rating = comeback[i].rating;
                    var still = comeback[i].images.fixed_height_still.url;
                    var animited = comeback[i].images.fixed_height.url;
                    var image = $("<img>");
                    image.attr("src", still)
                    image.attr("data-still", still)
                    image.attr("data-animate", animited)
                    image.attr("data-state", "still")
                    image.addClass("animal_imgs")
                    $("#GIF").append(image);
                    $("#GIF").append("<p>" + rating + "</p>")
                }
            })
    }

    button_generator(animal);
    $(".animal-class").click(function (e) {
        console.log("click")
        $("#GIF").empty();
        var data = $(this).attr("data-type");
        console.log(data);
        apicall(data);
    })
    $(".animal_imgs").click(function (e) {
        console.log("switch")
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
    $("#animal-in").click(function(e){
        event.preventDefault();
        var animalin=$("#animal-input").eq(0).val();
        if (animalin.length > 2) {
            animal.push(animalin);
          }
        button_generator(animal);
    })

});
