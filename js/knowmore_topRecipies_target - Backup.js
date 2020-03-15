document.addEventListener('readystatechange', event => {

	if (event.target.readyState === "interactive") { //same as:  ..addEventListener("DOMContentLoaded".. and   jQuery.ready
		// alert("All HTML DOM elements are accessible");
		console.log("loading...");
		// var printKoro = document.getElementById("balerP");
		// printKoro.innerHTML = "loading...";
	}

	if (event.target.readyState === "complete") {
		// alert("Now external resources are loaded too, like css,src etc... ");
		// var printKoro = document.getElementById("balerP");
		var getData = sessionStorage.getItem("TestData");
		// // printKoro.innerHTML = getData;
		window.location.href = "#" + getData;
		sessionStorage.removeItem("TestData");
		console.log("loaded");
	}
});