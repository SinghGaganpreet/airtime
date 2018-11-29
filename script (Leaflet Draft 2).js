// initialize the map on the "map" div with a given center and zoom
var map = new L.Map('map', {
  zoom: 13,
  minZoom: 13,
  //closePopupOnClick: false,
});

// create a new tile layer
//var tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
var tileUrl = 'Toulouse/map/{z}/{x}/{y}.png',

layer = new L.TileLayer(tileUrl,
{
    attribution: 'Maps © <a href=\"www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
    maxZoom: 14
});

// add the layer to the map
map.addLayer(layer);


var toulouse = [[43.674278, 1.258794], [43.540312, 1.634932]];
var parisKievLL = [[48.8567, 2.3508], [50.45, 30.523333]];
var londonParisRomeBerlinBucarest = [[51.507222, -0.1275], [48.8567, 2.3508],
[41.9, 12.5], [52.516667, 13.383333], [44.4166,26.1]];
var planeRotation = [[43.593074, 1.441183], [43.601651, 1.462555], [43.611347, 1.468906], [43.62191, 1.462727], [43.624831, 1.441698], [43.621041, 1.421356], [43.611036, 1.413031], [43.602335, 1.41715], [43.593074, 1.441183]];


var wayPointsForRed = [[43.598046, 1.431742], [43.605256, 1.429768], [43.613335, 1.419468], [43.602211, 1.421528], [43.593944, 1.411486], [43.598046, 1.399469], [43.60277, 1.412258], [43.610042, 1.413116], [43.601403, 1.399727], [43.607494, 1.401615]];
var wayPointsForGreen = [[43.61203, 1.452599], [43.614578, 1.439638], [43.622842, 1.428566], [43.624893, 1.451054], [43.626694, 1.43672], [43.629304, 1.429939], [43.629366, 1.427279], [43.633218, 1.445732], [43.626881, 1.416121], [43.628496, 1.464186]];
var wayPointsForBlue = [[43.59556, 1.465387], [43.605318, 1.450195], [43.60594, 1.449423], [43.609731, 1.465645], [43.602273, 1.482468], [43.608053, 1.457748], [43.60768, 1.438179], [43.614081, 1.476974], [43.610912, 1.488991], [43.588784, 1.47294]];

var areaList = [ [ [43.562606, 1.349258], [43.562481, 1.432514], [43.581013, 1.427364], [43.600035, 1.436634], [43.600035, 1.349258], [43.562606, 1.349258]],
							[ [43.600035, 1.436634], [43.61346, 1.40625], [43.634087, 1.401615], [43.634087, 1.349258], [43.600035, 1.349258]],
							[ [43.600035, 1.436634], [43.600035, 1.476288], [43.634087, 1.476288], [43.634087, 1.401615], [43.61346, 1.40625]],
							[ [43.562481, 1.432514], [43.562481, 1.484528], [43.600035, 1.476288], [43.600035, 1.436634], [43.581013, 1.427364]],
							[ [43.562481, 1.484528], [43.562481, 1.542892], [43.600035, 1.542892], [43.600035, 1.476288]],
							[ [43.600035, 1.476288], [43.600035, 1.542892], [43.634087, 1.542892], [43.634087, 1.476288]]]
//43.57812933, 1.390714333
map.fitBounds(toulouse);
var audio = new Audio('longBeep.mp3');

var plane = L.icon({iconUrl: 'planeB.png', iconSize: [40, 40], iconAnchor: [20, 20]});
var uavB = L.icon({iconUrl: 'uavB.png', iconSize: [30, 30], iconAnchor: [15, 15]}); 
var uavG = L.icon({iconUrl: 'uavG.png', iconSize: [30, 30], iconAnchor: [15, 15]}); 
var uavR = L.icon({iconUrl: 'uavR.png', iconSize: [30, 30], iconAnchor: [15, 15]}); 
var panda = L.icon({iconUrl: 'panda.png', iconSize: [50, 50], iconAnchor: [0, 0], popupAnchor: [25, 0]});

var markerPlane = L.Marker.movingMarker(planeRotation, [15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000], {icon: plane,  autostart: true, loop: true, zIndexOffset: 10000}).addTo(map);

//var markerPanda = L.Marker.movingMarker([[43.58064, 1.454058]], [], {icon: panda}).addTo(map);
var uavR = L.Marker.movingMarker([[43.592156, 1.458603+0.01]], [], {icon: uavR}).addTo(map);
var uavG = L.Marker.movingMarker([[43.592156, 1.458603-0.01]], [], {icon: uavG}).addTo(map);
var uavB = L.Marker.movingMarker([[43.592156, 1.458603]], [], {icon: uavB}).addTo(map);

var circleR = L.circle([43.62365, 1.385457], {color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 1800});
var circleG = L.circle([43.62365, 1.41951], {color: 'green', fillColor: '#09ff00', fillOpacity: 0.5, radius: 1800 });
var circleB = L.circle([43.599876, 1.385457], {color: 'blue', fillColor: '#006bff', fillOpacity: 0.5, radius: 1800 });

var uavRedStarted = false;
var uavGreenStarted = false;
var uavBlueStarted = false;

var keys = [];
var values = [];
var popupArray = [];
var eventCounter = 1;

var eventCounterR = 1;
var eventCounterG = 1;
var eventCounterB = 1;

//-----Click event handler for Yes and No button of popups-----//
function yesNoButtonClick(eventNumber, buttonClicked) {   
	if (buttonClicked == 1){
		keys.push(eventNumber);
		values.push(1);
		map.removeLayer(popupArray[eventNumber-1]);
	}
	else if (buttonClicked == 0){
		keys.push(eventNumber);
		values.push(0);
		map.removeLayer(popupArray[eventNumber-1]);
	}
}

//-----Function to calculate angle between two lat long-----//
function angleBetweenCoordinates(latLngSource, latDestination, lngDestination){
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
/*
function angleBetweenCoordinates(latLngSource, latLngDestination){
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
*/

//-----Lng difference from centre to right edge 0.022424
//-----Lat differece from centre to top edge −0,016587

//--Make plane rotate in circle and keep changing its angle with respect to direction of motion
var nextPositionOfPlane = 1;
var nextPopupTo = 1;
var nextLatLngForRed = [0, 0];
var nextLatLngForGreen = [0, 0];
var nextLatLngForGreen = [0, 0];

var popupR = L.popup({closeOnClick: false, autoClose: false}).setContent('I am done. Give another location.');
var popupG = L.popup({closeOnClick: false, autoClose: false}).setContent('I am done. Give another location.');
var popupB = L.popup({closeOnClick: false, autoClose: false}).setContent('I am done. Give another location.');

markerPlane.on('move', function(e){	
	if(markerPlane.getLatLng().lat.toFixed(4) == planeRotation[nextPositionOfPlane][0].toFixed(4) || markerPlane.getLatLng().lng.toFixed(4) == planeRotation[nextPositionOfPlane][1].toFixed(4))
	{
		nextPositionOfPlane += 1;
		if (nextPositionOfPlane == 9)
			nextPositionOfPlane = 1;
	}	
	var angle = angleBetweenCoordinates(markerPlane.getLatLng(), planeRotation[nextPositionOfPlane][0], planeRotation[nextPositionOfPlane][1]);
	markerPlane.setRotationAngle(angle);	
	markerPlane.update();
	
	//-----Red UAV movement settings-----//
	if (uavRedStarted && uavR.isEnded()){		
		nextLatLngForRed = [redAreaLatLng.lat, redAreaLatLng.lng];	
		switch (eventCounterR){
			case 2:
				nextLatLngForRed[1] += 0.022424;
				uavR.moveTo(nextLatLngForRed, 20000);
				eventCounterR++;
				break;
			case 3:
				nextLatLngForRed[1] -= 0.022424;
				uavR.moveTo(nextLatLngForRed, 20000);
				eventCounterR++;
				break;
			case 4:
				nextLatLngForRed[0] -= 0.016587;
				uavR.moveTo(nextLatLngForRed, 20000);
				eventCounterR++;
				break;
			case 5:
				nextLatLngForRed[0] += 0.016587;
				uavR.moveTo(nextLatLngForRed, 20000);
				eventCounterR++;
				break;
			case 6:
				nextLatLngForRed[0] -= 0.010587;
				nextLatLngForRed[1] += 0.020024;
				uavR.moveTo(nextLatLngForRed, 20000);
				eventCounterR++;
				break;
			case 7:
				nextLatLngForRed[0] += 0.010587;
				nextLatLngForRed[1] -= 0.020024;
				uavR.moveTo(nextLatLngForRed, 20000);
				eventCounterR++;
				break;
			case 8:
				nextLatLngForRed[0] += 0.010587;
				nextLatLngForRed[1] += 0.020024;
				uavR.moveTo(nextLatLngForRed, 20000);
				eventCounterR++;
				break;
			case 9:
				nextLatLngForRed[0] -= 0.010587;
				nextLatLngForRed[1] -= 0.020024;
				uavR.moveTo(nextLatLngForRed, 20000);
				eventCounterR++;
				break;
			case 10:
				uavR.moveTo(nextLatLngForRed, 20000);				
				eventCounterR++;				
				break;
			case 11:
				uavR.bindPopup(popupR).openPopup();	
				map.removeLayer(circles[circleIdRed]);
				currentUAV = 1;		
				uavRedStarted = false;	
				eventCounterR = 1;	
				break;
		}
	}	
	
	//-----Green UAV movement settings-----//
	if (uavGreenStarted && uavG.isEnded()){
		nextLatLngForGreen = [greenAreaLatLng.lat, greenAreaLatLng.lng];	
		switch (eventCounterG){
			case 2:
				nextLatLngForGreen[1] += 0.022424;
				uavG.moveTo(nextLatLngForGreen, 20000);
				eventCounterG++;
				break;
			case 3:
				nextLatLngForGreen[1] -= 0.022424;
				uavG.moveTo(nextLatLngForGreen, 20000);
				eventCounterG++;
				break;
			case 4:
				nextLatLngForGreen[0] -= 0.016587;
				uavG.moveTo(nextLatLngForGreen, 20000);
				eventCounterG++;
				break;
			case 5:
				nextLatLngForGreen[0] += 0.016587;
				uavG.moveTo(nextLatLngForGreen, 20000);
				eventCounterG++;
				break;
			case 6:
				nextLatLngForGreen[0] -= 0.010587;
				nextLatLngForGreen[1] += 0.020024;
				uavG.moveTo(nextLatLngForGreen, 20000);
				eventCounterG++;
				break;
			case 7:
				nextLatLngForGreen[0] += 0.010587;
				nextLatLngForGreen[1] -= 0.020024;
				uavG.moveTo(nextLatLngForGreen, 20000);
				eventCounterG++;
				break;
			case 8:
				nextLatLngForGreen[0] += 0.010587;
				nextLatLngForGreen[1] += 0.020024;
				uavG.moveTo(nextLatLngForGreen, 20000);
				eventCounterG++;
				break;
			case 9:
				nextLatLngForGreen[0] -= 0.010587;
				nextLatLngForGreen[1] -= 0.020024;
				uavG.moveTo(nextLatLngForGreen, 20000);
				eventCounterG++;
				break;
			case 10:
				uavG.moveTo(nextLatLngForGreen, 20000);
				eventCounterG++;
				break;
			case 11:
				uavG.bindPopup(popupG).openPopup();	
				map.removeLayer(circles[circleIdGreen]);
				currentUAV = 2;		
				uavGreenStarted = false;	
				eventCounterG = 1;	
				break;								
		}
	}
	
	//-----Blue UAV movement settings-----//
	if (uavBlueStarted && uavB.isEnded()){
		nextLatLngForBlue = [blueAreaLatLng.lat, blueAreaLatLng.lng];	
		switch (eventCounterB){
			case 2:
				nextLatLngForBlue[1] += 0.022424;
				uavB.moveTo(nextLatLngForBlue, 20000);
				eventCounterB++;
				break;
			case 3:
				nextLatLngForBlue[1] -= 0.022424;
				uavB.moveTo(nextLatLngForBlue, 20000);
				eventCounterB++;
				break;
			case 4:
				nextLatLngForBlue[0] -= 0.016587;
				uavB.moveTo(nextLatLngForBlue, 20000);
				eventCounterB++;
				break;
			case 5:
				nextLatLngForBlue[0] += 0.016587;
				uavB.moveTo(nextLatLngForBlue, 20000);
				eventCounterB++;
				break;
			case 6:
				nextLatLngForBlue[0] -= 0.010587;
				nextLatLngForBlue[1] += 0.020024;
				uavB.moveTo(nextLatLngForBlue, 20000);
				eventCounterB++;
				break;
			case 7:
				nextLatLngForBlue[0] += 0.010587;
				nextLatLngForBlue[1] -= 0.020024;
				uavB.moveTo(nextLatLngForBlue, 20000);
				eventCounterB++;
				break;
			case 8:
				nextLatLngForBlue[0] += 0.010587;
				nextLatLngForBlue[1] += 0.020024;
				uavB.moveTo(nextLatLngForBlue, 20000);
				eventCounterB++;
				break;
			case 9:
				nextLatLngForBlue[0] -= 0.010587;
				nextLatLngForBlue[1] -= 0.020024;
				uavB.moveTo(nextLatLngForBlue, 20000);
				eventCounterB++;
				break;
			case 10:
				uavB.moveTo(nextLatLngForBlue, 20000);
				eventCounterB++;		
				break;
			case 11:
				uavB.bindPopup(popupB).openPopup();	
				map.removeLayer(circles[circleIdBlue]);
				uavBlueStarted = false;
				currentUAV = 3;		
				eventCounterB = 1;	
				break;
		}
	}		
});

//-----Adding popup every 20 sec to one of the UAV-----//
window.setInterval(function(){
		var popupLatLng;
		if (nextPopupTo == 1 && uavRedStarted){
			popupLatLng = uavR.getLatLng();
			if (uavGreenStarted)
				nextPopupTo = 2;
			else if (uavBlueStarted)
				nextPopupTo = 3;
			else
				nextPopupTo = 1;
			var formData = '<img id="image" src="./carImg.jpg" width="70" height="70" /> </br>'+
								'<button  onclick="yesNoButtonClick(' + eventCounter +',1)">Yes</button>&nbsp'+
								'<button  onclick="yesNoButtonClick(' + eventCounter +',0)">No</button>' ;
			var popup= L.popup({closeOnClick: false, autoClose: false})
							.setLatLng(popupLatLng)
							.setContent(formData)
							.addTo(map);						
			popupArray.push(popup);
			eventCounter++;
			audio.play();
		}
		else if (nextPopupTo == 2 && uavGreenStarted){
			popupLatLng = uavG.getLatLng();
			if (uavBlueStarted)
				nextPopupTo = 3;
			else if (uavRedStarted)
				nextPopupTo = 1;
			else
				nextPopupTo = 2;
			var formData = '<img id="image" src="./carImg.jpg" width="70" height="70" /> </br>'+
								'<button  onclick="yesNoButtonClick(' + eventCounter +',1)">Yes</button>&nbsp'+
								'<button  onclick="yesNoButtonClick(' + eventCounter +',0)">No</button>' ;
			var popup= L.popup({closeOnClick: false, autoClose: false})
							.setLatLng(popupLatLng)
							.setContent(formData)
							.addTo(map);						
			popupArray.push(popup);
			eventCounter++;
			audio.play();
		}
		else if (nextPopupTo == 3 && uavBlueStarted){
			popupLatLng = uavB.getLatLng();
			if (uavRedStarted)
				nextPopupTo = 1;
			else if (uavGreenStarted)
				nextPopupTo = 2;
			else
				nextPopupTo = 3;			
			var formData = '<img id="image" src="./carImg.jpg" width="70" height="70" /> </br>'+
								'<button  onclick="yesNoButtonClick(' + eventCounter +',1)">Yes</button>&nbsp'+
								'<button  onclick="yesNoButtonClick(' + eventCounter +',0)">No</button>' ;
			var popup= L.popup({closeOnClick: false, autoClose: false})
							.setLatLng(popupLatLng)
							.setContent(formData)
							.addTo(map);						
			popupArray.push(popup);
			eventCounter++;
			audio.play();
		}			
	}, 20000);
		
redClicked = false;
greenClicked = false;
blueClicked = false;

/* Code for Red, Green, and Blue circles 
function circleRClick(e){
	if (redClicked)
		txt = "Ok!";
	else
		txt = "Auto On!";
	uavRedStarted = true;
	uavR.bindPopup(txt).openPopup();
	uavR.moveTo(wayPointsForRed[0],20000);
	
	setTimeout(function() {
		//map.removeLayer(circleR);
		circleG.addTo(map);
		markerPanda.bindPopup('<div style="text-align:justify; color:gray; font-weight: 600">Click on the <span style="color:green">Green UAV</span> and then on <span style="color:green">Green Circle</span>. To search that area.</div>').openPopup();	
	}, 1000);
	
	setTimeout(function() {
		if(!greenClicked)
			circleGClick();
	}, 10000);
}

function circleGClick(e){	
	if (greenClicked)
		txt = "Ok!";
	else
		txt = "Auto On!";
	uavG.bindPopup(txt).openPopup();
	uavGreenStarted = true;
	uavG.moveTo(wayPointsForGreen[0],20000);
	
	setTimeout(function() {
		//map.removeLayer(circleG);
		circleB.addTo(map);
		markerPanda.bindPopup('<div style="text-align:justify; color:gray; font-weight: 600">Click on the <span style="color:blue">Blue UAV</span> and then on <span style="color:blue">Blue Circle</span>. To search that area.</div>').openPopup();	
	}, 1000);
	
	setTimeout(function() {
		if(!blueClicked)
			circleBClick();
	}, 10000);
}

function circleBClick(e){	
	if (blueClicked)
		txt = "Ok!";
	else
		txt = "Auto On!";
	uavB.bindPopup(txt).openPopup();
	uavBlueStarted = true;
	uavB.moveTo(wayPointsForBlue[0],20000);
	
	setTimeout(function() {
		//map.removeLayer(circleB);
		markerPanda.bindPopup('Great job!').openPopup();	
	}, 1000);
	
}

circleR.on('click', circleRClick);
circleG.on('click', circleGClick);
circleB.on('click', circleBClick);
*/

uavR.on('click', function(e){
	//uavR.bindPopup('Yes!').openPopup();	
	currentUAV = 1;	
});

uavG.on('click', function(e){
	//uavG.bindPopup('Yes!').openPopup();	
	currentUAV = 2;
});

uavB.on('click', function(e){
	//uavB.bindPopup('Yes!').openPopup();	
	currentUAV = 3;
});

var redAreaLatLng, greenAreaLatLng, blueAreaLatLng;
var circleIdRed, circleIdGreen, circleIdBlue;;

function circleClick(e){
	if (currentUAV == 1 && !uavRedStarted){
		eventCounterR++;
		uavRedStarted = true;
		map.removeLayer(popupR);
		//uavR.bindPopup('OK').openPopup();
		circleIdRed = this.options.customId;
		redAreaLatLng = circles[circleIdRed].getLatLng();
		uavR.moveTo(redAreaLatLng, 20000);		
		setTimeout(function() {	
			if (!uavGreenStarted){
				currentUAV = 2;
				//markerPanda.bindPopup('<div style="text-align:justify; color:gray; font-weight: 600">Select area for <span style="color:green">The Hornet</span></div>').openPopup();	
			}
			else if (!uavBlueStarted)
				currentUAV = 3;
		}, 1000);
	}
	else if (currentUAV == 2 && !uavGreenStarted){
		eventCounterG++;
		uavGreenStarted = true;
		map.removeLayer(popupG);
		//uavG.bindPopup('OK').openPopup();
		circleIdGreen = this.options.customId;
		greenAreaLatLng = circles[circleIdGreen].getLatLng();
		uavG.moveTo(greenAreaLatLng, 20000);
		setTimeout(function() {	
			if (!uavBlueStarted){
				currentUAV = 3;
				//markerPanda.bindPopup('<div style="text-align:justify; color:gray; font-weight: 600">Select area for <span style="color:blue">Bumbelbee</span></div>').openPopup();	
			}
			else if (!uavRedStarted)
				currentUAV = 1;
		}, 1000);
	}
	else if (currentUAV == 3 && !uavBlueStarted){
		eventCounterB++;
		uavBlueStarted = true;
		map.removeLayer(popupB);
		//uavB.bindPopup('OK').openPopup();
		circleIdBlue = this.options.customId;
		blueAreaLatLng = circles[circleIdBlue].getLatLng();
		uavB.moveTo(blueAreaLatLng, 20000);
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


setTimeout(function() {	
	//document.getElementsByName("open1")[0].click();
	//document.getElementsByName("open2")[0].click();
	for (var i = 0; i < 10; i++)
	{		
		var circle = L.circle([newLat, newLng], {color: 'gray', fillColor: '#D3D3D3', fillOpacity: 0.5, radius: 1800, customId: i});				
		circle.on('click', circleClick);
		circles.push(circle);
		circle.addTo(map);
		if ( i < 4 || i > 4)
			newLng += lngIncrement;
		else if ( i == 4 )
		{
			newLat -= latIncrement;
			newLng = lngRoot;
		}
	}
	
	//alert('---' + circles[0].getLatLng());
	
	//circleR.addTo(map);
	//markerPanda.bindPopup('<div style="text-align:justify; color:gray; font-weight: 600">Select area for <span style="color:red">Dragon Fly</span></div>').openPopup();		
	/*	
	setTimeout(function() {
		if(!redClicked)
			circleClick();
	}, 10000);
	*/
}, 2000);

var mapSelection, arealSelection, addMore = 1;
var mapPoints = [];
var areaCounter = 0;
var mapArray = [];

function initialSettings(questionId, answer){
	switch (questionId){
		case 1: //--Map seletion type, and opens area selection
			mapSelection = answer;
			document.getElementsByName("open2")[0].click();
			break;
		case 2:	//--Area selection type, and starts manual map selection
			arealSelection = answer;
			if (mapSelection)
				setTimeout(function() {	
					mapPoints[areaCounter] = [];
					document.getElementsByName("open3")[0].click();
				}, 500);
			else{
				var polygon = L.polygon(areaList[0], {color: 'red'}).addTo(map);
				var polygon = L.polygon(areaList[1], {color: 'red'}).addTo(map);
				var polygon = L.polygon(areaList[2], {color: 'red'}).addTo(map);
				var polygon = L.polygon(areaList[3], {color: 'red'}).addTo(map);
				var polygon = L.polygon(areaList[4], {color: 'red'}).addTo(map);
				var polygon = L.polygon(areaList[5], {color: 'red'}).addTo(map);
			}
			break;
		case 3:	//--Manual map selection, and map creation
			// mapPoints.push(tempPoints);
			var polygon = L.polygon(mapPoints[areaCounter], {color: 'red'}).addTo(map);
			polygon.on('click', circleClick);
			mapArray.push(polygon);
			areaCounter++;
			setTimeout(function() {	
				document.getElementsByName("popupCancelArea")[0].click();
			}, 500);
			break;
		case 4:	//--Confirming area selected
			if (answer){
				var numbnerOfPoints = mapPoints[--areaCounter].length;
				mapPoints[areaCounter].pop();
				map.removeLayer(mapArray[areaCounter]);
				mapArray.pop();
				for (var i=0; i<=numbnerOfPoints; i++){
					var circlesArrayLength = circlesArray.length;
					map.removeLayer(circlesArray[--circlesArrayLength]);
					circlesArray.pop();
				}
			}
			document.getElementsByName("open4")[0].click();
			break;
		case 5:	//--Add more map areas
			addMore = answer;
			if (answer){
					mapPoints[areaCounter] = [];
					document.getElementsByName("open3")[0].click();
			}
			break;		
	}
}	
var circlesArray = [];							
map.on("click", function(e) {	
	if(mapSelection && addMore){
		mapPoints[areaCounter].push(e.latlng);
		var circle = L.circle(e.latlng, {color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 30}).addTo(map);		
		circlesArray.push(circle);
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
