//-------------------------------------Initialize firebase backend-----------------------------------//
//TITAS's API	
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
};;


//AMITS API
// var firebaseConfig = {
//   apiKey: "AIzaSyABeE_WQIhvoaWc5eLvBbhuz6-jdChl6no",
//   authDomain: "data-fcbb2.firebaseapp.com",
//   databaseURL: "https://data-fcbb2.firebaseio.com",
//   projectId: "data-fcbb2",
//   storageBucket: "data-fcbb2.appspot.com",
//   messagingSenderId: "61759807849",
//   appId: "1:61759807849:web:65f4c9c02d5ac4cd0b9df8",
//   measurementId: "G-81SMMDDEEC"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
//-------------------------------------Initialized firebase backend---------------------------------// 

//-------------------------------------Global Decleration---------------------------------//
var imgURL = "https://firebasestorage.googleapis.com/v0/b/contactform-f97c1.appspot.com/o/Profile%20Picture%2Ficon-72x72.png?alt=media&token=a72c010e-33dc-47ba-9885-196804048404";
//-------------------------------------Global Decleration---------------------------------//
// function onSignUpStateChange() {
// 	var x = document.getElementById("optOne").style.display;
// 	var y = document.getElementById("optTwo").style.display;
// 	x.style.display = "none";
// 	y.style.display = "block";
// }
function openSignUpform() {
	document.getElementById("optOne").style.display = "block";
	document.getElementById("optThree").style.display = "none";

}

//-------------------Authentication Changes--------------------------------------------------------//
auth.onAuthStateChanged(user => {
	if (user) {
		var user = firebase.auth().currentUser;
		console.log(user.uid);
		//------------------------------------------------------FIRESTORE---------------------------//
		const showChat = document.querySelector('#showAllChats');
		db.collection('Reviews').where("UserId", "==", user.uid).onSnapshot(snapshot => {
			let changes = snapshot.docChanges();
			console.log(changes);
			changes.forEach(change => {
				if (change.type == 'added') {
					renderChatviews(change.doc);

				} else if (change.type == 'removed') {
					let div = showChat.querySelector('[data-id=' + change.doc.id + ']');
					showChat.removeChild(div);
				}
				console.log("you deadly didly");

			})
		});

		//Render the data
		function renderChatviews(doc) {
			let frame = document.createElement('div');
			let chatText = document.createElement('h4');
			// let userName = document.createElement('em');
			// let userId = document.createElement('p');
			// let timeStamp = document.createElement('p');
			let cross = document.createElement('p');


			frame.setAttribute('id', doc.data().UserId);
			frame.setAttribute('data-id', doc.id);


			chatText.textContent = '"' + doc.data().Name + '"';
			// userName.textContent = '-'+doc.data().Name;
			// userId.textContent = doc.data().UserId;
			// timeStamp.textContent =  doc.data().Timestamp;
			cross.textContent = 'DELETE';
			cross.textContent = "Delete";


			frame.appendChild(chatText);
			// frame.appendChild(userName);
			// frame.appendChild(userId);
			// frame.appendChild(timeStamp);
			frame.appendChild(cross);

			showChat.appendChild(frame);


			//delete data
			cross.addEventListener('click', (e) => {
				e.stopPropagation();
				let id = e.target.parentElement.getAttribute('data-id');
				db.collection('Reviews').doc(id).delete();
			})
		};

		//------------------------------------------------------FIRESTORE---------------------------//
		//---------------------------------------------SECOND--FIRESTORE---------------------------//
		const showChatTwo = document.querySelector('#showAllChatsTwo');
		db.collection('Recipies').where("UserId", "==", user.uid).onSnapshot(snapshot => {
			let changes = snapshot.docChanges();
			console.log(changes);
			changes.forEach(change => {
				if (change.type == 'added') {
					renderChatviewsTwo(change.doc);

				} else if (change.type == 'removed') {
					let div = showChatTwo.querySelector('[data-id=' + change.doc.id + ']');
					showChatTwo.removeChild(div);
				}
				console.log("you deadly didly");

			})
		});

		//Render the data
		function renderChatviewsTwo(doc) {
			let frame = document.createElement('div');
			let chatText = document.createElement('h4');
			// let userName = document.createElement('em');
			// let userId = document.createElement('p');
			// let timeStamp = document.createElement('p');
			let cross = document.createElement('p');


			frame.setAttribute('id', doc.data().UserId);
			frame.setAttribute('data-id', doc.id);


			chatText.textContent = '"' + doc.data().foodName + '"';
			// userName.textContent = '-'+doc.data().Name;
			// userId.textContent = doc.data().UserId;
			// timeStamp.textContent =  doc.data().Timestamp;
			cross.textContent = 'DELETE';
			cross.textContent = "Delete";


			frame.appendChild(chatText);
			// frame.appendChild(userName);
			// frame.appendChild(userId);
			// frame.appendChild(timeStamp);
			frame.appendChild(cross);

			showChatTwo.appendChild(frame);


			//delete data
			cross.addEventListener('click', (e) => {
				e.stopPropagation();
				let id = e.target.parentElement.getAttribute('data-id');
				db.collection('Recipies').doc(id).delete();
			})
		};
		//---------------------------------------------SECOND--FIRESTORE---------------------------//


		if (user.emailVerified) {
					//----UPDATE AFTER VERIFY--------
				if (user.displayName !=null) {
					document.getElementById("optTwo").style.display = "none";
					window.userIdNum = user.uid;
					console.log("Linkin Park");
					console.log('user logged in', user);
					document.getElementById('welcomeUser').innerHTML = `<div>Welcome ${user.displayName}!</div>`;
					setupUi(user);
					document.getElementById("verifyEmailBeforEverything").style.display = "none";
				}else{
					document.getElementById("optTwo").style.display = "block";
				}

		} else {
			console.log("Linkin Park Died");
			document.getElementById("verifyEmailBeforEverything").style.display = "block";
			document.getElementById("optThree").style.display = "none";
		}


	} else {
		console.log('user fucking logged out');
		document.getElementById('welcomeUser').innerHTML = "";
		setupUi();
		getFirestoreData();
		showUserGenData([]);
	}
});
//-------------------Authentication Changes--------------------------------------------------------//

//-----------------------------------------SIGNUP-----------------------------------------------------//
//sign up a user
const signUpForm = document.querySelector('#signUpUser');
signUpForm.addEventListener('submit', (e) => {
	e.preventDefault();
	//user info
	const email = signUpForm['signUpEmail'].value;
	const pass = signUpForm['signUpPass'].value;
	//signup the user
	auth.createUserWithEmailAndPassword(email, pass).then(cred => {
		console.log(cred);
		signUpForm.reset();
		var user = firebase.auth().currentUser;


		user.sendEmailVerification().then(function () {
			// Email sent.
			console.log("email verification sent")
			document.getElementById("signUpError").innerHTML = "Email verification Sent! Check Your Email.";
			// setTimeout(document.getElementById("optOne").style.display = "none", 3000);
			document.getElementById("optOne").style.display = "none";
			document.getElementById("optTwo").style.display = "none";
			document.getElementById("optFour").style.display = "none";
			// setTimeout(onSignUpStateChange(), 3000);

		}).catch(function (error) {
			// An error happened.
		});

	}).catch(function (error) {
		console.log("error")
		document.getElementById("signUpError").innerHTML = error.message;
	});
})

//-----------------------------------------SIGNUP------------------------------------------------------//

//----------------------------------------USER INFOS--------------------------------------------------//
const updateUser = document.querySelector('#updateUser');

updateUser.addEventListener('submit', (e) => {
	e.preventDefault();

	//get user infos
	const setDisplayName = updateUser['displayName'].value;
	var user = auth.currentUser;
	//Update User Name
	user.updateProfile({
		photoURL: imgURL,
		displayName: setDisplayName,
	}).then(function () {
		console.log("New display name updated");
		location.reload();
	}).catch(function (error) {
		console.log(error);
	})

});
//----------------------------------------USER INFOS--------------------------------------------------//

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
		document.getElementById("optTwo").style.display = "none";
		logInForm.reset();

	}).catch(function (error) {
		console.log("error")
		document.getElementById("loginError").innerHTML = error.message;
	});
});
//-----------------------------------------LOG IN------------------------------------------------------//

//-----------------------------------------LOG OUT------------------------------------------------------//
//Logout a user
const logOutForm = document.querySelector('#logOut');
logOutForm.addEventListener('submit', (e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		console.log('user logged out');
		document.getElementById("logOutConfirm").innerHTML = "User Logged Out.";
	});
});
//-----------------------------------------LOG OUT------------------------------------------------------//

//-----------------------------------------LOG OUT BEFORE------------------------------------------------------//
//Logout a user
const logOutFormTwo = document.querySelector('#directLogoutNotVerified');
logOutFormTwo.addEventListener('submit', (e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		console.log('user logged out');
	});
});
//-----------------------------------------LOG OUT BEFORE------------------------------------------------------//

//-----------------------------------------Conditional UI------------------------------------------------------//
const showWhenLoggedIn = document.querySelectorAll('.logged-in');
const showWhenLoggedOut = document.querySelectorAll('.logged-out');
// --------------Account Details----------
const accountDetails = document.querySelector('.accountDetails');
// --------------Account Details----------


const setupUi = (user) => {
	if (user) {
		//--------------Account Details----------
		const html = `<img class="profilePic" src="${user.photoURL}>"
		<br><p>Name: ${user.displayName}</p>
		<p>Email: ${user.email}</p>
		<p>Email Verification: ${user.emailVerified}</p>
		<p>User Id: ${user.uid}</p>
		<p>Account Created On: ${user.metadata.creationTime}</p><br>`;
		accountDetails.innerHTML = html;
		//--------------Account Details----------
		//toggle user element
		showWhenLoggedIn.forEach(item => item.style.display = 'block');
		showWhenLoggedOut.forEach(item => item.style.display = 'none');
	} else {
		//--------------Account Details----------
		accountDetails.innerHTML = "";
		//--------------Account Details----------
		showWhenLoggedIn.forEach(item => item.style.display = 'none');
		showWhenLoggedOut.forEach(item => item.style.display = 'block');
	};
};
//-----------------------------------------Conditional UI------------------------------------------------------//
//-----------------------------------------Delete Account------------------------------------------------------//
function deleteaccount() {
	var user = auth.currentUser;

	user.delete().then(function () {
		// User deleted.
		console.log('user Deleted');
	}).catch(function (error) {
		document.getElementById("deleteAccountError").innerHTML = "For Security Log Out and Log in again and then delete.";
		// An error happened.
	});
}

//-----------------------------------------Delete Account------------------------------------------------------//

// ------------------------------------Update Profile-------------------------------------------------
function updateProfileOne() {
	document.getElementById("updateEmail").style.display = "block";
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function updateProfileTwo() {
	document.getElementById("updatePassword").style.display = "block";
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function updateProfileThree() {
	document.getElementById("dpChangeBlock").style.display = "block";
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function updateProfileFour() {
	document.getElementById("updatedisplayName").style.display = "block";
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}


//Update Email//
const updateEmail = document.querySelector('#updateEmail');

updateEmail.addEventListener('submit', (e) => {
	e.preventDefault();

	//get user infos
	const newEmail = document.getElementById("newEmail").value;
	var user = auth.currentUser;
	user.updateEmail(newEmail).then(function () {
		// Update successful.
		document.getElementById("emailUpdateStat").innerHTML = "Email Update Successful.";
		setTimeout(function () {
			window.location.reload(1);
		}, 2000);
	}).catch(function (error) {
		// An error happened.
		document.getElementById("emailUpdateStat").innerHTML = "Operation blocked, Logout and Login again and then try it again.";
	});

});

//Update Password//
const updatePassword = document.querySelector('#updatePassword');

updatePassword.addEventListener('submit', (e) => {
	e.preventDefault();

	//get user infos
	const newPass = document.getElementById("newPassword").value;
	var user = auth.currentUser;
	user.updatePassword(newPass).then(function () {
		// Update successful.
		document.getElementById("passUpdateStat").innerHTML = "Password Update Successful.";
		setTimeout(function () {
			window.location.reload(1);
		}, 2000);
	}).catch(function (error) {
		// An error happened.
		document.getElementById("passUpdateStat").innerHTML = "Operation blocked, Logout and Login again and then try it again.";
	});

});

//Update Profile Picture//
const updateProfilePicture = document.querySelector('#updateProfilePicture');

updateProfilePicture.addEventListener('submit', (e) => {
	e.preventDefault();

	//get user infos
	const newProfilePicture = imgURL;
	var user = auth.currentUser;
	user.updateProfile({
		photoURL: newProfilePicture,
	}).then(function () {
		console.log("Dp changed")
		setTimeout(function () {
			window.location.reload(1);
		}, 2000);
		// Update successful.
	}).catch(function (error) {
		// An error happened.
		console.log("dp didn't upload")
	});

});

//Update display Name//
const updatedisplayName = document.querySelector('#updatedisplayName');

updatedisplayName.addEventListener('submit', (e) => {
	e.preventDefault();

	//get user infos
	const newupdatedisplayName = document.getElementById("updatedisplayNameName").value;
	var user = auth.currentUser;
	user.updateProfile({
		displayName: newupdatedisplayName,
	}).then(function () {
		document.getElementById("nameUpdateStat").innerHTML = "Display Name Update Successful.";
		setTimeout(function () {
			window.location.reload(1);
		}, 2000);
		// Update successful.
	}).catch(function (error) {
		document.getElementById("nameUpdateStat").innerHTML = "Error";
		// An error happened.
	});
});
// ------------------------------------Update Profile-------------------------------------------------
// ------------------------------------Manual Verification-------------------------------------------------
const forgotPassword = document.querySelector('#sendVerificationEmail');
forgotPassword.addEventListener('submit', (e) => {
	e.preventDefault();

	//get user infos
	const forgotPasswordEmail = document.getElementById("passwordEmail").value;


	//send pass verfication mail
	auth.sendPasswordResetEmail(forgotPasswordEmail).then(function () {
		console.log('Email for pass resest is sent');
		document.getElementById("paswordEmailVerificationStat").innerHTML = "Verification Email Sent";
	}).catch(function (error) {
		console.log(error);
		document.getElementById("paswordEmailVerificationStat").innerHTML = error;
	});
});
// ------------------------------------Manual Verification-------------------------------------------------
function openEmailVerificationform() {
	document.getElementById("optThree").style.display = "none";
	document.getElementById("sendVerificationEmail").style.display = "block";
}

function openSignUpformFromPassRes() {
	document.getElementById("sendVerificationEmail").style.display = "none";
	document.getElementById("optOne").style.display = "block";
}

function manuallyverifyaccount() {
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function () {
		document.getElementById("manualVerificationEmailStat").innerHTML = "Verification Email Sent.";
		// Email sent.
	}).catch(function (error) {
		// An error happened.
		document.getElementById("manualVerificationEmailStat").innerHTML = "Something went wrong.";
	});
}
//_______________________________________________________________________________________________________//amit

//-----------------------------------image Upload-----------------------------------//
function upload() {
	//get your select image
	var image = document.getElementById("image").files[0];
	//now get your image name
	var imageName = image.name;
	//firebase  storage reference
	//it is the path where yyour image will store
	var storage = firebase.storage();
	var storageRef = storage.ref('Profile Picture/' + imageName);
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
			document.getElementById("pBar").style.display = "none";
		});
	});
}
//-----------------------------------image Upload 2-----------------------------------//
function upload2() {
	//get your select image
	var image = document.getElementById("image2").files[0];
	//now get your image name
	var imageName = image.name;
	//firebase  storage reference
	//it is the path where yyour image will store
	var storage = firebase.storage();
	var storageRef = storage.ref('Profile Picture/' + imageName);
	//upload image to selected storage reference

	var uploadTask = storageRef.put(image);

	uploadTask.on('state_changed', function (snapshot) {
		//observe state change events such as progress , pause ,resume
		//get task progress by including the number of bytes uploaded and total
		//number of bytes
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log("upload is " + progress + " done");
		document.getElementById('pBar2').value = progress;

	}, function (error) {
		//handle error here
		console.log(error.message);
	}, function () {
		//handle successful uploads on complete

		uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
			//get your upload image url here...
			console.log(downlaodURL);
			imgURL = downlaodURL;
			document.getElementById("pBar2").style.display = "none";
		});
	});
}
//--------------------------------------------Password Validation AMit----------------------------------------//
//---------------------------global variable------------------------
var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
//--------------------------------------------Password Validation AMit----------------------------------------//
function passwordValidation() {
    var confirmPassword = document.getElementById("confirmPassword");
    var signUpPass = document.getElementById("signUpPass");
    var signUpValidationError = document.getElementById("signUpValidationError"); //for match

    var signUpCriteriaError = document.getElementById("signUpCriteriaError"); // criteria

    if (signUpPass.value.match(decimal)) {
        signUpCriteriaError.innerHTML = "Password criteria Matched!";

        if (signUpPass.value.match(decimal) == true && confirmPassword.value == signUpPass.value && confirmPassword.value != 0 && signUpPass.value != 0) {
            signUpValidationError.innerHTML = "Password Verified!";
        } else if (signUpPass.value.match(decimal) == true && confirmPassword.value.length >= 6) {
            signUpValidationError.innerHTML = "Password Not Verified!";
        }
    } else if (signUpPass.value.length >= 6) {
        signUpCriteriaError.innerHTML = "Password criteria not Matched!";
    } else {
        signUpCriteriaError.innerHTML = "";
        signUpValidationError.innerHTML = "";
    }
}

function passwordValidation2() {
    var confirmPassword = document.getElementById("confirmPassword");
    var signUpPass = document.getElementById("signUpPass");
    var signUpValidationError = document.getElementById("signUpValidationError");

    if (confirmPassword.value == signUpPass.value && confirmPassword.value != 0 && signUpPass.value != 0) {
        signUpValidationError.innerHTML = "Password Verified!";
    } else if (confirmPassword.value.length >= 6) {
        signUpValidationError.innerHTML = "Password Not Verified!";
    } else {
        signUpValidationError.innerHTML = "";
    }
}

function displaySignUp() {
    var confirmPassword = document.getElementById("confirmPassword");
    var signUpPass = document.getElementById("signUpPass");
    var checkBox = document.getElementById("checkBox");
    var checkBoxText = document.getElementById("checkBoxText");
    var buttonSignUp = document.createElement("button");
    buttonSignUp.textContent = "Sign Up";
    var div = document.getElementById("appendSubmitButton");


    if (checkBox.checked == true && confirmPassword.value == signUpPass.value && confirmPassword.value != 0 && signUpPass.value != 0 && signUpPass.value.match(decimal)) {
        div.appendChild(buttonSignUp);
        checkBox.style.display = "none";
        checkBoxText.style.display = "none";
        signUpPass.style.display = "none";
        confirmPassword.style.display = "none";
        document.getElementById("signUpEmail").style.display = "none";
        document.getElementById("criteriaPasword").style.display = "none";
    }
}
//________________________________________________________________________________________________________//

function openOne() {
	var x = document.getElementById("showAllChats");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function openTwo() {
	var x = document.getElementById("showAllChatsTwo");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function countB() {
	setTimeout(function count() {
		var c = document.getElementById("showAllChats").childElementCount;
		document.getElementById("count").innerHTML = "You have created " + c + " Reviews!";
	}, 3000);
	setTimeout(function counttTwo() {
		var d = document.getElementById("showAllChatsTwo").childElementCount;
		document.getElementById("countTwo").innerHTML = "You have created " + d + " Recipies!";
	}, 3000);
};

function openLoginFormHere() {
	document.getElementById("optThree").style.display = "block";
	document.getElementById("optOne").style.display = "none";
}