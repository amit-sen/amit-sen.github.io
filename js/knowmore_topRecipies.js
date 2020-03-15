// function newLoad() {
// 	var one = document.getElementById("knowmore1");
// 	var two = document.getElementById("knowmore2");
// 	var three = document.getElementById("knowmore3");
// 	var four = document.getElementById("knowmore4");
// 	var five = document.getElementById("knowmore5");
// 	var six = document.getElementById("knowmore6");
// 	var seven = document.getElementById("knowmore7");
// 	var eight = document.getElementById("knowmore8");
// 	one.onclick = function () {
// 		var x = document.getElementById("knowmore1").parentNode.id;
// 		console.log(x);

// 		sessionStorage.setItem("TestData", x);
// 		window.location = "Recipies.html";
// 	}
// 	two.onclick = function () {
// 		var x = document.getElementById("knowmore2").parentNode.id;
// 		console.log(x);

// 		sessionStorage.setItem("TestData", x);
// 		window.location = "Recipies.html";
// 	}
// 	three.onclick = function () {
// 		var x = document.getElementById("knowmore3").parentNode.id;
// 		console.log(x);

// 		sessionStorage.setItem("TestData", x);
// 		window.location = "Recipies.html";
// 	}
// 	four.onclick = function () {
// 		var x = document.getElementById("knowmore4").parentNode.id;
// 		console.log(x);

// 		sessionStorage.setItem("TestData", x);
// 		window.location = "Recipies.html";
// 	}
// 	five.onclick = function () {
// 		var x = document.getElementById("knowmore5").parentNode.id;
// 		console.log(x);

// 		sessionStorage.setItem("TestData", x);
// 		window.location = "Reviews.html";
// 	}
// 	six.onclick = function () {
// 		var x = document.getElementById("knowmore6").parentNode.id;
// 		console.log(x);

// 		sessionStorage.setItem("TestData", x);
// 		window.location = "Reviews.html";
// 	}
// 	seven.onclick = function () {
// 		var x = document.getElementById("knowmore7").parentNode.id;
// 		console.log(x);

// 		sessionStorage.setItem("TestData", x);
// 		window.location = "Reviews.html";
// 	}
// 	eight.onclick = function () {
// 		var x = document.getElementById("knowmore8").parentNode.id;
// 		console.log(x);

// 		sessionStorage.setItem("TestData", x);
// 		window.location = "Reviews.html";
// 	}

// }

document.addEventListener('readystatechange', event => {

	if (event.target.readyState === "interactive") {
		console.log("loading...");


	}

	if (event.target.readyState === "complete") {
		console.log("loaded!");
		// setTimeout(newLoad(), 3000);
		setTimeout(function(){ var one = document.getElementById("knowmore1");
	var two = document.getElementById("knowmore2");
	var three = document.getElementById("knowmore3");
	var four = document.getElementById("knowmore4");
	var five = document.getElementById("knowmore5");
	var six = document.getElementById("knowmore6");
	var seven = document.getElementById("knowmore7");
	var eight = document.getElementById("knowmore8");
	one.onclick = function () {
		var x = document.getElementById("knowmore1").parentNode.id;
		console.log(x);

		sessionStorage.setItem("TestData", x);
		window.location = "Recipies.html";
	}
	two.onclick = function () {
		var x = document.getElementById("knowmore2").parentNode.id;
		console.log(x);

		sessionStorage.setItem("TestData", x);
		window.location = "Recipies.html";
	}
	three.onclick = function () {
		var x = document.getElementById("knowmore3").parentNode.id;
		console.log(x);

		sessionStorage.setItem("TestData", x);
		window.location = "Recipies.html";
	}
	four.onclick = function () {
		var x = document.getElementById("knowmore4").parentNode.id;
		console.log(x);

		sessionStorage.setItem("TestData", x);
		window.location = "Recipies.html";
	}
	five.onclick = function () {
		var x = document.getElementById("knowmore5").parentNode.id;
		console.log(x);

		sessionStorage.setItem("TestData", x);
		window.location = "Reviews.html";
	}
	six.onclick = function () {
		var x = document.getElementById("knowmore6").parentNode.id;
		console.log(x);

		sessionStorage.setItem("TestData", x);
		window.location = "Reviews.html";
	}
	seven.onclick = function () {
		var x = document.getElementById("knowmore7").parentNode.id;
		console.log(x);

		sessionStorage.setItem("TestData", x);
		window.location = "Reviews.html";
	}
	eight.onclick = function () {
		var x = document.getElementById("knowmore8").parentNode.id;
		console.log(x);

		sessionStorage.setItem("TestData", x);
		window.location = "Reviews.html";
	}
 }, 3000);
	}
});