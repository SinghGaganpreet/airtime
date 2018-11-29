var runningTimeofApp = Date.now();

// initialize the map on the "map" div with a given center and zoom
var map = new L.Map('map', {
	zoom: 13,
	minZoom: 13,
	//closePopupOnClick: false,
});

// create a new tile layer
var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//var tileUrl = 'Toulouse/map/{z}/{x}/{y}.png',

	layer = new L.TileLayer(tileUrl,
		{
			attribution: 'Maps © <a href=\"www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
			maxZoom: 14
		});

// add the layer to the map
map.addLayer(layer);


//------------------------------Variables-------------------------------//
//----------------------------------------------------------------------//

var toulouse = [[43.674278, 1.258794], [43.540312, 1.634932]];
var parisKievLL = [[48.8567, 2.3508], [50.45, 30.523333]];
var londonParisRomeBerlinBucarest = [[51.507222, -0.1275], [48.8567, 2.3508],
[41.9, 12.5], [52.516667, 13.383333], [44.4166, 26.1]];
var planeRotation = [[43.593074, 1.441183], [43.601651, 1.462555], [43.611347, 1.468906], [43.62191, 1.462727], [43.624831, 1.441698], [43.621041, 1.421356], [43.611036, 1.413031], [43.602335, 1.41715], [43.593074, 1.441183]];


var wayPointsForRed = [[43.598046, 1.431742], [43.605256, 1.429768], [43.613335, 1.419468], [43.602211, 1.421528], [43.593944, 1.411486], [43.598046, 1.399469], [43.60277, 1.412258], [43.610042, 1.413116], [43.601403, 1.399727], [43.607494, 1.401615]];
var wayPointsForGreen = [[43.61203, 1.452599], [43.614578, 1.439638], [43.622842, 1.428566], [43.624893, 1.451054], [43.626694, 1.43672], [43.629304, 1.429939], [43.629366, 1.427279], [43.633218, 1.445732], [43.626881, 1.416121], [43.628496, 1.464186]];
var wayPointsForBlue = [[43.59556, 1.465387], [43.605318, 1.450195], [43.60594, 1.449423], [43.609731, 1.465645], [43.602273, 1.482468], [43.608053, 1.457748], [43.60768, 1.438179], [43.614081, 1.476974], [43.610912, 1.488991], [43.588784, 1.47294]];

var areaList = [[[43.562606, 1.349258], [43.562481, 1.432514], [43.581013, 1.427364], [43.600035, 1.436634], [43.600035, 1.349258], [43.562606, 1.349258]],
[[43.600035, 1.436634], [43.61346, 1.40625], [43.634087, 1.401615], [43.634087, 1.349258], [43.600035, 1.349258]],	//
[[43.600035, 1.436634], [43.600035, 1.476288], [43.634087, 1.476288], [43.634087, 1.401615], [43.61346, 1.40625]], //
[[43.562481, 1.432514], [43.562481, 1.484528], [43.600035, 1.476288], [43.600035, 1.436634], [43.581013, 1.427364]], //
[[43.562481, 1.484528], [43.562481, 1.542892], [43.600035, 1.542892], [43.600035, 1.476288]], //
[[43.600035, 1.476288], [43.600035, 1.542892], [43.634087, 1.542892], [43.634087, 1.476288]]] //
var mapCenters = [[43.581281, 1.392946], [43.617061, 1.392946], [43.617061, 1.4389515], [43.581258, 1.455946], [43.581258, 1.50959], [43.617061, 1.50959]];

//43.57812933, 1.390714333
map.fitBounds(toulouse);
var audio = new Audio('longBeep.mp3');

var plane = L.icon({ iconUrl: 'planeB.png', iconSize: [40, 40], iconAnchor: [20, 20] });
var uavB = L.icon({ iconUrl: 'uavB.png', iconSize: [30, 30], iconAnchor: [15, 15] });
var uavG = L.icon({ iconUrl: 'uavG.png', iconSize: [30, 30], iconAnchor: [15, 15] });
var uavR = L.icon({ iconUrl: 'uavR.png', iconSize: [30, 30], iconAnchor: [15, 15] });
var panda = L.icon({ iconUrl: 'panda.png', iconSize: [50, 50], iconAnchor: [0, 0], popupAnchor: [25, 0] });

var markerPlane = L.Marker.movingMarker(planeRotation, [15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000], { icon: plane, autostart: true, loop: true, zIndexOffset: 10000 }).addTo(map);

//var markerPanda = L.Marker.movingMarker([[43.58064, 1.454058]], [], {icon: panda}).addTo(map);
var uavR = L.Marker.movingMarker([[43.592156, 1.458603 + 0.01]], [], { icon: uavR }).addTo(map);
var uavG = L.Marker.movingMarker([[43.592156, 1.458603 - 0.01]], [], { icon: uavG }).addTo(map);
var uavB = L.Marker.movingMarker([[43.592156, 1.458603]], [], { icon: uavB }).addTo(map);

var circleR = L.circle([43.62365, 1.385457], { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 1800 });
var circleG = L.circle([43.62365, 1.41951], { color: 'green', fillColor: '#09ff00', fillOpacity: 0.5, radius: 1800 });
var circleB = L.circle([43.599876, 1.385457], { color: 'blue', fillColor: '#006bff', fillOpacity: 0.5, radius: 1800 });

var uavRedStarted = false;
var uavGreenStarted = false;
var uavBlueStarted = false;

var keys = [];
var values = [];
var responseTime = [];
var popupArray = [];
var eventCounter = 0;
var performanceStartTime;


var eventCounterR = 0;
var eventCounterG = 0;
var eventCounterB = 0;
var totalQuestions = 0, totalAnswered = 0, wrongAnswered = 0, correctAnswered = 0;

//-----Lng difference from centre to right edge 0.022424
//-----Lat differece from centre to top edge −0,016587
var nextPositionOfPlane = 1;
var nextPopupTo = 1;
var nextLatLngForRed = [0, 0];
var nextLatLngForGreen = [0, 0];
var nextLatLngForGreen = [0, 0];
var redToEdge = true;
var greenToEdge = true;
var blueToEdge = true;
var uavSpeed = 30000;
var popupInterval = 20000;	// popup generation after every 20 seconds
var redTwise=1, greenTwise=1, blueTwise=1;	// These counters are used to make each UAV search 1 area twise, to make experiment run longer.
// var closeApp = 610000;


//--Variables for random triangle generator--//
var flatUIclrs = ['4F8704', '0793AF', '0726AF', '8407AF', 'F10BCB', 'F10B3C', 'F1E00B', '454442', 'C1F2EE', 'C1C5F2'];
var oddEvenArray = ['Odd', 'Even'];//, 'more than five', 'less than five', 'equal to six', 'less than 9'];
var triangleCounter = 0;
var colorToFind;
var firstTime = true;

var popupR = L.popup({ closeOnClick: false, autoClose: false }).setContent('I am done. Give another location.');
var popupG = L.popup({ closeOnClick: false, autoClose: false }).setContent('I am done. Give another location.');
var popupB = L.popup({ closeOnClick: false, autoClose: false }).setContent('I am done. Give another location.');

// var atcCommandVector = ["Speed", "Heading", "Altitude", "Vertical Speed"];
var questionsLimit = 45;
var easyLimit = 15;
var transitionEasyLimit = 22;
var transitionHardLimit = 30;
var hardLimit = 45;
var atcCommandIntervalL = 44500;
var atcCommandIntervalTL = 34500;
var atcCommandIntervalTH = 24500;
var atcCommandIntervalH = 24500;


var initiateChecklist = true;
var checkListStartTime;

// var atcCommandDifficultyToggle = false;
// var atcCommandDifficultyToggleTime = 300000;	// 60000 ms = 1 min
//----------------------------------------------------------------------//
//----------------------------------------------------------------------//


//----------------------------------------------------------------------//
//------------------------Helping Functions-----------------------------//
function getRandomBetweenRange(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}



//----------------------------------------------------------------------//
//--------------------------Main Functions------------------------------//

//-----Click event handler for Yes and No button of popups-----//
//['of odd number', 'of even number', 'more than five', 'less than five', 'equal to six', 'less than 9'];
function yesNoButtonClick(eventNumber, buttonClicked, questionValue) {
	totalAnswered++;
	var elapsedTime = Date.now() - performanceStartTime;

	var triangleCount = document.getElementById('triangle' + eventNumber).dataset.triangleCount;
	var calculatedOddEven = triangleCount % 2;
	var questionAndValueSame;

	if (calculatedOddEven != 0 && questionValue == oddEvenArray[0])
		questionAndValueSame = true;
	else if (calculatedOddEven == 0 && questionValue == oddEvenArray[1])
		questionAndValueSame = true;
	// else if (triangleCount>5 && questionValue==oddEvenArray[2])
	// 	questionAndValueSame = true;
	// else if (triangleCount<5 && questionValue==oddEvenArray[3])
	// 	questionAndValueSame = true;
	// else if (triangleCount==6 && questionValue==oddEvenArray[4])
	// 	questionAndValueSame = true;
	// else if (triangleCount<9 && questionValue==oddEvenArray[5])
	// 	questionAndValueSame = true;
	else
		questionAndValueSame = false;

	if (buttonClicked == 1 && questionAndValueSame) {
		keys.push(eventNumber);
		values.push(1);
		responseTime.push(+(elapsedTime/1000).toFixed(2));
		correctAnswered++;
	}
	else if (buttonClicked == 0 && !questionAndValueSame) {
		keys.push(eventNumber);
		values.push(1);
		responseTime.push(+(elapsedTime/1000).toFixed(2));
		correctAnswered++;
	}
	else {
		keys.push(eventNumber);
		values.push(0);
		responseTime.push(+(elapsedTime/1000).toFixed(2));
		wrongAnswered++;
		// alert("Wrong answer, value is: " + triangleCount);
	}
	map.removeLayer(popupArray[eventNumber]);
}

//-----Function to calculate angle between two lat long-----//
function angleBetweenCoordinates(latLngSource, latDestination, lngDestination) {
	var piBy180 = Math.PI / 180;
	var lat1 = latLngSource.lat * piBy180;
	var long1 = latLngSource.lng * piBy180;
	var lat2 = latDestination * piBy180;
	var long2 = lngDestination * piBy180;

	var dLon = (long2 - long1);
	var y = Math.sin(dLon) * Math.cos(lat2);
	var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

	var brng = Math.atan2(y, x);
	brng = brng * (180 / Math.PI); //--Converting radians to degrees
	brng = (brng + 360) % 360;
	//brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise
	return brng;
}

function angleBetweenCoordinatesWithLatLng(latLngSource, latLngDestination) {
	var piBy180 = Math.PI / 180;
	var lat1 = latLngSource.lat * piBy180;
	var long1 = latLngSource.lng * piBy180;
	var lat2 = latLngDestination.lat * piBy180;
	var long2 = latLngDestination.lng * piBy180;

	var dLon = (long2 - long1);
	var y = Math.sin(dLon) * Math.cos(lat2);
	var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

	var brng = Math.atan2(y, x);
	brng = brng * (180 / Math.PI); //--Converting radians to degrees
	brng = (brng + 360) % 360;
	//brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise
	return brng;
}
var levelLT=false, levelHT=false, levelH=false;
//--Make plane rotate in circle and keep changing its angle with respect to direction of motion
markerPlane.on('move', function (e) {
	// if (Date.now() - runningTimeofApp >= atcCommandDifficultyToggleTime) {
	// 	atcCommandDifficultyToggle = !atcCommandDifficultyToggle;
	// 	atcCommandDifficultyToggleTime += atcCommandDifficultyToggleTime;
	// }

	if (totalQuestions>=15 && !levelLT){
		audio.play();audio.play();levelLT=true;
	}
	else if (totalQuestions>=22 && !levelHT){
		audio.play();audio.play();levelHT=true;
	}
	else if (totalQuestions>=30 && !levelH){
		audio.play();audio.play();levelH=true;
	}


	if (+markerPlane.getLatLng().lat.toFixed(4) == +planeRotation[nextPositionOfPlane][0].toFixed(4) || +markerPlane.getLatLng().lng.toFixed(4) == +planeRotation[nextPositionOfPlane][1].toFixed(4)) {
		nextPositionOfPlane += 1;
		if (nextPositionOfPlane == 9)
			nextPositionOfPlane = 1;
	}
	var angle = angleBetweenCoordinates(markerPlane.getLatLng(), planeRotation[nextPositionOfPlane][0], planeRotation[nextPositionOfPlane][1]);
	markerPlane.setRotationAngle(angle);
	markerPlane.update();

	//-----Red UAV movement settings-----//
	if (uavRedStarted && uavR.isEnded()) {
		if (eventCounterR < mapArray[mapIdRed]._latlngs[0].length && redToEdge) {
			uavR.moveTo(mapArray[mapIdRed].getLatLngs()[0][eventCounterR], uavSpeed);
			redToEdge = false;
			eventCounterR++;
		}
		else if (!redToEdge) {
			uavR.moveTo(mapCenters[mapIdRed], uavSpeed);
			redToEdge = true;
		}
		else if (eventCounterR >= mapArray[mapIdRed]._latlngs[0].length && redTwise==1){
			eventCounterR=0;
			redTwise=2;
		}
		else {
			// uavR.bindPopup(popupR).openPopup();	
			map.removeLayer(mapArray[mapIdRed]);
			currentUAV = 1;
			uavRedStarted = false;
			eventCounterR = 0;
			circleClick(mapArray[++gotToArea]);
		}
	}

	//-----Green UAV movement settings-----//
	if (uavGreenStarted && uavG.isEnded()) {
		if (eventCounterG < mapArray[mapIdGreen]._latlngs[0].length && greenToEdge) {
			uavG.moveTo(mapArray[mapIdGreen].getLatLngs()[0][eventCounterG], uavSpeed);
			greenToEdge = false;
			eventCounterG++;
		}
		else if (!greenToEdge) {
			uavG.moveTo(mapCenters[mapIdGreen], uavSpeed);
			greenToEdge = true;
		}
		else if (eventCounterG >= mapArray[mapIdGreen]._latlngs[0].length && greenTwise==1){
			eventCounterG=0;
			greenTwise=2;
		}
		else {
			// uavG.bindPopup(popupG).openPopup();	
			map.removeLayer(mapArray[mapIdGreen]);
			currentUAV = 2;
			uavGreenStarted = false;
			eventCounterG = 0;
			circleClick(mapArray[++gotToArea]);
		}
	}

	//-----Blue UAV movement settings-----//
	if (uavBlueStarted && uavB.isEnded()) {
		if (eventCounterB < mapArray[mapIdBlue]._latlngs[0].length && blueToEdge) {
			uavB.moveTo(mapArray[mapIdBlue].getLatLngs()[0][eventCounterB], uavSpeed);
			blueToEdge = false;
			eventCounterB++;
		}
		else if (!blueToEdge) {
			uavB.moveTo(mapCenters[mapIdBlue], uavSpeed);
			blueToEdge = true;
		}
		else if (eventCounterB >= mapArray[mapIdGreen]._latlngs[0].length && blueTwise==1){
			eventCounterB=0;
			blueTwise=2;
		}
		else {
			// uavB.bindPopup(popupB).openPopup();	
			map.removeLayer(mapArray[mapIdBlue]);
			currentUAV = 3;
			uavBlueStarted = false;
			eventCounterB = 0;
			circleClick(mapArray[++gotToArea]);
		}
	}
});

//--Functions for random triangle generator--//
var colorGenerator = function (path) {
	//var colorSelected = flatUIclrs[path.counter % flatUIclrs.length];            
	var colorSelected = flatUIclrs[Math.floor(Math.random() * flatUIclrs.length)];
	if (firstTime) {
		colorToFind = colorSelected;
		firstTime = false;
	}
	if (colorSelected == colorToFind)
		triangleCounter++;
	return '#' + colorSelected;

};

function getOddOrEven() {
	var tmpSel = oddEvenArray[Math.floor(Math.random() * oddEvenArray.length)];
	return tmpSel;
}

var oddEvenSelected;

//-- Function to generate popup with random data --//
function generatePopup() {
	oddEvenSelected = oddEvenArray[Math.floor(Math.random() * oddEvenArray.length)];

	var formData1 = '<div id="triangle' + eventCounter + '" style=" width:200px;height:160px;margin-bottom:0px;"></div>' +
		'<div style="font-weight:600;"> <div id="sample' + eventCounter + '" class="dot"></div>' +
		'<div id="questionDiv' + eventCounter + '" style="display: inline-block;margin-bottom: 10px; margin-top: 10px"></div> </div>' +
		'<button style="background-color:#4CAF50"  onclick="yesNoButtonClick(' + eventCounter + ',1,\'' + oddEvenSelected + '\')">Yes</button>&nbsp' +
		'<button onclick="yesNoButtonClick(' + eventCounter + ',0,\'' + oddEvenSelected + '\')">No</button>';
	// var formData2 =  '<div id="triangle' +eventCounter +'" style=" width:200px;height:160px;margin-bottom:0px;"></div>'+
	// 				'<div style="font-weight:600;"> <div id="sample' +eventCounter +'" class="dot"></div>'+
	// 				'<div id="questionDiv' +eventCounter +'" style="display: inline-block;margin-bottom: 10px; margin-top: 10px"></div> </div>'+
	// 				'<button style="background-color:#4CAF50" onclick="yesNoButtonClick(' + eventCounter +',1,\'' +oddEvenSelected +'\')">Agree</button>&nbsp'+
	// 				'<button onclick="yesNoButtonClick(' + eventCounter +',0,\'' +oddEvenSelected +'\')">Disagree</button>' ;	
	// var formData3 =  '<div id="triangle' +eventCounter +'" style=" width:200px;height:160px;margin-bottom:0px;"></div>'+
	// 				'<div style="font-weight:600;"> <div id="sample' +eventCounter +'" class="dot"></div>'+
	// 				'<div id="questionDiv' +eventCounter +'" style="display: inline-block;margin-bottom: 10px; margin-top: 10px"></div> </div>'+
	// 				'<button style="background-color:#4CAF50" onclick="yesNoButtonClick(' + eventCounter +',1,\'' +oddEvenSelected +'\')">Accord</button>&nbsp'+
	// 				'<button onclick="yesNoButtonClick(' + eventCounter +',0,\'' +oddEvenSelected +'\')">No</button>' ;	
	var formData4 = '<div id="triangle' + eventCounter + '" style=" width:200px;height:160px;margin-bottom:0px;"></div>' +
		'<div style="font-weight:600;"> <div id="sample' + eventCounter + '" class="dot"></div>' +
		'<div id="questionDiv' + eventCounter + '" style="display: inline-block;margin-bottom: 10px; margin-top: 10px"></div> </div>' +
		'<button style="background-color:#4CAF50" onclick="yesNoButtonClick(' + eventCounter + ',0,\'' + oddEvenSelected + '\')">No</button>&nbsp' +
		'<button onclick="yesNoButtonClick(' + eventCounter + ',1,\'' + oddEvenSelected + '\')">Yes</button>';
	// var formData5 =  '<div id="triangle' +eventCounter +'" style=" width:200px;height:160px;margin-bottom:0px;"></div>'+
	// 				'<div style="font-weight:600;"> <div id="sample' +eventCounter +'" class="dot"></div>'+
	// 				'<div id="questionDiv' +eventCounter +'" style="display: inline-block;margin-bottom: 10px; margin-top: 10px"></div> </div>'+
	// 				'<button style="background-color:#4CAF50" onclick="yesNoButtonClick(' + eventCounter +',0,\'' +oddEvenSelected +'\')">Disagree</button>&nbsp'+
	// 				'<button onclick="yesNoButtonClick(' + eventCounter +',1,\'' +oddEvenSelected +'\')">Agree</button>' ;
	// var formData6 =  '<div id="triangle' +eventCounter +'" style=" width:200px;height:160px;margin-bottom:0px;"></div>'+
	// 				'<div style="font-weight:600;"> <div id="sample' +eventCounter +'" class="dot"></div>'+
	// 				'<div id="questionDiv' +eventCounter +'" style="display: inline-block;margin-bottom: 10px; margin-top: 10px"></div> </div>'+
	// 				'<button style="background-color:#4CAF50" onclick="yesNoButtonClick(' + eventCounter +',0,\'' +oddEvenSelected +'\')">No</button>&nbsp'+
	// 				'<button onclick="yesNoButtonClick(' + eventCounter +',1,\'' +oddEvenSelected +'\')">Agree</button>' ;

	var formDateArray = [formData1, formData4];//, formData3, formData4, formData5, formData6];

	return formDateArray[Math.floor(Math.random() * formDateArray.length)];
}

var lastTriangleCount = 0;

//-----Adding popup every 20 sec to one of the UAV-----//
window.setInterval(function () {
	var popupLatLng;
	if (totalQuestions >= questionsLimit) {
		localStorage["totalQuestions"] = totalQuestions;
		localStorage["totalAnswered"] = totalAnswered;
		localStorage["unAnswered"] = totalQuestions - totalAnswered;
		localStorage["correctAnswered"] = correctAnswered;
		localStorage["wrongAnswered"] = wrongAnswered;
		localStorage["responseTimeVector"] = responseTime;
		localStorage["atcCommandAnswers"] = atcCommandAnsweres;
		localStorage["checkListAchieved"] = checkListAchieved;
		localStorage["checkListLastAnsweredTime"] = +(checkListLastAnsweredTime/1000).toFixed(2);

		var maxResponseTime = 0; minResponseTime = 10000; totalResponseTime = 0;
		for (var i = 0; i < totalAnswered; i++) {
			var currentResponseTime = responseTime[i];
			if (currentResponseTime > maxResponseTime)
				maxResponseTime = currentResponseTime;			
			if (currentResponseTime < minResponseTime)
				minResponseTime = currentResponseTime;

			totalResponseTime += currentResponseTime;
		}
		localStorage["averageResponseTime"] = (totalResponseTime / totalAnswered).toFixed(2);
		localStorage["maxResponseTime"] = maxResponseTime;
		localStorage["minResponseTime"] = minResponseTime;


		window.open("charts.html", "_self");
	}
	if (eventCounter > 0)// && eventCounter < 6)	//-- Closing old popup after 20 sec
		map.removeLayer(popupArray[eventCounter - 1]);



	if (nextPopupTo == 1 && uavRedStarted) {
		popupLatLng = uavR.getLatLng();
		if (uavGreenStarted)
			nextPopupTo = 2;
		else if (uavBlueStarted)
			nextPopupTo = 3;
		else
			nextPopupTo = 1;
		// var oddEvenSelected = getOddOrEven();
		// //'<img id="image" src="./carImg.jpg" width="70" height="70" /> </br>'
		// var popData =  '<div id="triangle' +eventCounter +'" style=" width:200px;height:160px;margin-bottom:0px;"></div>'+
		// 				'<div style="font-weight:600;">Number of triangles of <div id="sample' +eventCounter +'" class="dot"></div>'+
		// 				'<div id="questionDiv' +eventCounter +'" style="display: inline-block;margin-bottom: 10px; margin-top: 10px"></div> </div>'+
		// 				'<button  onclick="yesNoButtonClick(' + eventCounter +',1,\'' +oddEvenSelected +'\')">Yes</button>&nbsp'+
		// 				'<button  onclick="yesNoButtonClick(' + eventCounter +',0,\'' +oddEvenSelected +'\')">No</button>' ;	
		var popData = generatePopup();
		var popup = L.popup({ closeOnClick: false, closeButton: false })	// autoClose: false,
			.setLatLng(popupLatLng)
			.setContent(popData)
			.addTo(map);
		//--35 for easy task, 25 for difficult--//
		document.getElementById('triangle' + eventCounter).appendChild(new Triangulr(250, 200, 38, 12, colorGenerator));
		document.getElementById('triangle' + eventCounter).dataset.triangleCount = triangleCounter;
		document.getElementById('sample' + eventCounter).style.backgroundColor = "#" + colorToFind;
		document.getElementById('questionDiv' + eventCounter).innerHTML = ' &nbsp; are ' + oddEvenSelected + '?';// +lastTriangleCount ;	
		firstTime = true; lastTriangleCount = triangleCounter; triangleCounter = 0;

		// if (eventCounter > 0)
		// 	map.removeLayer(popupArray[eventCounter-1]);
		popupArray.push(popup);
		eventCounter++;
		audio.play();
		map.panTo(popupLatLng);
		totalQuestions++;
		performanceStartTime = Date.now();
	}
	else if (nextPopupTo == 2 && uavGreenStarted) {
		popupLatLng = uavG.getLatLng();
		if (uavBlueStarted)
			nextPopupTo = 3;
		else if (uavRedStarted)
			nextPopupTo = 1;
		else
			nextPopupTo = 2;
		// var oddEvenSelected = getOddOrEven();
		// var popData =  '<div id="triangle' +eventCounter +'" style=" width:200px;height:160px;margin-bottom:0px;"></div>'+
		// 				'<div style="font-weight:600;">Number of triangles of <div id="sample' +eventCounter +'" class="dot"></div>'+
		// 				'<div id="questionDiv' +eventCounter +'" style="display: inline-block;margin-bottom: 10px; margin-top: 10px"></div> </div>'+
		// 				'<button  onclick="yesNoButtonClick(' + eventCounter +',1,\'' +oddEvenSelected +'\')">Yes</button>&nbsp'+
		// 				'<button  onclick="yesNoButtonClick(' + eventCounter +',0,\'' +oddEvenSelected +'\')">No</button>' ;			
		var popData = generatePopup();
		var popup = L.popup({ closeOnClick: false, closeButton: false })	//closeOnClick: false, autoClose: false,
			.setLatLng(popupLatLng)
			.setContent(popData)
			.addTo(map);
		//--35 for easy task, 25 for difficult--//
		document.getElementById('triangle' + eventCounter).appendChild(new Triangulr(250, 200, 38, 12, colorGenerator));
		document.getElementById('triangle' + eventCounter).dataset.triangleCount = triangleCounter;
		document.getElementById('sample' + eventCounter).style.backgroundColor = "#" + colorToFind;
		document.getElementById('questionDiv' + eventCounter).innerHTML = ' &nbsp; are ' + oddEvenSelected + '?';// +lastTriangleCount ;	
		firstTime = true; lastTriangleCount = triangleCounter; triangleCounter = 0;

		// map.removeLayer(popupArray[eventCounter-1]);
		popupArray.push(popup);
		eventCounter++;
		audio.play();
		map.panTo(popupLatLng);
		totalQuestions++;
		performanceStartTime = Date.now();
	}
	else if (nextPopupTo == 3 && uavBlueStarted) {
		popupLatLng = uavB.getLatLng();
		if (uavRedStarted)
			nextPopupTo = 1;
		else if (uavGreenStarted)
			nextPopupTo = 2;
		else
			nextPopupTo = 3;
		// var oddEvenSelected = getOddOrEven();		
		// var popData =  '<div id="triangle' +eventCounter +'" style=" width:200px;height:160px;margin-bottom:0px;"></div>'+
		// 				'<div style="font-weight:600;">Number of triangles of <div id="sample' +eventCounter +'" class="dot"></div>'+
		// 				'<div id="questionDiv' +eventCounter +'" style="display: inline-block;margin-bottom: 10px; margin-top: 10px"></div> </div>'+
		// 				'<button  onclick="yesNoButtonClick(' + eventCounter +',1,\'' +oddEvenSelected +'\')">Yes</button>&nbsp'+
		// 				'<button  onclick="yesNoButtonClick(' + eventCounter +',0,\'' +oddEvenSelected +'\')">No</button>' ;			
		var popData = generatePopup();
		var popup = L.popup({ closeOnClick: false, closeButton: false })	//closeOnClick: false, autoClose: false,
			.setLatLng(popupLatLng)
			.setContent(popData)
			.addTo(map);
		//--35 for easy task, 25 for difficult--//
		document.getElementById('triangle' + eventCounter).appendChild(new Triangulr(250, 200, 38, 12, colorGenerator));
		document.getElementById('triangle' + eventCounter).dataset.triangleCount = triangleCounter;
		document.getElementById('sample' + eventCounter).style.backgroundColor = "#" + colorToFind;
		document.getElementById('questionDiv' + eventCounter).innerHTML = ' &nbsp; are ' + oddEvenSelected + '?';// +lastTriangleCount ;	
		firstTime = true; lastTriangleCount = triangleCounter; triangleCounter = 0;

		// map.removeLayer(popupArray[eventCounter-1]);
		popupArray.push(popup);
		eventCounter++;
		audio.play();
		map.panTo(popupLatLng);
		totalQuestions++;
		performanceStartTime = Date.now();
	}
}, popupInterval); //-- It should have 20000 to generate popup after every 20 sec

var speedV=0, headingV=0, altitude=0, vSpeedV=0;

window.setInterval(function () {
	if (totalQuestions <= easyLimit) {
		// var speechData = "Big Hero.  Set.  Speed  " + getRandomBetweenRange(100, 500) + "  Heading  " + getRandomBetweenRange(100, 500)
		// 	+ "  Altitude  " + getRandomBetweenRange(1000, 2500) + "  Vertical Speed  +  " + getRandomBetweenRange(1000, 2500);
		speedV = getRandomBetweenRange(100, 500);
		headingV = getRandomBetweenRange(100, 500);
		altitudeV = getRandomBetweenRange(1000, 2500);
		vSpeedV = getRandomBetweenRange(1000, 2500);
		speakThis("Big Hero.  Set.  Speed  " + speedV);
		speakThis("  Heading  " + headingV);
		speakThis("  Altitude  " + altitudeV);
		speakThis("  Vertical Speed  " + vSpeedV);		

		// if(initiateChecklist){
		// 	// document.getElementById("blockForCl").innerHTML = "Press E";
		// 	document.getElementsByName("clPopup_button")[0].click();
		// 	initiateChecklist = false;
		// 	checkListStartTime = Date.now();
		// }
	}
}, atcCommandIntervalL);

window.setInterval(function () {
	if (totalQuestions > easyLimit && totalQuestions <= transitionEasyLimit) {
		// var speechData = "Big Hero.  Set.  Speed  " + getRandomBetweenRange(100, 500) + "  Heading  " + getRandomBetweenRange(100, 500)
		// 	+ "  Altitude  " + getRandomBetweenRange(1000, 2500) + "  Vertical Speed  +  " + getRandomBetweenRange(1000, 2500)
		// speakThis(speechData);
		speedV = getRandomBetweenRange(100, 500);
		headingV = getRandomBetweenRange(100, 500);
		altitudeV = getRandomBetweenRange(1000, 2500);
		vSpeedV = getRandomBetweenRange(1000, 2500);
		speakThis("Big Hero.  Set.  Speed  " + speedV);
		speakThis("  Heading  " + headingV);
		speakThis("  Altitude  " + altitudeV);
		speakThis("  Vertical Speed  " + vSpeedV);
	}
}, atcCommandIntervalTL);

window.setInterval(function () {
	if (totalQuestions > transitionEasyLimit && totalQuestions <= transitionHardLimit) {
		// var speechData = "Big Hero.  Set.  Speed  " + getRandomBetweenRange(100, 500) + "  Heading  " + getRandomBetweenRange(100, 500)
		// 	+ "  Altitude  " + getRandomBetweenRange(1000, 2500) + "  Vertical Speed  +  " + getRandomBetweenRange(1000, 2500)
		// speakThis(speechData);
		speedV = getRandomBetweenRange(100, 500);
		headingV = getRandomBetweenRange(100, 500);
		altitudeV = getRandomBetweenRange(1000, 2500);
		vSpeedV = getRandomBetweenRange(1000, 2500);
		speakThis("Big Hero.  Set.  Speed  " + speedV);
		speakThis("  Heading  " + headingV);
		speakThis("  Altitude  " + altitudeV);
		speakThis("  Vertical Speed " + vSpeedV);
	}
}, atcCommandIntervalTH);


window.setInterval(function () {
	if (totalQuestions > transitionHardLimit && totalQuestions <= hardLimit) {
		
		speedV = getRandomBetweenRange(100, 500);
		headingV = getRandomBetweenRange(100, 500);
		altitudeV = getRandomBetweenRange(1000, 2500);
		vSpeedV = getRandomBetweenRange(1000, 2500);
		speakThis("Big Hero.  Set.  Speed  " + speedV);
		speakThis("  Heading  " + headingV);
		speakThis("  Altitude  " + altitudeV);
		speakThis("  Vertical Speed  " + vSpeedV);

		if(initiateChecklist){
			document.getElementsByName("clPopup_button")[0].click();
			initiateChecklist = false;
			checkListStartTime = Date.now();
		}
	}
}, atcCommandIntervalH);


redClicked = false;
greenClicked = false;
blueClicked = false;



// circleR.on('click', circleRClick);
// circleG.on('click', circleGClick);
// circleB.on('click', circleBClick);


uavR.on('click', function (e) {
	//uavR.bindPopup('Yes!').openPopup();	
	currentUAV = 1;
});

uavG.on('click', function (e) {
	//uavG.bindPopup('Yes!').openPopup();	
	currentUAV = 2;
});

uavB.on('click', function (e) {
	//uavB.bindPopup('Yes!').openPopup();	
	currentUAV = 3;
});



//var redAreaLatLng = [], greenAreaLatLng = [], blueAreaLatLng = [];
var mapIdRed, mapIdGreen, mapIdBlue;
var gotToArea = 0;

function circleClick(e) {
	if (gotToArea >= mapArray.length)
		return;
	if (currentUAV == 1 && !uavRedStarted) {
		//eventCounterR++;
		uavRedStarted = true;
		map.removeLayer(popupR);
		//uavR.bindPopup('OK').openPopup();		
		mapIdRed = (areaSelection == 1) ? this.options.customId : e.options.customId;
		if (!mapSelection)
			uavR.moveTo(mapCenters[mapIdRed], uavSpeed);
		else
			uavR.moveTo(mapArray[mapIdRed].getLatLngs()[0][0], uavSpeed);
		setTimeout(function () {
			if (!uavGreenStarted) {
				currentUAV = 2;
				circleClick(mapArray[++gotToArea]);
			}
			// else if (!uavBlueStarted)
			// 	currentUAV = 3;
		}, 15000);
	}
	else if (currentUAV == 2 && !uavGreenStarted) {
		//eventCounterG++;
		uavGreenStarted = true;
		map.removeLayer(popupG);
		//uavG.bindPopup('OK').openPopup();
		mapIdGreen = (areaSelection == 1) ? this.options.customId : e.options.customId;
		if (!mapSelection)
			uavG.moveTo(mapCenters[mapIdGreen], uavSpeed);
		else
			uavG.moveTo(mapArray[mapIdGreen].getLatLngs()[0][0], uavSpeed);
		setTimeout(function () {
			if (!uavBlueStarted) {
				currentUAV = 3;
				circleClick(mapArray[++gotToArea]);
			}
			// else if (!uavRedStarted)
			// 	currentUAV = 1;
		}, 15000);
	}
	else if (currentUAV == 3 && !uavBlueStarted) {
		//eventCounterB++;
		uavBlueStarted = true;
		map.removeLayer(popupB);
		//uavB.bindPopup('OK').openPopup();
		mapIdBlue = (areaSelection == 1) ? this.options.customId : e.options.customId;
		if (!mapSelection)
			uavB.moveTo(mapCenters[mapIdBlue], uavSpeed);
		else
			uavB.moveTo(mapCenters[mapIdBlue].getLatLngs()[0][0], uavSpeed);
		if (!uavRedStarted)
			currentUAV = 1;
		else if (!uavGreenStarted)
			currentUAV = 2;
		else
			currentUAV = 0;
	}
}

var currentUAV = 1;
var circles = [];
var latRoot = 43.62365;
var lngRoot = 1.385457;
var latIncrement = 0.023774;
var lngIncrement = 0.034053;
var newLat = latRoot;
var newLng = lngRoot;
//-----Lng difference between 2 circle centres 0,034053
//-----Lng difference from centre to right edge 0.022424
//-----Lat differece from centre to top edge −0,016587

//-----------------------------------------------------------------------------------------------//
//-----Voice synthesizer functions and objcets-----//
//-----Referecence: https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis-----//

var synth = window.speechSynthesis;
var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('input');
// var voiceSelect = document.querySelector('select');

function speakThis(dataToSpeak) {

	voices = synth.getVoices();

	// voiceSelect = voices[2];

	// for(i = 0; i < voices.length ; i++) {
	// 	var option = document.createElement('option');
	// 	option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

	// 	if(voices[i].default) {
	// 		option.textContent += ' -- DEFAULT';
	// 	}
	// 	option.setAttribute('data-lang', voices[i].lang);
	// 	option.setAttribute('data-name', voices[i].name);
	// 	voiceSelect.appendChild(option);
	// }

	voices = synth.getVoices();
	var utterThis = new SpeechSynthesisUtterance(dataToSpeak);
	// var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
	// for(i = 0; i < voices.length ; i++) {
	// 	if(voices[i].name === selectedOption) {
	// 	utterThis.voice = voices[i];
	// 	}
	// }
	utterThis.voice = voices[2];

	synth.speak(utterThis);
}
//-----End of voice synthesizer function and objects-----//
//-------------------------------------------------------//

setTimeout(function () {
	//  document.getElementsByName("open1")[0].click();

	//---Voice Synthesizer sample---//
	// speakThis("Big hero. New co-ordinates are. Speed 140, heading 140, altitude 1400, vertical speed + 1400. over");
	// //--------------End---------------//

	// return;	
	mapSelection = 0;
	areaSelection = 0;
	createMap();
	circleClick(mapArray[gotToArea]);

}, 1000);

// var keyPressCounter = 0;
var keyPressedString = "";
var atcCommandAnsweres = [];
var checkListAchieved = 0;
var checkListLastAnsweredTime = Date.now(); //This will hold the difference between the start time of checklist and the last correct answer in checklist

document.getElementById("bodyID").addEventListener("keypress", (event) => {
	const keyName = event.key;
	// alert(keyName);
		
	if (keyName == 'Enter'){ 
		if (keyPressedString == 'Cabin pressure' ) {
			document.getElementById("clPopup").style.backgroundImage = "linear-gradient(white 90%, green)";
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'mode Sys') {
			document.getElementById("clPopup").style.backgroundImage = "linear-gradient(white 80%, green)";
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'GPWS G/S') {
			document.getElementById("clPopup").style.backgroundImage = "linear-gradient(white 70%, green)";
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'Anti Ice') {
			document.getElementById("clPopup").style.backgroundImage = "linear-gradient(white 60%, green)";
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'wings all') {
			document.getElementById("clPopup").style.backgroundImage = "linear-gradient(white 50%, green)";
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'Altimeter standard') {
			document.getElementById("clPopup").style.backgroundImage = "linear-gradient(white 40%, green)";
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'QNH') {
			document.getElementById("clPopup").style.backgroundImage = "linear-gradient(white 30%, green)";
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'Signs:') {
			document.getElementById("clPopup").style.backgroundImage = "linear-gradient(white 20%, green)";
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'Seat belt') {
			document.getElementById("clPopup").style.backgroundImage = "linear-gradient(white 10%, green)";
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'No Smoking') {
			document.getElementsByName("clPopup_close")[0].click();
			checkListAchieved += 10;
			checkListLastAnsweredTime = Date.now() - checkListStartTime;
		}
		else if (keyPressedString == 'c' || keyPressedString.endsWith('c')) {
			keyPressedString = "";
		}
		else if(keyPressedString.startsWith('s')){
			if(keyPressedString=="s"+speedV.toString())
				atcCommandAnsweres.push(1);
			else
				atcCommandAnsweres.push(0);
		}
		else if(keyPressedString.startsWith('h')){
			if(keyPressedString=="h"+headingV.toString())
				atcCommandAnsweres.push(1);
			else
				atcCommandAnsweres.push(0);
		}
		else if(keyPressedString.startsWith('a')){
			if(keyPressedString=="a"+altitudeV.toString())
				atcCommandAnsweres.push(1);
			else
				atcCommandAnsweres.push(0);
		}
		else if(keyPressedString.startsWith('v')){
			if(keyPressedString=="v"+vSpeedV.toString())
				atcCommandAnsweres.push(1);
			else
				atcCommandAnsweres.push(0);
		}
		keyPressedString = "";
	}
	else
		keyPressedString += keyName;
});

var mapSelection, areaSelection, addMore = 1;
var mapPoints = [];
var areaCounter = 0;
var mapArray = [];

function createMap() {
	var polygon = L.polygon(areaList[0], { color: 'red', customId: customIdCounter }).addTo(map);
	polygon.on('click', circleClick);
	mapArray.push(polygon);
	customIdCounter++
	polygon = L.polygon(areaList[1], { color: 'red', customId: customIdCounter }).addTo(map);
	polygon.on('click', circleClick);
	mapArray.push(polygon);
	customIdCounter++
	polygon = L.polygon(areaList[2], { color: 'red', customId: customIdCounter }).addTo(map);
	polygon.on('click', circleClick);
	mapArray.push(polygon);
	customIdCounter++
	polygon = L.polygon(areaList[3], { color: 'red', customId: customIdCounter }).addTo(map);
	polygon.on('click', circleClick);
	mapArray.push(polygon);
	customIdCounter++
	polygon = L.polygon(areaList[4], { color: 'red', customId: customIdCounter }).addTo(map);
	polygon.on('click', circleClick);
	mapArray.push(polygon);
	customIdCounter++
	polygon = L.polygon(areaList[5], { color: 'red', customId: customIdCounter }).addTo(map);
	polygon.on('click', circleClick);
	mapArray.push(polygon);
	customIdCounter++
}


//--Called by JS popups for global settings
function initialSettings(questionId, answer) {
	switch (questionId) {
		case 1: //--Map seletion type, and opens area selection
			mapSelection = answer;
			document.getElementsByName("open2")[0].click();
			break;
		case 2:	//--Area selection type, and starts manual map selection
			areaSelection = answer;
			if (mapSelection)	//-- if manual selecte--//
				setTimeout(function () {
					mapPoints[areaCounter] = [];
					document.getElementsByName("open3")[0].click();
				}, 500);
			else {
				createMap();
				circleClick(mapArray[gotToArea]);
			}
			break;
		case 3:	//--Manual map selection, and map creation
			// mapPoints.push(tempPoints);
			var polygon = L.polygon(mapPoints[areaCounter], { color: 'red', customId: customIdCounter }).addTo(map);
			customIdCounter++;
			polygon.on('click', circleClick);
			mapArray.push(polygon);
			areaCounter++;
			setTimeout(function () {
				document.getElementsByName("popupCancelArea")[0].click();
			}, 500);
			break;
		case 4:	//--Confirming area selected
			if (answer) {
				var numbnerOfPoints = mapPoints[--areaCounter].length;
				mapPoints[areaCounter].pop();
				map.removeLayer(mapArray[areaCounter]);
				mapArray.pop();
				for (var i = 0; i <= numbnerOfPoints; i++) {
					var circlesArrayLength = circlesArray.length;
					map.removeLayer(circlesArray[--circlesArrayLength]);
					circlesArray.pop();
				}
			}
			document.getElementsByName("open4")[0].click();
			break;
		case 5:	//--Add more map areas
			addMore = answer;
			if (answer) {
				mapPoints[areaCounter] = [];
				document.getElementsByName("open3")[0].click();
			}
			break;
	}
}
var circlesArray = [];
customIdCounter = 0;
var lastLatLng;

map.on("click", function (e) {
	if (mapSelection && addMore) {
		//if (lastLatLng != null)
		//	alert('Angle: ' + angleBetweenCoordinatesWithLatLng(e.latlng, lastLatLng));
		mapPoints[areaCounter].push(e.latlng);
		var circle = L.circle(e.latlng, { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 30 }).addTo(map);
		circlesArray.push(circle);
		lastLatLng = e.latlng;
	}
	// var polygon = L.polygon(areaList[0], {color: 'red'}).addTo(map);
	// var polygon = L.polygon(areaList[1], {color: 'red'}).addTo(map);
	// var polygon = L.polygon(areaList[2], {color: 'red'}).addTo(map);
	// var polygon = L.polygon(areaList[3], {color: 'red'}).addTo(map);
	// var polygon = L.polygon(areaList[4], {color: 'red'}).addTo(map);
	// var polygon = L.polygon(areaList[5], {color: 'red'}).addTo(map);

	// var popup= L.popup({closeOnClick: false, autoClose: false})
	// 							.setLatLng([43.5813205, 1.392946])
	// 							.setContent("I am in the middle")
	// 							.addTo(map);	

	//alert(' ' + e.latlng);
});
