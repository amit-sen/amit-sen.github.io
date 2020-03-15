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
//-------------------Authentication Changes------------------------------------------------

//get data from firebase
var docIdcount = [];
var i = 0;
var newId;
var recIdArray = [];

db.collection('Recipies').get().then((snapshot) => {
	snapshot.docs.forEach(doc => {
		console.log(doc.id);
		docIdcount[i] = doc.id;
		i++;
	});

	var newId = Math.floor(Math.random() * docIdcount.length);  
	var RandDocIdGet = String(docIdcount[newId]);
	console.log(RandDocIdGet,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");


	var docRef = db.collection("Recipies").doc(RandDocIdGet);

		docRef.get().then(function(doc) {
		    if (doc.exists) {
		    	renderReviews(doc);	
		        console.log("Document data:", doc.data());
		    } else {
		        // doc.data() will be undefined in this case
		        console.log("No such document!");
		    }
		}).catch(function(error) {
		    console.log("Error getting document:", error);
		});


});





//----------------------------------------firebase operation-------------------------------------


const Reviews = document.querySelector('#viewReviews');




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
	console.log(doc.data().Phone,"E AMAY STEPS DEKHABE (POTH DEKHANO)");

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
	// cross.addEventListener('click', (e) => {
	// 	e.stopPropagation();
	// 	let id = e.target.parentElement.getAttribute('data-id');
	// 	db.collection('Recipies').doc(id).delete();
	// })

}




