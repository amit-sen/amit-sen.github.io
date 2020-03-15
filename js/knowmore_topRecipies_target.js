// function loadToTarget() {
// 	var getData = sessionStorage.getItem("TestData");
// 	window.location.href = "#" + getData;
// 	sessionStorage.removeItem("TestData");
// 	console.log("Success!");
// }
document.addEventListener('readystatechange', event => {

	if (event.target.readyState === "interactive") {
		console.log("loading...");

	}

	if (event.target.readyState === "complete") {
		console.log("loaded");
		setTimeout(function(){var getData = sessionStorage.getItem("TestData");
	window.location.href = "#" + getData;
	sessionStorage.removeItem("TestData");
	console.log("Success!");}, 3000);
	}
});