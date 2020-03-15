        //TITAS's API   
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
        const auth = firebase.auth();
        const db = firebase.firestore();
//---------------------------------------GET FIRESTORE DATA ON AUTH--------------------------------------------------------//
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("logoutFormShow").style.display = "block";
        document.getElementById("logInFormClose").style.display = "none";
        var accountDetails = document.getElementById("accountDetails");
        accountDetails.innerHTML = "logged in with " + user.email;
        //IF EMAIL VERIFIED DO SOMETHING
        if (user.emailVerified) {


            db.collection("VOTINGREGISTER").doc(user.uid).get().then(function(doc) {
                if (doc.exists) {
                    document.getElementById("registrationstatusssss").innerHTML = "Thanks For Registering!";
                    document.getElementById("registerforvote").style.display = "none";
                    console.log("Document data:", doc.data());
                    document.getElementById("yourstttttatttusssss").innerHTML = "Your Registration is " +  doc.data().Status;
                    if(doc.data().Status == "Under Review"){
                        document.getElementById("yourstttttatttusssss").style.background = "#a51ee9";
                    }
                    else if(doc.data().Status == "Accepted"){
                        document.getElementById("yourstttttatttusssss").style.background = "#1ee9a5";
                    }
                    else if(doc.data().Status == "Declined"){
                        document.getElementById("yourstttttatttusssss").style.background = "#e91e62";
                    }
                } else {
                    document.getElementById("registerforvote").style.display = "block";
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });





            //_______FRESTORE OPT______
            const resiterForm =  document.querySelector("#registerforvote");
                
                resiterForm.addEventListener('submit', (e) => {
                    var user = firebase.auth().currentUser;
                    let name = document.getElementById("registererName").value;
                    e.preventDefault();
                    db.collection("VOTINGREGISTER").doc(user.uid).set({
                        Name: name,
                        Votes: 0,
                        Email: user.email,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        UserId: user.uid,
                        Status : "Under Review",
                    }, {
                        merge: true
                    })
                    .then(function() {
                        console.log("DATA SAVED");
                        location.reload();
                    })
                    .catch(function(error) {
                        console.error("DATA NOT SAVED ", error);
                    });
                })

            document.getElementById("showemailVerifictaiuonStatus").innerHTML = "Your email is Verified :)";
            document.getElementById("showToVerifiedUsersOnly").style.display = "block";
            console.log("Linkin Park", "USER IS EMAIL VERIFIED");
        } else{
           console.log('user logged in', user, "USER IS NOT EMAIL VERIFIED"); 
           document.getElementById("showToVerifiedUsersOnly").style.display = "none";
           document.getElementById("showemailVerifictaiuonStatus").innerHTML = "Your email is not Verified. First Complete email Verification. Visit Account Page for Other Details.";
        }
        

    } else {
        var accountDetails = document.getElementById("accountDetails");
        accountDetails.innerHTML = "you are not logged in";
        document.getElementById("logoutFormShow").style.display = "none";
        document.getElementById("logInFormClose").style.display = "block";
        console.log('user logged out');
        document.getElementById("showToVerifiedUsersOnly").style.display = "none";
        document.getElementById("showemailVerifictaiuonStatus").innerHTML = "You must login with your Account";
    }
});

//---------------------------------------SIGNUP--------------------------------------------------------//
//sign Up new Users
const error = document.querySelector('.error');
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
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
            // Email sent.
            console.log("email verification sent")
        }).catch(function(error) {
            // An error happened.
        });
        // signUpForm.document.querySelector('.error').innerHTML = "";
        error.innerHTML = '';
    }).catch(err => {
        console.log(err.message)
        // signUpForm.document.querySelector('.error').innerHTML = err.message;
        error.innerHTML = err.message + " " + err.code;
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
        
        document.getElementById("accountSection").style.display = "none";
    });
});




//--------------------VOTING ALGORITHM--------------------------------------



document.addEventListener('readystatechange', event => {

    if (event.target.readyState === "interactive") {
        console.log("loading...");


    }

    if (event.target.readyState === "complete") {
        console.log("loaded!");
    }
});


function openAccset() {
  var x = document.getElementById("accountSection");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function opensignUpForm() {
    document.getElementById("signUpFormOpen").style.display = "block";
    document.getElementById("logInFormClose").style.display = "none";
  
}
function openlogInForm() {
    document.getElementById("signUpFormOpen").style.display = "none";
    document.getElementById("logInFormClose").style.display = "block";
  
}