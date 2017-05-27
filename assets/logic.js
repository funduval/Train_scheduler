
	
 

  // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBrhZoUKI-rJITLNwKr8am1LWllGUVnEYA",
    authDomain: "train-scheduler-17c7e.firebaseapp.com",
    databaseURL: "https://train-scheduler-17c7e.firebaseio.com",
    projectId: "train-scheduler-17c7e",
    storageBucket: "train-scheduler-17c7e.appspot.com",
    messagingSenderId: "23619964397"
  };
 



  firebase.initializeApp(config);


	var database = firebase.database();


	// submit new trains
	$("#add-train-btn").on("click", function(event) {

	    event.preventDefault();

	    //user input
	    var trainName = $("#train-name-input").val().trim();
	    var trainDestination = $("#destination-input").val().trim();
	    var firstTrain = moment($("#first-input").val().trim(), "hh:mm").format("X");
	    var trainFrequency = $("#frequency-input").val().trim();


	    // train data goes here for now as an object
	    var newTrain = {
	        name: trainName,
	        destination: trainDestination,
	        first: firstTrain,
	        frequency: trainFrequency
	    };


	    // train data uploaded to the database
	    database.ref().push(newTrain);
	
	    console.log(newTrain.name);
	    console.log(newTrain.destination);
	    console.log(newTrain.first);
	    console.log(newTrain.frequency);

	   
	    alert("train successfully added");
	 
	    $("#train-name-input").val("");
	    $("#destination-input").val("");
	    $("#first-input").val("");
	    $("#frequency-input").val("");
	});
	//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	    console.log(childSnapshot.val());
	   
	    var trainName = childSnapshot.val().name;
	    var trainDestination = childSnapshot.val().destination;
	    var firstTrain = childSnapshot.val().first;
	    var trainFrequency = childSnapshot.val().frequency;
	   
	    console.log(trainName);
	    console.log(trainDestination);
	    console.log(firstTrain);
	    console.log(trainFrequency);
	   //=======================================================================================================
//Determine train times:
// First Time (pushed back 1 year to make sure it comes before current time)
   
	var firstTrainPretty = moment.unix(firstTrain).format("hh:mm");
    console.log("FIRST TRAIN: " + firstTrainPretty);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment.unix(firstTrain), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % trainFrequency;
    console.log(remainder);

    // Minute Until Train
    var minutesLeft = trainFrequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesLeft);

    // Next Train
    var nextTrain = moment().add(minutesLeft);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    
    var nextTrainPretty = moment.unix(nextTrain).format("hh:mm");
 
	    
	    // Add each train's data into the table
	    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
	        firstTrainPretty + "</td><td>" + trainFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + minutesLeft +"</td></tr>")

	    });
