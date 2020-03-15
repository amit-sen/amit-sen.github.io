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