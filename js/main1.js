  // Your web app's Firebase configuration
  var firebaseConfig = {
  	apiKey: "AIzaSyChd6KP24WVGfW6Z2kxqykb1svW7mlutpA",
  	authDomain: "foodyc-xyz.firebaseapp.com",
  	databaseURL: "https://foodyc-xyz.firebaseio.com",
  	projectId: "foodyc-xyz",
  	storageBucket: "foodyc-xyz.appspot.com",
  	messagingSenderId: "670115802063",
  	appId: "1:670115802063:web:c7a48183238b9d467e80ba",
  	measurementId: "G-8NDZ2DL50H"
  };

  firebase.initializeApp(config);

  // Reference messages collection
  var messagesRef = firebase.database().ref('messages1');

  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);

  // Submit form
  function submitForm(e) {
  	e.preventDefault();

  	// Get values
  	var name = getInputVal('name');
  	var email = getInputVal('email');
  	var rply = getInputVal('rply');

  	// Save message
  	saveMessage(name, email, rply);

  	// Show alert
  	document.querySelector('.alert').style.display = 'block';

  	// Hide alert after 3 seconds
  	setTimeout(function () {
  		document.querySelector('.alert').style.display = 'none';
  	}, 3000);


  	// Clear form
  	document.getElementById('contactForm').reset();
  }

  // Function to get get form values
  function getInputVal(id) {
  	return document.getElementById(id).value;
  }

  // Save message to firebase
  function saveMessage(name, email, rply) {
  	var newMessageRef = messagesRef.push();
  	newMessageRef.set({
  		name: name,
  		email: email,
  		reply: rply
  	});
  }