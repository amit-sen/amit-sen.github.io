//This is the JS
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

firebase.initializeApp(firebaseConfig);
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
//-------------------Authentication Changes--------------------------------------------------------//
auth.onAuthStateChanged(user => {
	if (user) {
		console.log("Guess who is our fav band?");
		console.log(user.email);
		document.getElementById("showWhenUserLoggedOut").style.display = "none";

		if (user.emailVerified) {
			console.log("Linkin Park");
			document.getElementById("somethingSimple").style.display = "block";
			document.getElementById("showWhenUserisNotVerified").style.display = "none";
			document.getElementById("accountDetailsUserName").innerHTML = "Welcome " + user.displayName + " :)";
		} else {
			document.getElementById("somethingSimple").style.display = "none";
			document.getElementById("showWhenUserisNotVerified").style.display = "block";
			console.log("Linkin Park Died");
			document.getElementById("showAccEmail").innerHTML = "you are logged in with " + user.email;
			document.getElementById("accountDetailsUserName").innerHTML = "You are not verified :(";
		}

	} else {
		document.getElementById("accountDetailsUserName").innerHTML = "You are not logged in";
		document.getElementById("somethingSimple").style.display = "none";
		document.getElementById("showWhenUserLoggedOut").style.display = "block";
		console.log('user fucking logged out');

	}
});
//-------------------Authentication Changes------------------------------------------------

//------------------------------------image upload----------------------------------------------
var imgURL;

function upload() {
	//get your select image
	var image = document.getElementById("image").files[0];
	//now get your image name
	var imageName = image.name;
	//firebase  storage reference
	//it is the path where yyour image will store
	var storageRef = firebase.storage().ref('images/' + imageName);
	//upload image to selected storage reference

	var uploadTask = storageRef.put(image);

	uploadTask.on('state_changed', function (snapshot) {
		//observe state change events such as progress , pause ,resume
		//get task progress by including the number of bytes uploaded and total
		//number of bytes
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log("upload is " + progress + " done");
		document.getElementById('pBar').value = progress;

	}, function (error) {
		//handle error here
		console.log(error.message);
	}, function () {
		//handle successful uploads on complete

		uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
			//get your upload image url here...
			console.log(downlaodURL);
			imgURL = downlaodURL;
			document.getElementById('contactForm').style.display = "block";
			document.getElementById('imgUpload').style.display = "none";
			document.getElementById('upImage').src = downlaodURL;
		});
	});
}

//-----------------------------------------------array of function -----------------------//


//--------------------------------------stepUpdate-----------------------------------------//

function addStep(id) {
	//console.log(id);
	var li = document.createElement("div");
	var input = document.createElement("input");
	var button1 = document.createElement("button");
	var button2 = document.createElement("button");

	var newId = "step-" + Math.floor((Math.random() * 100) + 1);

	newId = newId.toString();

	button1.setAttribute("onclick", "addStep('" + newId + "')");
	button2.setAttribute("onclick", "erase('" + newId + "')");

	button1.innerHTML = "+";
	button2.innerHTML = "-";

	input.setAttribute("type", "text");
	input.setAttribute("placeholder", "Add another step");

	li.appendChild(input);
	li.appendChild(button1);
	li.appendChild(button2);
	li.setAttribute("id", newId);
	var refElement = document.getElementById(id);
	refElement.after(li);
}

function erase(newId) {
	var refElement = document.getElementById(newId);
	for (var i = 0; i < 3; i++) {
		refElement.removeChild(refElement.childNodes[0]);
	}
	refElement.remove();
}
var arraySteps = []; //global decleared array---------------->>use this array anywhere
function getValue() {
	var inputs, index, collectionOfSteps;
	collectionOfSteps = document.getElementById('allSteps');
	inputs = collectionOfSteps.getElementsByTagName('input');

	for (var i = 0; i < inputs.length; ++i) {
		arraySteps.pop(); //clear the array
	}

	for (index = 0; index < inputs.length; ++index) {
		arraySteps[index] = inputs[index].value; // enter value to array
	}
	console.log(arraySteps);
	collectionOfSteps.style.display = 'none';
	var output = document.getElementById("outSteps");

	for (var i = 0; i < arraySteps.length; ++i) {
		output.innerHTML += "<li>" + arraySteps[i] + "</li>" + "<br>";
	}
}

//_________________________________________________________________________________________//


//----------------------------------------firebase operation-------------------------------------


const Reviews = document.querySelector('#viewReviews');
const forms = document.querySelector('#addReviews');
const searchList = document.querySelector('#list');
var foodtype = document.getElementById("foodType");


//Add data
forms.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('Recipies').add({
		foodName: forms.foodName.value,
		Description: forms.foodDescription.value,
		Comments: forms.foodComments.value,
		AuthorName: forms.authorName.value,
		Email: firebase.auth().currentUser.email,
		Phone: forms.phoneNumber.value,
		Photo: imgURL,
		Steps: arraySteps,
		Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
		UserId: firebase.auth().currentUser.uid,
		FoodType: foodtype.value,

	});
	forms.foodName.value = '';
	forms.foodDescription.value = '';
	forms.foodComments.value = '';
	forms.authorName.value = '';
	forms.email.value = '';
	forms.phoneNumber.value = '';
	forms.Timestamp.value = '';
	setTimeout(function () {
		window.location.reload(1);
	}, 5000);


})


//create element and render reviews
function renderReviews(doc) {
	let li = document.createElement('div');
	let foodName = document.createElement('h2');
	let foodDescription = document.createElement('em');
	let stepsOfRecepies = document.createElement('ol');
	let foodComments = document.createElement('em');
	let authorName = document.createElement('p');
	let email = document.createElement('p');
	let phoneNumber = document.createElement('p');
	let foodType = document.createElement('img');
	let photo = document.createElement('img');
	let cross = document.createElement('p');
	let headingOfSteps = document.createElement('h4');
	let headingOfComment = document.createElement('h4');


	li.setAttribute('data-id', doc.id);
	li.setAttribute('id', doc.id);
	stepsOfRecepies.setAttribute('class', 'stepsOfRecipies');
	foodName.textContent = doc.data().foodName;
	foodDescription.textContent = doc.data().Description;

	for (var i = 0; i < doc.data().Steps.length; i++) {
		stepsOfRecepies.innerHTML += "<li>" + doc.data().Steps[i] + "</li>";
	}

	headingOfSteps.textContent = "Steps";
	headingOfComment.textContent = "Comment";
	foodComments.textContent = doc.data().Comments;
	authorName.textContent = "This recipie is sent to us by " + doc.data().AuthorName + ".";
	email.textContent = doc.data().Email;
	phoneNumber.textContent = doc.data().Phone;
	photo.setAttribute('src', doc.data().Photo);
	authorName.setAttribute("class", "authorNameData")
	photo.setAttribute("class", "testimoPics");
	cross.textContent = 'DELETE';
	foodType.setAttribute('class', "foodType_Symbol");
	foodType.setAttribute('src', doc.data().FoodType);
	// foodType.textContent = doc.data().FoodType;


	li.appendChild(photo);
	li.appendChild(foodType);
	li.appendChild(foodName);
	li.appendChild(foodDescription);
	li.appendChild(headingOfSteps);
	li.appendChild(stepsOfRecepies);
	li.appendChild(headingOfComment);
	li.appendChild(foodComments);
	li.appendChild(authorName);
	// li.appendChild(email);
	// li.appendChild(phoneNumber);
	// li.appendChild(cross);

	Reviews.appendChild(li);

	//delete data
	cross.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('Recipies').doc(id).delete();
	})

}


// ____________________________________________________________________________________________________________________________
function renderSearch(doc) {
	let li = document.createElement('li');
	li.setAttribute("class", "foods");
	// let foodName = document.createElement('p');
	let foodName = document.createElement('a');


	// li.setAttribute('data-id', doc.id);
	// li.setAttribute('id', doc.id);

	foodName.setAttribute('href', "#" + doc.id);
	foodName.textContent = doc.data().foodName;

	li.appendChild(foodName);


	searchList.appendChild(li);

}
// ____________________________________________________________________________________________________________________________


//get data from firebase
// db.collection('Reviews').orderBy('Name').get().then((snapshot) => {
// 	snapshot.docs.forEach(doc => {
// 		console.log(doc.data())
// 		renderReviews(doc);	
// 	})
// })
//realtime listener
db.collection('Recipies').orderBy('Timestamp', 'desc').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	console.log(changes);
	changes.forEach(change => {
		if (change.type == 'added') {
			renderReviews(change.doc);
			renderSearch(change.doc);

		} else if (change.type == 'removed') {
			let li = Reviews.querySelector('[data-id=' + change.doc.id + ']');
			Reviews.removeChild(li);
		}
	})
});


function openAddsect() {
	var openSect = document.getElementById("openTheAddSection");
	if (openSect.style.display == "none") {
		openSect.style.display = "block";
	} else if (openSect.style.display == "block") {
		openSect.style.display = "none";
	}
};
