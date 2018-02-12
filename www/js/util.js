// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function convertToInt(str) {
	return parseInt(str);
}

var timeElapsed = 0, timerFunc;
var DEFAULT_HIGH_SCORES = [75, 100, 150, 200, 275];
function startTimer(duration, timerDiv, timeToBeatDiv) {
    var start = Date.now();
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        // diff = duration - (((Date.now() - start) / 1000) | 0);
		timeElapsed = duration + (((Date.now() - start) / 1000) | 0);
		if (timeElapsed >= MAX_DURATION) {
			clearInterval(timerFunc);
			timerDiv.textContent = 'TIME UP!!!!';
			$(document).trigger({
				type    : "TimeUpEvent"
			});
		}
		else {
			// console.log('diff ::' + timeElapsed);
			timerDiv.textContent = "" + timeElapsed + " of " + MAX_DURATION + " secs";
			timeToBeatDiv.textContent = "Time to beat: " + highScore[highScore.length - 1];
		}
    };
    // we don't want to wait a full second before the timer starts
    timer();
	console.log('Timer called.');
    timerFunc = setInterval(timer, 1000);
}

function storeInStorage(key, value) {
	var storage = window.localStorage;
	storage.setItem(key, value);
}
function getFromStorage(key, defaultValue) {
	var storage = window.localStorage;
	return storage.getItem(key) || defaultValue;
}
function storeObjectInStorage(key, value) {
	var storage = window.localStorage;
	storage.setItem(key, JSON.stringify(value));
}
function getObjectFromStorage(key) {
	var storage = window.localStorage;
	return JSON.parse(storage.getItem(key)) || DEFAULT_HIGH_SCORES;
}
