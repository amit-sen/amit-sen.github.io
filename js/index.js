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
  		document.getElementById("showWhenUserisNotLoggedIn").style.display = "none";
  		document.getElementById("showWhenUserisNotLoggedInTwo").style.display = "none";
  		document.getElementById("showWhenUserisLoggedInTwo").style.display = "block";
  		console.log("Guess who is our fav band?");
  		console.log(user.email);

  		if (user.emailVerified) {
  			document.getElementById("showWhenUserIsNotVerified").style.display = "none";
  			document.getElementById("showWhenUserisLoggedIn").style.display = "block";


  			console.log("Linkin Park");
  			document.getElementById('accountDetailsUserName').innerHTML = `<div>Welcome ${user.displayName}!</div>`;
  			document.getElementById('accountDetailsUserNameTwo').innerHTML = `<div>Welcome ${user.displayName}!</div>`;
  		} else {
  			document.getElementById('showAccountDetailsEmail').innerHTML = `<h2>Welcome ${user.email}!</h2>`;
  			document.getElementById("showWhenUserisLoggedIn").style.display = "none";
  			document.getElementById("showWhenUserIsNotVerified").style.display = "block"
  			console.log("Linkin Park Died");
  		}

  	} else {
  		document.getElementById("showWhenUserIsNotVerified").style.display = "none";
  		document.getElementById("showWhenUserisNotLoggedIn").style.display = "block";
  		document.getElementById("showWhenUserisLoggedIn").style.display = "none";
  		document.getElementById("showWhenUserisNotLoggedInTwo").style.display = "block";
  		document.getElementById("showWhenUserisLoggedInTwo").style.display = "none";
  		console.log('user fucking logged out');
  	}
  });
  //-------------------Authentication Changes--------------------------------------------------------//
  //-----------------------------------------LOG IN------------------------------------------------------//
  //Login a User
  const logInForm = document.querySelector('#loginUser');
  logInForm.addEventListener('submit', (e) => {
  	e.preventDefault();

  	//get user infos
  	const email = logInForm['logInEmail'].value;
  	const pass = logInForm['logInPass'].value;

  	//login user
  	auth.signInWithEmailAndPassword(email, pass).then(cred => {
  		console.log(cred.user);
  		// document.getElementById("optTwo").style.display = "none";
  		logInForm.reset();

  	}).catch(function (error) {
  		console.log("error")
  		document.getElementById("loginError").innerHTML = error.message;
  	});
  });
  //-----------------------------------------LOG OUT------------------------------------------------------//
  //Logout a user
  const logOutForm = document.querySelector('#logOut');
  logOutForm.addEventListener('submit', (e) => {
  	e.preventDefault();
  	auth.signOut().then(() => {
  		console.log('user logged out');
  		// document.getElementById("logOutConfirm").innerHTML = "User Logged Out.";
  	});
  });
  const logOutForm2 = document.querySelector('#logOut2');
  logOutForm2.addEventListener('submit', (e) => {
  	e.preventDefault();
  	auth.signOut().then(() => {
  		console.log('user logged out');
  		// document.getElementById("logOutConfirm").innerHTML = "User Logged Out.";
  	});
  });
  // [{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}{{{{{{{{{{{{{{{{{}}}}}}}}}}}}{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}]
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

  	// //delete data
  	// cross.addEventListener('click', (e) => {
  	//  e.stopPropagation();
  	//  let id = e.target.parentElement.getAttribute('data-id');
  	//  db.collection('Reviews').doc(id).delete();
  	// })

  }

  //get data from firebase
  // db.collection('Reviews').orderBy('Name').get().then((snapshot) => {
  //  snapshot.docs.forEach(doc => {
  //    console.log(doc.data())
  //    renderReviews(doc); 
  //  })
  // })
  //realtime listener
  db.collection('Comments').orderBy('Timestamp', 'desc').limit(3).onSnapshot(snapshot => {
  	let changes = snapshot.docChanges();
  	console.log(changes);
  	changes.forEach(change => {
  		if (change.type == 'added') {
  			renderComments(change.doc);

  		}
  	})
  })


  //-------------------------------------------------Other Data from Collection-------------------------------//
  // db.collection('Reviews').get().then(snapshot => {
  //  console.log(snapshot.docs);

  // });

  // db.collection('Recipies').get().then(snapshot => {
  //  console.log(snapshot.docs);
  // });
  //-------------------------------------------fetch Data to top Recipies-----------------------------------//
  var reqs_id = 0;
  db.collection("Recipies").orderBy("Timestamp", "desc").limit(4).get().then(function (querySnapshot) {
  	querySnapshot.forEach(function (doc) {
  		// doc.data() is never undefined for query doc snapshots

  		var getDataObject = doc.data();

  		var recipiesDiv = document.createElement("div");
  		recipiesDiv.setAttribute("id", doc.id);
  		var recipiesImg = document.createElement("img");
  		recipiesImg.setAttribute("class", "testimoPics");
  		recipiesImg.src = getDataObject.Photo;


  		var recipiesH3 = document.createElement("h3");
  		recipiesH3.innerHTML = getDataObject.foodName;

  		var recipiesP = document.createElement("p");
  		recipiesP.innerHTML = getDataObject.Description;

  		var recipiesEm = document.createElement("em");
  		recipiesEm.innerHTML = getDataObject.AuthorName;

  		var recipiesA = document.createElement("p");
  		// 
  		reqs_id++;
  		recipiesA.setAttribute("id", "knowmore" + reqs_id);
  		recipiesA.setAttribute("style", "cursor: pointer");

  		recipiesA.innerHTML = "Know More";

  		var recipiesBr = document.createElement("br");

  		recipiesDiv.appendChild(recipiesImg);
  		recipiesDiv.appendChild(recipiesH3);
  		recipiesDiv.appendChild(recipiesP);
  		recipiesDiv.appendChild(recipiesEm);
  		recipiesDiv.appendChild(recipiesBr);
  		recipiesDiv.appendChild(recipiesA);

  		var topRecpCont = document.getElementById("topRecipiesContainer");
  		topRecpCont.appendChild(recipiesDiv);
  	});
  });
  //-------------------------------------------fetch Data to top Recipies-----------------------------------//


  //-------------------------------------------fetch Data to top Reviews-----------------------------------//
  db.collection("Reviews").orderBy("Timestamp", "desc").limit(4).get().then(function (querySnapshot) {
  	querySnapshot.forEach(function (doc) {
  		// doc.data() is never undefined for query doc snapshots

  		var getDataObject = doc.data();

  		var reviewsDiv = document.createElement("div");
  		reviewsDiv.setAttribute("id", doc.id);

  		var reviewsImg = document.createElement("img");
  		reviewsImg.setAttribute("class", "testimoPics");
  		reviewsImg.src = getDataObject.Photo;


  		var reviewsH3 = document.createElement("h3");
  		reviewsH3.innerHTML = getDataObject.Name;

  		var reviewsP = document.createElement("p");
  		reviewsP.innerHTML = getDataObject.Reviews;

  		var reviewsA = document.createElement("p");
  		reqs_id++;
  		reviewsA.setAttribute("id", "knowmore" + reqs_id);
  		reviewsA.setAttribute("style", "cursor: pointer");
  		reviewsA.innerHTML = "Know More";

  		var reviewsBr = document.createElement("br");

  		reviewsDiv.appendChild(reviewsImg);
  		reviewsDiv.appendChild(reviewsH3);
  		reviewsDiv.appendChild(reviewsP);
  		reviewsDiv.appendChild(reviewsBr);
  		reviewsDiv.appendChild(reviewsA);

  		var topRevwCont = document.getElementById("topReviewsContainer");
  		topRevwCont.appendChild(reviewsDiv);
  	});
  });
  //-------------------------------------------fetch Data to top Reviews-----------------------------------//