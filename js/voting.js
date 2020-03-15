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

        //<!-- THIS ALGORITHM IS CREATED BY MR. TITAS MALLICK -->


        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();


var T = localStorage.getItem("VOTING STAT");
const what = localStorage.setItem("source", document.referrer);
const wtf = localStorage.getItem("source");
var dhsffjhsdjfhjsdfh = localStorage.getItem("sumValue");
if (dhsffjhsdjfhjsdfh == 0 || dhsffjhsdjfhjsdfh == null){
    document.getElementById("livestatVoting").style.display = "none";
}else{
    document.getElementById("livestatVoting").style.display = "block";
}
//---------------------------------------GET FIRESTORE DATA ON AUTH--------------------------------------------------------//
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("livestat").style.display = "block";
        document.getElementById("logoutFormShow").style.display = "block";
        document.getElementById("logInFormClose").style.display = "none";
        var accountDetails = document.getElementById("accountDetails");
        accountDetails.innerHTML = "logged in with " + user.email;
        //----------GET ON OFF STATUS---------------------------
 

        var docRef = db.collection("STARTVOTE").doc("3nzMTelZNNsuQ77UjM4R");

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data().STATE);
                if (doc.data().STATE == "ON"){
                        console.log("r a leoraaa kaj koreche");
                        document.getElementById("showIncaseOnlyVoteStatIsReady").style.display = "block";
                }
                else if (doc.data().STATE == "OFF"){
                    document.getElementById("showIncaseOnlyVoteStatIsReady").style.display = "none";
                    document.getElementById("fhsdjhfkdkfdkj").innerHTML = "The Voting Is Over Now!";
                }
                else if (doc.data().STATE == "WAIT"){
                    document.getElementById("showIncaseOnlyVoteStatIsReady").style.display = "none";
                    document.getElementById("fhsdjhfkdkfdkj").innerHTML = "The Voting hasn't Started Yet!";
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        //-----------------confirming voting code----------------
        const confirmVotingCode = document.querySelector('#enterVotingCode');
        confirmVotingCode.addEventListener('submit', (e) => {
            e.preventDefault();
            db.collection("VotingStat").doc(user.uid).set({
                    source: wtf,
                    status: "Opted for Voting",
                    votingCode: confirmVotingCode.code.value,
                }, {
                    merge: true
                })
                .then(function() {
                    console.log("VOTING CODE SAVED");
                    localStorage.removeItem("source");
                    location.reload();
                })
                .catch(function(error) {
                    console.error("VOTING CODE NOT SAVED ", error);
                });

        });
        //------------------confirm voting code----------------------
        var user = firebase.auth().currentUser;
        db.collection("VotingStat").doc(user.uid).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                console.log("IT WILL CHANGE YOUR LIFE", doc.data().status);
                if (doc.data().status == "USER HAS VOTED") {
                    console.log("OHHHHH MY GODDDDD!");
                    document.getElementById("showvoting").style.display = "none";
                    document.getElementById("enterVotingCode").style.display = "none";
                    document.getElementById("pollingstatus").innerHTML = "You have voted successfully!";
                } else {
                    document.getElementById("enterVotingCode").style.display = "none";
                    document.getElementById("pollingstatus").innerHTML = "";
                }
            } else {
                document.getElementById("enterVotingCode").style.display = "block";
                document.getElementById("showvoting").style.display = "none";
                document.getElementById("pollingstatus").innerHTML = "";
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        db.collection('VOTING').onSnapshot(snapshot => {
            console.log(snapshot.size, "<-----NO of Total Candidates");
            let changes = snapshot.docChanges();
            console.log(changes);
            changes.forEach(change => {
                if (change.type == 'added') {
                    showvotes(change.doc);
                    calculatestat(change.doc);
                }
            })
        });
        if (T != null) {
            console.log("USER HAS ALREADY VOTED");
            db.collection("VotingStat").doc(user.uid).set({
                    uid: firebase.auth().currentUser.uid,
                    status: "USER HAS VOTED",
                }, {
                    merge: true
                })
                .then(function() {
                    console.log("VOTING STAT UPDATED YES");
                })
                .catch(function(error) {
                    console.error("VOTING STAT UPDATE YES ERROR ", error);
                });

        } else {
            console.log("USER HAS NOT VOTED YET");
        }
        //IF EMAIL VERIFIED DO SOMETHING
        if (user.emailVerified) {
            document.getElementById("showemailVerifictaiuonStatus").innerHTML = "Your email is Verified :)";
            document.getElementById("showToVerifiedUsersOnly").style.display = "block";
            console.log("Linkin Park", "USER IS EMAIL VERIFIED");
        }else{
           console.log('user logged in', user, "USER IS NOT EMAIL VERIFIED"); 
           document.getElementById("showToVerifiedUsersOnly").style.display = "none";
           document.getElementById("showemailVerifictaiuonStatus").innerHTML = "Your email is not Verified. First Complete email Verification. Visit Account Page for Other Details.";
        }
        

    } else {
        document.getElementById("livestat").style.display = "none";
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



//----------------------DONE BY AMit----------------------------------------
var finalVote; 
var totalSum = 0 ;
var result = document.getElementById("result");
const  calculatestat = (doc) => {

    
        // console.log(doc.id, " => ", doc.data());//for console view

        var getDataObject = doc.data();
        var a =[];

        a[doc.id]={
            Name:getDataObject.Name,
            Votes:getDataObject.Votes
        };
        result.innerHTML +=a[doc.id].Votes+" ";
   
}

document.addEventListener('readystatechange', event => {

	if (event.target.readyState === "interactive") {
		console.log("loading...");
	}

	if (event.target.readyState === "complete") {
        console.log("loaded!");
    setTimeout(function(){ 
    var result2 = document.getElementById("result");    
    var arrayVoting = [];
    arrayVoting = String(result2.innerHTML).split(" ");
    arrayVoting.pop();
    for(var j = 0; j < arrayVoting.length; j++){
        totalSum += parseInt(arrayVoting[j]);
    }
    finalVote = totalSum;
    localStorage.setItem("sumValue",finalVote);
    }, 3000);
            // setTimeout(totalVoteSum(), 2000);   
        }
    });
//---------------------------------------------------------------------------

console.log(localStorage.getItem("sumValue"),"<<<<<<<<<"); 

//--------------------VOTING ALGORITHM--------------------------------------

var reqs_id = 0;
const showvotesrender = document.querySelector('#showvoting');
const showvotesstat = document.querySelector('#livestat');
const showvotes = (doc) => {

    let li = document.createElement('div');
    let name = document.createElement('h2');
    let votes = document.createElement('h4');
    let votesTXT = document.createElement('h3');

    reqs_id++;
    li.setAttribute("class" , "eachcanddata");
    votes.setAttribute("id", "votemaster" + doc.id);
    votesTXT.setAttribute("onclick" , "titasEktiNodirNam(this)");
    votesTXT.setAttribute("id", "votemasterBot" + reqs_id);
    li.setAttribute('id', doc.id)
    name.textContent =  doc.data().Name;
    votesTXT.textContent = "VOTE";
    votes.textContent = doc.data().Votes;

    li.appendChild(name);
    li.appendChild(votes);
    li.appendChild(votesTXT);
    // li.appendChild(email);


    var getValuefromSessionstorage = localStorage.getItem("sumValue");
    console.log((Number(doc.data().Votes)/getValuefromSessionstorage)*100, "Maths me bahut kamjor hai hum");
    let stat = document.createElement('div');
    stat.textContent =  doc.data().Name + " (" + doc.data().Votes + ")";
    stat.style.width = (Number(doc.data().Votes)/getValuefromSessionstorage)*100 +"%";
    // var randomColor = Math.floor(Math.random()*16777215).toString(16);
    // stat.style.background = "#"+randomColor;
    var randomColor = Math.floor((Math.random()*350)+1).toString(10);
    //stat.style.background = "hsl(40,100%,50%)";
    //stat.style.background = "hsl("+randomColor+",100%,50%)";
    //stat.style.background = "hsl("+randomColor+","+randomColor+"%,50%)";
    stat.style.background = "hsl("+randomColor+",100%,85%)";
    


    showvotesrender.appendChild(li);
    showvotesstat.appendChild(stat);
};

function titasEktiNodirNam(t){
    var mallick = t.parentNode.id;
    var nayaid = "votemaster"+mallick;
    var sukanya = document.getElementById(nayaid);
    var saha = sukanya.innerHTML;
    console.log(saha++, "aha ki anondo akashe batase");
    db.collection("VOTING").doc(mallick).set({
                Votes: saha++,
            }, {
                merge: true
            })
            .then(function() {
                console.log("Document successfully written!");
                location.reload();
                localStorage.setItem("VOTING STAT", "VOTED");
            })
            .catch(function(error) {
                document.getElementById("voteError").innerHTML = "You didn't visited from facebook";
                console.error("Error writing document: ", error);
            });
};



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

localStorage.removeItem("VOTING STAT");
localStorage.removeItem("source");



