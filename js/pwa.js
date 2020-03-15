  // Your web app's Firebase configuration
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

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  //-------------------Authentication Changes--------------------------------------------------------//
  auth.onAuthStateChanged(user => {
  	if (user) {
  		console.log("Guess who is our fav band?");
  		console.log(user.email);


  		if (user.emailVerified) {
  			document.getElementById("profileAvatar").style.color = "#40e0d0";
  			console.log("Linkin Park");
  			document.getElementById("accountDetailsUserName").innerHTML = "Welcome " + user.displayName + " :)";
  			localStorage.setItem("firstName", user.displayName);
  		} else {
  			document.getElementById("profileAvatar").style.color = "#ff758c";
  			console.log("Linkin Park Died");
  			document.getElementById("accountDetailsUserName").innerHTML = "you are logged in with " + user.email + " but You are not verified :(";
  		}

  	} else {
  		document.getElementById("profileAvatar").style.color = "#3e5151";
  		document.getElementById("accountDetailsUserName").innerHTML = "You are not logged in";
  		console.log('user fucking logged out');

  	}
  });
  //-------------------Authentication Changes------------------------------------------------ 
  //------------------------FIRESTORE-----//
  var d = new Date();
  //var u = Date.UTC(2012);
  document.getElementById("demo").innerHTML = d.getTime();


  const commentsView = document.querySelector('#viewComments');
  const commentsWrite = document.querySelector('#Comments');


  //Add data
  commentsWrite.addEventListener('submit', (e) => {
  	e.preventDefault();
  	db.collection('Comments').add({
  		Name: commentsWrite.name.value,
  		Email: commentsWrite.email.value,
  		Comment: commentsWrite.rply.value,
  		Timestamp: commentsWrite.Timestamp.value,

  	});
  	commentsWrite.name.value = '';
  	commentsWrite.email.value = '';
  	commentsWrite.rply.value = '';
  	commentsWrite.Timestamp.value = '';
  	document.querySelector('.alert').style.display = 'block';

  	// Hide alert after 3 seconds
  	setTimeout(function () {
  		document.querySelector('.alert').style.display = 'none';
  	}, 3000);
  })


  //create element and render reviews
  function renderComments(doc) {
  	let li = document.createElement('li');
  	let name = document.createElement('em');
  	// let email = document.createElement('p');
  	let comment = document.createElement('strong');


  	li.setAttribute('date-id', doc.id)
  	name.textContent = " -" + doc.data().Name;
  	// email.textContent = doc.data().Email;
  	comment.textContent = '"' + doc.data().Comment + '"';

  	li.appendChild(comment);
  	li.appendChild(name);
  	// li.appendChild(email);


  	commentsView.appendChild(li);


  }


  db.collection('Comments').orderBy('Timestamp', 'desc').limit(3).onSnapshot(snapshot => {
  	let changes = snapshot.docChanges();
  	console.log(changes);
  	changes.forEach(change => {
  		if (change.type == 'added') {
  			renderComments(change.doc);

  		}
  	})
  });