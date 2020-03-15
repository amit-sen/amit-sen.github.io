const auth = firebase.auth();
var loginTime;
var date;
// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    auth.createUserWithEmailAndPassword(email, password); //>>>>main function for signup
});

//login
var userLoginStat = "false";
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        userLoginStat = "true";
    }); //>>>>main function for Login
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    // e.preventDefault();
    window.location.reload();

    var reference = sessionStorage.getItem("ref")+"/"+sessionStorage.getItem("key")+"/";

    const database = firebase.database();
    const ref = database.ref(reference);

    var rawDateArray = String(new Date()).split(" ");
    var logoutTime = rawDateArray[4];
    ref.set({
        Date:date,
        Login:loginTime,
        Logout: logoutTime
    });
    auth.signOut().then(() => {
        console.log('user signed out');
    })
});



//after logedin
auth.onAuthStateChanged(user => {
    if (user) {
       
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("login-form").style.display = "none";
        document.getElementById("logout").style.display = "block";
        var table = document.getElementById("attendancTable");
        table.style.display = "block";

        const database = firebase.database(); //database function
        const ref = database.ref("userData/" + user.uid); // reference variable
        sessionStorage.setItem("ref","userData/" + user.uid);

            var rawDateArray = String(new Date()).split(" ");
            date = rawDateArray[2] + " " + rawDateArray[1] + " " + rawDateArray[3];
            loginTime = rawDateArray[4];
            console.log(userLoginStat,"<------First time signin");
            if(userLoginStat=="true"){
                ref.push({
                    Date: date,
                    Login: loginTime,
                    Logout:""
                });
            }
    
        var a = [];
        ref.on('value', gotData, errData);
        function gotData(data) {

            var rawData = data.val(); //"rawData" is an array of values
            var keys = Object.keys(rawData); //"keys" is an array of Id for individual data
            sessionStorage.setItem("key",keys[keys.length-1]);
            for (let i = 0; i < keys.length; i++) {
                a[i] = {
                    Date: rawData[keys[i]].Date,
                    LoginTime: rawData[keys[i]].Login,
                    LogoutTime: rawData[keys[i]].Logout
                };// a is an array but also an object so u can get value by using 'a[index].Date' or 'a[index].LoginTime'
            }
        
            for(let k = 0; k < a.length; k++){
                
                var tr = document.createElement("tr");
                var tdDate = document.createElement("td");
                var tdLoginTime = document.createElement("td");
                var tdLogoutTime = document.createElement("td");

                tdDate.innerHTML = a[k].Date;

                tdLoginTime.innerHTML = a[k].LoginTime;
    
                tdLogoutTime.innerHTML = a[k].LogoutTime;

                tr.appendChild(tdDate);
                tr.appendChild(tdLoginTime);
                tr.appendChild(tdLogoutTime);

                table.appendChild(tr);
            } 
        }
        function errData(err) {
            console.log(err);
        }
    } else {
        console.log("no user sign in");
    }
});
