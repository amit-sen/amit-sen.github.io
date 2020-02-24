//---------------------------------------GET FIRESTORE DATA ON AUTH--------------------------------------------------------//
auth.onAuthStateChanged(user => {
	if (user) {
		console.log('user logged in', user);
		db.collection('USER').onSnapshot(snapshot => {
			//calling the function for HTML Section
	showuser(snapshot.docs);
	//Calling the function for UI toggle section
	setupUi(user);
	});

	} else {
		console.log('user logged out');
		showuser([]);
		setupUi();
	}
});

//---------------------------------------Conditional UI--------------------------------------------------------//
const showWhenLoggedIn = document.querySelectorAll('.logged-in');
const showWhenLoggedOut = document.querySelectorAll('.logged-out');
const accountDetails = document.querySelector('.accountDetails');

const setupUi = (user) => {
	if (user){
		//account details
		const html = `<div>Logged in as ${user.email}</div>`;
		accountDetails.innerHTML = html;
		//toggle user element
		showWhenLoggedIn.forEach(item => item.style.display = 'block');
		showWhenLoggedOut.forEach(item => item.style.display = 'none');
	} else {
		//hide account details
		accountDetails.innerHTML = '';
		showWhenLoggedIn.forEach(item => item.style.display = 'none');
		showWhenLoggedOut.forEach(item => item.style.display = 'block');
	};
};






//---------------------------------------Firestore--------------------------------------------------------//
// db.collection('USER').get().then(snapshot => {
// 	showuser(snapshot.docs);
// });

const userlist = document.querySelector('.USER');

// db.collection('Biodata').get().then(snapshot => {
// 	showbio(snapshot.docs);
// });

// const biodata = document.querySelector('.bio');



//---------------------------------------Create HTML--------------------------------------------------------//

const showuser = (data) => {
	if (data.length){
	let html = '';
	data.forEach(doc => {
		const usereachdata = doc.data();
		const li = `
		<li>
		<div class="head">${usereachdata.Name}</div>
		<div class="body">${usereachdata.Email}</div>
		</li>
		`;
		html += li
	});
	 userlist.innerHTML = html;
	} else {
		userlist.innerHTML = '<h3>You nasty Mothefucker login First</h3>';
		
	}
};


const showbio = (data) => {
	let html = '';
	data.forEach(doc => {
		const userbio = doc.data();
		const li = `
		<li>
		<div class="head">${userbio.Nickname}</div>
		<div class="body">${userbio.Bio}</div>
		</li>
		`;
		html += li
	});
	 biodata.innerHTML = html;
};


//---------------------------------------SAVE DATA--------------------------------------------------------//
const createData = document.querySelector('#addData');
createData.addEventListener('submit', (e) => {
	e.preventDefault();

	db.collection('USER').add({
		Name: createData['createName'].value,
		Email: createData['createEmail'].value,
	}).then(() => {
		//form reset
		createData.reset();
	}).catch(err => {
		console.log('You nasty bitch! I have already protected my Database');
	})
});



//---------------------------------------Authentication Changes--------------------------------------------------------//
// auth.onAuthStateChanged(user => {
// 	if (user) {
// 		console.log('user logged in', user);
// 	} else {
// 		console.log('user fucking logged out');
// 	}
// });


//---------------------------------------SIGNUP--------------------------------------------------------//
//sign Up new Users
const signUpForm = document.querySelector('#signUp');
signUpForm.addEventListener('submit', (e) => {
	e.preventDefault();

	//user info
	const email = signUpForm['signUpEmail'].value;
	const pass = signUpForm['signUpPass'].value;

//signup the user
	auth.createUserWithEmailAndPassword(email, pass).then(cred => {
		console.log(cred);
		signUpForm.reset();
	});

});

//-----------------------------------------LOGOUT------------------------------------------------------//
//Logout a user
const logOutForm = document.querySelector('#logOut');
logOutForm.addEventListener('submit', (e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		console.log('user logged out');
	});
});

//-----------------------------------------LOGIN------------------------------------------------------//
//Login a User
const logInForm = document.querySelector('#loginForm');
logInForm.addEventListener('submit', (e) => {
	e.preventDefault();

	//get user infos
	const email = logInForm['logInEmail'].value;
	const pass = logInForm['logInPass'].value;

	//login user
	auth.signInWithEmailAndPassword(email, pass).then(cred => {
		console.log(cred.user);
		logInForm.reset();
	});
});