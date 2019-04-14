$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBE7UQ-8MUNOLsNJvlB8Ul_vMO1CYu4Pu4",
        authDomain: "project1-fe4ae.firebaseapp.com",
        databaseURL: "https://project1-fe4ae.firebaseio.com",
        projectId: "project1-fe4ae",
        storageBucket: "project1-fe4ae.appspot.com",
        messagingSenderId: "1023511600060"
    };
    firebase.initializeApp(config);

    var db = firebase.database();

    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    
   
    $("#submit").on("click", function() {

        trainName = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrain = $("#firstTrain-input").val().trim();
        frequency = $("#frequency-input").val().trim();
        console.log(firstTrain);
        var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        }
        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);

        db.ref().push(newTrain);

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#firstTrain-input").val("");
        $("#frequency-input").val("");
    });
    // first need to get the information entered on the form to be valid so I can find out what else is working or not.
    // KEEP CURRENT TIME CHANGE AND MINUTES TO WAIT
    // db.ref().on("value", function (snap){
    //     "??" = snapshot.val()."??"
    //ADD CHILD  and get firebase to work 
    function newRow (){
     
    var firstTimeConverted = moment(firstTrain, "HHmm").subtract(1, "years");
         
    var diffTime = moment("HHmm").diff(moment(firstTimeConverted), "minutes");
    
    var timeremainder = diffTime % frequency;
    
    var minutesTillTrain = frequency - timeremainder;
    var minutesToWait = moment(minutesTillTrain).format("HHmm");
    var tillTrain = moment("HHmm").add(timeremainder, "minutes");
    var nextTrain = moment(tillTrain).format("HHmm")
    console.log(firstTimeConverted);
    console.log("DIFFERENCE IN TIME: " + diffTime);
    console.log(timeremainder);
    console.log("MINUTES TILL TRAIN: " + minutesToWait);
    console.log("ARRIVAL TIME: " + moment(tillTrain).format("HHmm"));
    //SAVE INTO LOCAL STORAGE
    var newRow = $("<tr></tr>");
    
    $("#tablebody").append(newRow);
    $(newRow).append("<th>" + trainName + "</th>")
    $(newRow).append("<th>" + destination + "</th>")
    $(newRow).append("<th>" + firstTrain + "</th>")
    $(newRow).append("<th>" + frequency + "</th>")
    $(newRow).append("<th>" + nextTrain + "</th>")
    $(newRow).append("<th>" + minutesToWait + "</th>")


  }
    newRow ();
});

