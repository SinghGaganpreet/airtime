// initialize the map on the "map" div with a given center and zoom
var map = new L.Map('map', {
  zoom: 14,
  minZoom: 14,
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




var plane = L.icon({iconUrl: 'planeB.png', iconSize: [40, 40], iconAnchor: [20, 20]});
var uavB = L.icon({iconUrl: 'uavB.png', iconSize: [30, 30], iconAnchor: [15, 15]}); 
var uavG = L.icon({iconUrl: 'uavG.png', iconSize: [30, 30], iconAnchor: [15, 15]}); 
var uavR = L.icon({iconUrl: 'uavR.png', iconSize: [30, 30], iconAnchor: [15, 15]}); 


var panda = L.icon({iconUrl: 'panda.png', iconSize: [50, 50], iconAnchor: [0, 0], popupAnchor: [25, 0]});

//map.fitBounds(londonParisRomeBerlinBucarest);
map.fitBounds(toulouse);
//map.panTo(toulouse);

//========================================================================
/*
var marker1 = L.Marker.movingMarker(parisKievLL, [10000], {icon: uav}).addTo(map);
L.polyline(parisKievLL).addTo(map);
marker1.once('click', function () {
    marker1.start();
    marker1.closePopup();
    marker1.unbindPopup();
    marker1.on('click', function() {
        if (marker1.isRunning()) {
            marker1.pause();
        } else {
            marker1.start();
        }
    });
    setTimeout(function() {
        marker1.bindPopup('<b>Click me to pause !</b>').openPopup();
    }, 2000);
});

marker1.bindPopup('<b>Click me to start !</b>', {closeOnClick: false});
marker1.openPopup();
*/
//========================================================================

/*
var marker2 = L.Marker.movingMarker(londonParisRomeBerlinBucarest,
    [3000, 9000, 9000, 4000], {icon: plane, autostart: true}).addTo(map);
L.polyline(londonParisRomeBerlinBucarest, {color: 'red'}).addTo(map);


marker2.on('end', function() {
    marker2.bindPopup('<b>Welcome to Bucarest! My friend.</b>', {closeOnClick: false})
    .openPopup();
});
*/
//=========================================================================
/*
var marker3 = L.Marker.movingMarker(londonBrusselFrankfurtAmsterdamLondon,
    [2000, 2000, 2000, 2000], {icon: uav, autostart: true, loop: true}).addTo(map);

marker3.loops = 0;
marker3.bindPopup('', {closeOnClick: false});
*/

//=========================================================================


var markerPlane = L.Marker.movingMarker(planeRotation, [15000, 15000, 15000, 15000, 15000, 15000, 15000, 15000], {icon: plane,  autostart: true, loop: true, zIndexOffset: 10000}).addTo(map);

var markerPanda = L.Marker.movingMarker([[43.58064, 1.454058]], [], {icon: panda}).addTo(map);
var uavR = L.Marker.movingMarker([[43.592156, 1.458603+0.01]], [], {icon: uavR}).addTo(map);
var uavG = L.Marker.movingMarker([[43.592156, 1.458603-0.01]], [], {icon: uavG}).addTo(map);
var uavB = L.Marker.movingMarker([[43.592156, 1.458603]], [], {icon: uavB}).addTo(map);

var circleR = L.circle([43.62365, 1.385457], {color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 1800});
var circleG = L.circle([43.62365, 1.41951], {color: 'green', fillColor: '#09ff00', fillOpacity: 0.5, radius: 1800 });
var circleB = L.circle([43.599876, 1.385457], {color: 'blue', fillColor: '#006bff', fillOpacity: 0.5, radius: 1800 });

var uavRedStarted = false;
var uavGreenStarted = false;
var uavBlueStarted = false;

var keysR = [];
var valuesR = [];
var popupArrayR = [];
var eventCounterR = 1;

var keysG = [];
var valuesG = [];
var popupArrayG = [];
var eventCounterG = 1;

var keysB = [];
var valuesB = [];
var popupArrayB = [];
var eventCounterB = 1;

//-----Click event handler for Yes and No button of popups-----//
function yesNoButtonClickR(eventNumber, buttonClicked) {   
	if (buttonClicked == 1){
		keysR.push(eventNumber);
		valuesR.push(1);
		map.removeLayer(popupArrayR[eventNumber-1]);
	}
	else if (buttonClicked == 0){
		keysR.push(eventNumber);
		valuesR.push(0);
		map.removeLayer(popupArrayR[eventNumber-1]);
	}
}

function yesNoButtonClickB(eventNumber, buttonClicked) {   
	if (buttonClicked == 1){
		keysB.push(eventNumber);
		valuesB.push(1);
		map.removeLayer(popupArrayB[eventNumber-1]);
	}
	else if (buttonClicked == 0){
		keysB.push(eventNumber);
		valuesB.push(0);
		map.removeLayer(popupArrayB[eventNumber-1]);
	}
}

function yesNoButtonClickG(eventNumber, buttonClicked) {   
	if (buttonClicked == 1){
		keysG.push(eventNumber);
		valuesG.push(1);
		map.removeLayer(popupArrayG[eventNumber-1]);
	}
	else if (buttonClicked == 0){
		keysG.push(eventNumber);
		valuesG.push(0);
		map.removeLayer(popupArrayG[eventNumber-1]);
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

//--Make plane rotate in circle and keep changing its angle with respect to direction of motion
var nextPositionOfPlane = 1;
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
	if (uavRedStarted && uavR.isEnded())
	{
		var formData = '<img id="image" src="./carImg.jpg" width="70" height="70" /> </br>'+
							'<button  onclick="yesNoButtonClickR(' + eventCounterR +',1)">Yes</button>&nbsp'+
							'<button  onclick="yesNoButtonClickR(' + eventCounterR +',0)">No</button>' ;
		var popup= L.popup({closeOnClick: false, autoClose: false})
						.setLatLng(wayPointsForRed[eventCounterR-1])
						.setContent(formData)
						.addTo(map);						
		popupArrayR.push(popup);													
		if(eventCounterR == 10)
		{
			uavRedStarted = false;
		}
		else
		{
			uavR.moveTo(wayPointsForRed[eventCounterR],20000);
			eventCounterR++;
		}
	}	
	
	//-----Green UAV movement settings-----//
	if (uavGreenStarted && uavG.isEnded())
	{
		var formData = '<img id="image" src="./carImg.jpg" width="70" height="70" /> </br>'+
							'<button  onclick="yesNoButtonClickG(' + eventCounterG +',1)">Yes</button>&nbsp'+
							'<button  onclick="yesNoButtonClickG(' + eventCounterG +',0)">No</button>' ;
		var popup= L.popup({closeOnClick: false, autoClose: false})
						.setLatLng(wayPointsForGreen[eventCounterG-1])
						.setContent(formData)
						.addTo(map);						
		popupArrayG.push(popup);													
		if(eventCounterG == 10)
		{
			uavGreenStarted = false;
			return;
		}
		else
		{
			uavG.moveTo(wayPointsForGreen[eventCounterG],20000);
			eventCounterG++;
		}
	}
	
	//-----Blue UAV movement settings-----//
	if (uavBlueStarted && uavB.isEnded())
	{
		var formData = '<img id="image" src="./carImg.jpg" width="70" height="70" /> </br>'+
							'<button  onclick="yesNoButtonClickB(' + eventCounterB +',1)">Yes</button>&nbsp'+
							'<button  onclick="yesNoButtonClickB(' + eventCounterB +',0)">No</button>' ;
		var popup= L.popup({closeOnClick: false, autoClose: false})
						.setLatLng(wayPointsForBlue[eventCounterB-1])
						.setContent(formData)
						.addTo(map);						
		popupArrayB.push(popup);													
		if(eventCounterB == 10)
		{
			uavBlueStarted = false;
			return;
		}
		else
		{
			uavB.moveTo(wayPointsForBlue[eventCounterB],20000);
			eventCounterB++;
		}
	}
	
	
});

redClicked = false;
greenClicked = false;
blueClicked = false;



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

uavR.on('click', function(e){
	uavR.bindPopup('Yes!').openPopup();	
	redClicked = true;
});

uavG.on('click', function(e){
	uavG.bindPopup('Yes!').openPopup();	
	greenClicked = true;
});


uavB.on('click', function(e){
	uavB.bindPopup('Yes!').openPopup();	
	blueClicked = true;
});

var circles = [];
var latRoot = 43.62365;
var lngRoot = 1.385457;
var latIncrement = 0.023774;
var lngIncrement = 0.034053;
var newLat = latRoot;
var newLng = lngRoot;
//-----Lng difference 0,034053

setTimeout(function() {
	
	for (var i = 0; i < 10; i++)
	{		
		var circle = L.circle([newLat, newLng], {color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 1800});		
		circle.addTo(map);
		if ( i < 4 || i > 4)
			newLng += lngIncrement;
		else if ( i == 4 )
		{
			newLat -= latIncrement;
			newLng = lngRoot;
		}
	}
	//circleR.addTo(map);
	markerPanda.bindPopup('<div style="text-align:justify; color:gray; font-weight: 600">Click on the <span style="color:red">Red UAV</span> and then on <span style="color:red">Red Circle</span>. To search that area.</div>').openPopup();		
		
	setTimeout(function() {
		if(!redClicked)
			circleRClick();
	}, 10000);

}, 2000);
/*markerPlane.on('loop', function(e) {		
	ss += markerPlane.getLatLng() +', ' +e.latlng +'\n';
    markerPlane.loops++;
    if (e.elapsedTime < 50) {
        marker3.getPopup().setContent("<b>Loop: " + marker3.loops + "</b>")
        marker3.openPopup();
        setTimeout(function() {
            marker3.closePopup();

            if (! marker1.isEnded()) {
                marker1.openPopup();
            } else {
                if (markerPlane.getLatLng().equals([45.816667, 15.983333])) {
                    markerPlane.bindPopup('Click on the map to move me !');
                    markerPlane.openPopup();
                }

            }

        }, 2000);
    }

	});
*/

///--To show image in leaflet popup and show zoomed version on clicking
//--https://stackoverflow.com/questions/24172743/issue-with-launching-jquery-ui-dialog-box-in-leaflet-maps-popup

								//'<script>'+
								//'$(document).ready(function(){'+
								//'$("#test-form").inlineFormValues();'+
								//'});'+
								//'</script>
								
								//'document.addEventListener("DOMContentLoaded", function () {'+
								//'document.getElementById("create-user").addEventListener("click", function () {'+
								//'alert("Your book is overdue");'+
								//'});'+
								//'});'+
								//'</script>
								//'e.preventDefault();'+
								
								//the .on() here is part of leaflet

								
//var imageHtml = $('<img id="image" src="./carImg.jpg" width="70" height="70" /> </br>');
/*var linkYes = '<a href="#" class="speciallink">TestLink</a>.click(function() { alert("test"); })';
*/						

///---Working example for button click 
/*var popup = L.popup({closeOnClick: false, autoClose: false})
			.setLatLng([43.592156, 1.658603])
			.setContent('<button onclick="myFunction(1,1)">Yes</button>&nbsp<button onclick="myFunction(1,0)">No</button>&nbsp<button onclick="myFunction(1,3)">Else</button>')
			.addTo(map);
			
var popup = L.popup({closeOnClick: false, autoClose: false})
			.setLatLng([43.592156, 1.108603])
			.setContent('<button onclick="myFunction(2,1)">Yes</button>&nbsp<button onclick="myFunction(2,0)">No</button>&nbsp<button onclick="myFunction(2,3)">Else</button>')
			.addTo(map);
			
function myFunction(a,b) {
    //var x = document.getElementById("btn1").name;
	if (b == 1)
		alert("Yes clicked by: " +a);
	else if (b == 0)
		alert("No clicked by: " +a);
	else
		alert(a);
}
*/

//43.606189, 1.448479
//43.606748, 1.458607

							
map.on("click", function(e) {	
	alert(' ' + e.latlng);
	/*
	
	var angle = angleBetweenCoordinates(markerPlane.getLatLng(), planeRotation[nextPositionOfPlane]);
	//markerPlane.setRotationAngle(angle);	
    //markerPlane.moveTo(e.latlng, 10000);
	
	//uav2.moveTo([e.latlng.lat-0.01, e.latlng.lng-0.01],10000);
	
	//markerPlane.bindPopup('I am moving :D', {closeOnClick: false, autoClose: false});
	//markerPlane.openPopup();
	*/
});


//=========================================================================
/*
var marker5 = L.Marker.movingMarker(
    barcelonePerpignanPauBordeauxMarseilleMonaco,
    10000, {icon: uav, autostart: true}).addTo(map);

marker5.addStation(1, 2000);
marker5.addStation(2, 2000);
marker5.addStation(3, 2000);
marker5.addStation(4, 2000);

L.polyline(barcelonePerpignanPauBordeauxMarseilleMonaco,
    {color: 'green'}).addTo(map);*/
