// JavaScript code 
// function search_foods() { 
//     let input = document.getElementById('searchbar').value 
//     input=input.toLowerCase(); 
//     let x = document.getElementsByClassName('foods'); 
//     document.getElementById("list").style.display = "block";

//     for (i = 0; i < x.length; i++) {  
//         if (!x[i].innerHTML.toLowerCase().includes(input) || input=="") { 
//             x[i].style.display="none"; 
//         } 
//         else { 
//             x[i].style.display="list-item";                  
//         }
//     } 
// } 

// document.addEventListener("click", function(){
//  document.getElementById("list").style.display = "none";
//  document.getElementById('searchbar').value = "";
// });


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
//----------------------------------------firebase operation-------------------------------------
var d = new Date();
//var u = Date.UTC(2012);
document.getElementById("demo").innerHTML = d.getTime();


// const Reviews = document.querySelector('#viewReviews');
const forms = document.querySelector('#addReviews');
const searchList = document.querySelector('#list');


//Add data
forms.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('Reviews').add({
		Name: forms.Name.value,
		loaction: forms.city.value,
		About: forms.about.value,
		Food: forms.food.value,
		Reviews: forms.reviews.value,
		Ratings: forms.ratings.value,
		AuthorName: forms.authorName.value,
		Email: forms.email.value,
		Phone: forms.phoneNumber.value,
		Photo: imgURL,
		Timestamp: forms.Timestamp.value,

	});
	forms.Name.value = '';
	forms.city.value = '';
	forms.about.value = '';
	forms.food.value = '';
	forms.reviews.value = '';
	forms.ratings.value = '';
	forms.Timestamp.value = '';
	forms.email.value = '';
	forms.phoneNumber.value = '';
	forms.Timestamp.value = '';
	setTimeout(function () {
		window.location.reload(1);
	}, 5000);


})


//create element and render reviews
//PUT DATA TO SEARCH ALSO
function searchList(doc) {
	let li = document.createElement('li');
	let name = document.createElement('p');


	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().Name;


	li.appendChild(name);


	searchList.appendChild(li);

	//delete data
	cross.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('Reviews').doc(id).delete();
	})

}


//get data from firebase
// db.collection('Reviews').orderBy('Name').get().then((snapshot) => {
//  snapshot.docs.forEach(doc => {
//      console.log(doc.data())
//      renderReviews(doc); 
//  })
// })
//realtime listener
db.collection('Reviews').orderBy('Timestamp', 'desc').limit(3).onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	console.log(changes);
	changes.forEach(change => {
		if (change.type == 'added') {
			renderReviews(change.doc);

		} else if (change.type == 'removed') {
			let li = Reviews.querySelector('[data-id=' + change.doc.id + ']');
			Reviews.removeChild(li);
		}
	})
})