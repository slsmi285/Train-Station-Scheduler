(function () {
    'use strict';
    window.addEventListener('load', function () {
        //for all the forms, applying Bootstrap styles
        var forms = document.getElementsByClassName('needs-validation');
        //for loop
        var validation = Array.prototype.filter.call(forms, function(form) {
            //console.log("this works");
            form.addEventListener("submit", function (event) {

                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            }, false);
    });
}, false);
    }) ();

//Initialize Firebase
var config = {
    apiKey: "AIzaSyDsfjzOZIrOSHB5eIChVdd1aAxKtRHaEK4",
    authDomain: "anewproject-7bdc3.firebaseapp.com",
    databaseURL: "https://anewproject-7bdc3.firebaseio.com",
    projectId: "anewproject-7bdc3",
    storageBucket: "anewproject-7bdc3.appspot.com",
    messagingSenderId: "167156706154",
    appId: "1:167156706154:web:dc962d5bd3e732f7d65313"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
console.log("this works, line 35");

$("#submit-button").on("click", function(event) {
    event.preventDefault();
})

//Grabs user Input
var input = $("input");
var tName = $("#train-name").val().trim();
var tDestination = $("#train-destination").val().trim();
var tFirstTime = moment($("#train-first-train").val().trim(), "HH:mm");
var tFrequency = parseInt($("#train-frequency").val().trim());

    if (tName.length === 0) {
        tName = "";
        $("#train-name").val("");
        $("#train-name").attr("class", "form-control is-invalid");
        $("#invalid-name").text("Please enter a Train name")
    }
    else {
        $("#train-name").attr("class", "form-control");
        $("#invalid-name").text("");
    }
    if (tDestination.length === 0) {
        tDestination = "";
        $("#train-destination").val("");
        $("#train-destination").attr("class", "form-control is-invalid");
        $("#invalid-destination").text("Please enter a destination");
    }
    else {
        $("#train-destination").attr("class", "form-control");
        $("#invalid-destination").text("");
    }
    if (Number.isInteger(tFrequency) === false) {
        $("#train-frequency").val("");
        $("#train-frequency").attr("class", "form-control is-invalid");
        $("#invalid-frequency").text("Please enter a frequency");
    }
    else {
        $("#train-frequency").attr("class", "form-control");
        $("#invalid-frequency").text("");
    }
    if (moment(tFirstTime).isValid() === false) {
        tFirstTime = "";
        $("#train-first-time").val("");
        $("#train-first-time").attr("class", "form-control is-invalid");
        $("#invalid-time").text("Please enter a valid time");

//return;
    };

    $("#train-first-time").attr("class", "form-control");
        $("#invalid-time").text("");

        //Creates local object for holding train data
        var newTrain = {
            name: tName,
            destination: tDestination,
            firstTime: tFirstTime.format("HH:mm"),
            frequency: tFrequency
        };
        $("#train-first-time").attr("class", "form-group");

        $("#helpBlock").text("");

        //Code for pushing train data to Firebase
        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.firstTime);
        console.log(newTrain.frequency);

        //Clear all of text-boxes
        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-first-time").val("");
        $("#train-frequency").val("");
    

    //Firebase watcher + initial loader
    database.ref().on("child_added", function(childSnapshot) {
        var tName = (childSnapshot.val().name);
        var tDestination = (childSnapshot.val().destination);
        var tFirstTime = (childSnapshot.val().firstTime);
        var tFrequency = (childSnapshot.val().frequency);

        var convertedTime = moment(tFirstTime, "HH:mm").subtract(1, "years");
        console.log(convertedTime);

        //Current Time
        var currentTime = moment();

        //Difference between the times
        var diffTime = moment().diff(moment(convertedTime), "minutes");
        console.log("Difference in time: " + diffTime);

        //Time apart
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        //Minutes Until Train
        var minutesAway = tFrequency - tRemainder;
        console.log("Minutes until train: " + minutesAway);

        //Next Train
        var nextArrival = moment().add(minutesAway, "minutes");
        console.log("Arrival time: " + moment(nextArrival).format("HH:mm"));

        //Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(tName),
            $("<td>").text(tDestination),
            $("<td>").text(tFrequency),
            $("<td>").text(nextArrival.format("HH:mm")),
            $("<td>").text(minutesAway),
        );

        //Append the new row to the table
        $("#full-table").append(newRow);
    })
    
