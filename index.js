// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyABeE_WQIhvoaWc5eLvBbhuz6-jdChl6no',
    authDomain: 'data-fcbb2.firebaseapp.com',
    projectId: 'data-fcbb2'
  });
var db = firebase.firestore();
const auth = firebase.auth();
auth.onAuthStateChanged(user => {
	if (user) {
		console.log('user logged in', user);
	} else {
		console.log('user fucking logged out');
	}
});


function save(){
    var first = document.getElementById("first-data");
    var last = document.getElementById("last-data");
    var born = document.getElementById("born-data");
    
//add data to the "users" collection   
    db.collection("users").add({
        first: first.value,
        last: last.value,
        born: born.value
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

//reset the value on input
    first.value = "";
    last.value = "";
    born.value = "";
}

function load(){
    var result = document.getElementById("result");
    result.innerHTML = "";
    db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());//for console view

            var getDataObject = doc.data();
            var a =[];

            a[doc.id]={
                First:getDataObject.first,
                Last:getDataObject.last,
                Born:getDataObject.born,
            };

            result.innerHTML += a[doc.id].First+a[doc.id].Last+a[doc.id].Born+"<br><br>";
        });
    });
}
