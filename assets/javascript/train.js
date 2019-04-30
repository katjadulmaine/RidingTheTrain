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

    $("#submit").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#firstTrain-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        console.log(firstTrain);

        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        };

        db.ref().push(newTrain);   
        
        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#firstTrain-input").val("");
        $("#frequency-input").val("");
    });
   
    db.ref().on("child_added", function (childSnap) {
        console.log(childSnap.val());
        var trName = childSnap.val().trainName;
        var trDestination = childSnap.val().destination;
        var trFirst = childSnap.val().firstTrain;
        var trFrequency = childSnap.val().frequency;

        var firstTimeConverted = moment(trFirst, "HH:mm").subtract(1, "years");
        var currentTime = moment();
      // var trFirstTime = moment.unix(trFirst).format("X");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var timeRemainder = diffTime % trFrequency;
        var minutesToWait = trFrequency - timeRemainder;
        var nextTrain = moment().add(minutesToWait, "minutes");
       // var tillTrain = moment("HH:mm").add(timeRemainder, "minutes");
        //var nextTrain = moment(tillTrain).format("HH:mm")
   
        console.log(diffTime);
        console.log(timeRemainder);
        console.log(minutesToWait);
        console.log(moment(nextTrain).format("HH:mm"));

        var newTableRow = $("<tr>").append(
            $("<td>").text(trName),
            $("<td>").text(trDestination),
            $("<td>").text(trFirst),
            $("<td>").text(trFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesToWait),
        );
        $("#tableBody").append(newTableRow);
    });  
       


});

