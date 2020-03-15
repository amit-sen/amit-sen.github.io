//This is the JS
// Your web app's Firebase configuration
//Made with AMITS APIS
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
};
//------------------------------------------------------------------------------------------//
//star rating system

var collection = document.getElementsByTagName("i");
var output = document.getElementById("out");
var clk = 0;
var finalRating;
    function colorYellow(x){
        clk = 0;
        output.innerHTML="";
        for(var i = 0; i < parseInt(x.id)+1 ; ++i){
            collection[i].style.color = "orange"; 
        }
        for(var k = i ; k < 5; ++k){
            collection[k].style.color = "gray"; 
        }
    }
    function ifClick(x){
        if(clk == 0){
        var div = document.getElementById("out");
        document.getElementById("out").innerHTML=parseInt(x.id)+1;
        finalRating = document.getElementById("out").innerHTML;
        clk = 1;
        }
    }

    function mouseOut(){
        if(clk == 0){
        for(let i = 0; i < 5 ; ++i){
            collection[i].style.color = "gray"; 
        }
    }
}

//submitted star 
function noToStar(ratingId,starCount){
	var totalStar = 5;// total no of star
	var input = document.getElementById("value");
	var div = document.getElementById(ratingId);
	var orangeStar = starCount;// rated star here get value from user

	for(let i = 0; i < orangeStar; i++ ){
		div.innerHTML +="<i style='color:orange' class='fas fa-star'></i>"
	}
	for(let i = orangeStar; i < totalStar; i++ ){
		div.innerHTML += "<i style='color:gray' class='fas fa-star'></i>"
	}
}

//----------------------------------------firebase operation-------------------------------------
var d = new Date();
//var u = Date.UTC(2012);
document.getElementById("demo").innerHTML = d.getTime();


const Reviews = document.querySelector('#viewReviews');
const forms = document.querySelector('#addReviews');
// _____________________________________CHANGE HERE TO THE Reviews PAGE____________________
const nameShow = document.querySelector('#list');
var foodtype = document.getElementById("foodType");
// _____________________________________CHANGE HERE TO THE Reviews PAGE____________________


//Add data
forms.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('Reviews').add({
		Name: forms.Name.value,
		loaction: forms.city.value,
		About: forms.about.value,
		Food: forms.food.value,
		Reviews: forms.reviews.value,
		Ratings: finalRating,
		AuthorName: forms.authorName.value,
		Email: firebase.auth().currentUser.email,
		Phone: forms.phoneNumber.value,
		Photo: imgURL,
		Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
		UserId: firebase.auth().currentUser.uid,
		FoodType: foodtype.value,

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
	}, 2000);


})


// _____________________________________CHANGE HERE TO THE Reviews PAGE____________________

function renderReviewsTwo(doc) {
	let li = document.createElement('li');
	li.setAttribute("class", "foods");
	let nameSh = document.createElement('a');
	// nameSh.setAttribute('id', doc.id);
	nameSh.setAttribute('href', "#" + doc.id);
	nameSh.textContent = doc.data().Name;
	li.appendChild(nameSh);
	nameShow.appendChild(li);
}
// _____________________________________CHANGE HERE TO THE Reviews PAGE____________________


//create element and render reviews
function renderReviews(doc) {
	let li = document.createElement('div');
	let name = document.createElement('h2');
	let location = document.createElement('em');
	let boutt = document.createElement('p');
	let food = document.createElement('p');
	let reviews = document.createElement('p');
	let ratings = document.createElement('p');
	let authorName = document.createElement('em');
	let email = document.createElement('p');
	let phoneNumber = document.createElement('p');
	let photo = document.createElement('img');
	let cross = document.createElement('span');
	let reviewWrite = document.createElement('b');
	let foodType = document.createElement('img');


	// _____________________________________CHANGE HERE TO THE Reviews PAGE____________________	
	li.setAttribute('id', doc.id);
	// _____________________________________CHANGE HERE TO THE Reviews PAGE____________________

	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().Name;
	location.textContent = "Location: " + doc.data().loaction;
	boutt.textContent = "It is a " + doc.data().About + ".";
	food.textContent = "We had tasted " + doc.data().Food + ".";
	reviews.textContent = doc.data().Reviews;
	// ratings.textContent = "Ratings: " + doc.data().Ratings + "+";
	
	ratings.setAttribute("class","submitedRating");
	ratings.setAttribute("id","appendStar"+doc.id);
	authorName.textContent = "This is a personal opinion of " + doc.data().AuthorName + ".";
	email.textContent = doc.data().Email;
	phoneNumber.textContent = doc.data().Phone;
	photo.setAttribute('src', doc.data().Photo);
	photo.setAttribute("class", "testimoPics");
	cross.textContent = 'x';
	reviewWrite.textContent = "Review";
	foodType.setAttribute('class', "foodType_Symbol");
	foodType.setAttribute('src', doc.data().FoodType);


	li.appendChild(photo);
	li.appendChild(foodType);
	li.appendChild(name);
	li.appendChild(location);
	li.appendChild(boutt);
	li.appendChild(food);
	li.appendChild(reviewWrite);
	li.appendChild(reviews);
	li.appendChild(ratings);
	li.appendChild(authorName);
	// li.appendChild(email);
	// li.appendChild(phoneNumber);

	// li.appendChild(cross);

	Reviews.appendChild(li);
	noToStar("appendStar"+doc.id,Number(doc.data().Ratings));
	//delete data
	cross.addEventListener('click', (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
		db.collection('Reviews').doc(id).delete();
	})

}


//get data from firebase
// db.collection('Reviews').orderBy('Name').get().then((snapshot) => {
// 	snapshot.docs.forEach(doc => {
// 		console.log(doc.data())
// 		renderReviews(doc);	
// 	})
// })
//realtime listener
db.collection('Reviews').orderBy('Timestamp', 'desc').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	console.log(changes);
	changes.forEach(change => {
		if (change.type == 'added') {
			renderReviews(change.doc);
			renderReviewsTwo(change.doc);

		} else if (change.type == 'removed') {
			let li = Reviews.querySelector('[data-id=' + change.doc.id + ']');
			Reviews.removeChild(li);
		}
	})
});

function openAddsect() {
	var openSect = document.getElementById("addYourReviews");
	if (openSect.style.display == "none") {
		openSect.style.display = "block";
	} else if (openSect.style.display == "block") {
		openSect.style.display = "none";
	}
};