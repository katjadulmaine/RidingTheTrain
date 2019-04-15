$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBE7UQ-8MUNOLsNJvlB8Ul_vMO1CYu4Pu4",
        autdDomain: "project1-fe4ae.firebaseapp.com",
        databaseURL: "https://project1-fe4ae.firebaseio.com",
        projectId: "project1-fe4ae",
        storageBucket: "project1-fe4ae.appspot.com",
        messagingSenderId: "1023511600060"
    };
    firebase.initializeApp(config);

    var db = firebase.database();


    $("#submit").on("click", function () {
        event.preventDefault();

        var trainName = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = moment($("#firstTrain-input").val().trim(), "HHmm").format("X");
        var frequency = $("#frequency-input").val().trim();
        console.log(firstTrain);

        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        };

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#firstTrain-input").val("");
        $("#frequency-input").val("");
    });
    db.ref().push(newTrain);

    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    db.ref().on("child_added", function (childSnap) {
        console.log(childSnap.val());
        var trName = childSnap.val().trainName;
        var trDestination = childSnap.val().destination;
        var trFirst = childSnap.val().firstTrain;
        var trFrequency = childSnap.Val().frequency;

        var trFirstTime = moment.unix(trFirst).format("HHmm");
        var diffTime = moment("HHmm").diff(moment(trFirstTime), "minutes");
        var timeremainder = diffTime % trFrequency;
        var minutesTillTrain = trFrequency - timeremainder;
        var minutesToWait = moment(minutesTillTrain).format("HHmm");
        var tillTrain = moment("HHmm").add(timeremainder, "minutes");
        var nextTrain = moment(tillTrain).format("HHmm")

        console.log(diffTime);
        console.log(timeremainder);
        console.log(minutesToWait);
        console.log(moment(tillTrain).format("HHmm"));

        var newTableRow = $("<tr>").append(
            $("<td>").text(trName),
            $("<td>").text(trDestination),
            $("<td>").text(trFirstTime),
            $("<td>").text(trFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesToWait),
        );
    });  
        $("#tablebody").append(newTableRow);


});

