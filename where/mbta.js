var redStations = [];
var redBranchAshmont = [];
var redBranchBraintree = [];
var stationArray;

function getLoc(){
var marker;
if (navigator.geolocation) {
    var array = new Array();
    var me;
    navigator.geolocation.getCurrentPosition(function(position) {
     
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    cAndW(lat,lng);
    me = new google.maps.LatLng(lat, lng);
    contents = "<h2>You are here</h2>";
    contents += "<p> Lat: " + lat + "<p> Long: " + lng;
    marker = new google.maps.Marker({
            position: me,
            map: map,
            title:"You"
        });


 stationArray = stations();
  distance = 10000000;
  closest = "";
  for (var m in stationArray) {
       
			slat = stationArray[m].position.lat();
			slng = stationArray[m].position.lng();
                        mlat = lat;
                        mlng = lng;
                        hav = haver(slat,slng,mlat,lng);
                        if(distance > hav){
				distance = hav;
				closest = stationArray[m].title;


}}

contents += "<p> Closest Station: " + closest + "<p> Distance: " + distance + " miles away";

google.maps.event.addListener(marker, 'click', function() {
				tit = contents;
                                loc = this.position;
                                mvcObj = this;
				infowindow.setContent(tit);
			        infowindow.open(map, mvcObj);

});
    map.panTo(marker.getPosition());
    infowindow.setContent(contents);   
    infowindow.open(map, marker);
});



}



}

function haver (slat, slng,mlat,mlng){
Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

var lat2 = slat;
var lon2 = slng;
var lat1 = mlat; 
var lon1 = mlng;

var R = 6371;  
var x1 = lat2-lat1;
var dLat = x1.toRad();  
var x2 = lon2-lon1;
var dLon = x2.toRad();  
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = R * c; 

return d;
}
       

    
var map;
var infowindow;

function initialize() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(42.370, -71.100),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var closest;
  var distance = 100000000;
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  infowindow = new google.maps.InfoWindow();
  myLoc = getLoc();
  stationArray = stations();
  for (var m in stationArray) {
			stationArray[m].setMap(map);
	                        google.maps.event.addListener(stationArray[m], 'click', function() {
					content = "<strong>" + this.title + "</strong>";
                	                mvcObj = this;
					stopId = this.stopId;
				        var request = new XMLHttpRequest();
					request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
       					request.send(null);
					request.onreadystatechange = function callback() {
        					if (request.readyState == 4 && request.status == 200) {
							results = JSON.parse(request.responseText);
							results.sort(predicatBy("TimeRemaining"));
							if (results.length > 0) {

							  content += '<table id="schedule"><tr><th>Line</th><th>Trip #</th><th>Direction</th><th>Time Remaining</th></tr>';
							   for(var r = 0; r < results.length; r++){ 
							      if(results[r].PlatformKey.substring(0,4) == stopId && results[r].PlatformKey.substring(4,5)=="S" &&results[r].TimeRemaining > "00:00:00" ){
							      content += "<tr><td>" + results[r].Line + "</td><td>" + results[r].Trip + "</td><td> South </td><td>" + results[r].TimeRemaining + "</td></tr>";
						
							   }

							    else if(results[r].PlatformKey.substring(0,4) == stopId && results[r].PlatformKey.substring(4,5)=="N"&&results[r].TimeRemaining > "00:00:00"  ){
							      content += "<tr><td>" + results[r].Line + "</td><td>" + results[r].Trip + "</td><td> North </td><td>" + results[r].TimeRemaining + "</td></tr>";
						
							   }
}
							   
								content += '</table>';
infowindow.setContent(content);
			        	infowindow.open(map, mvcObj);
}}}
                                                           }
 							    



					



)}
		redLine = new google.maps.Polyline({
			path: redStations,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 10
		});
		redLine.setMap(map);
		redLineAshmont = new google.maps.Polyline({
			path: redBranchAshmont,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 10
		});
		redLineAshmont.setMap(map);
		redLineBraintree = new google.maps.Polyline({
			path: redBranchBraintree,
			strokeColor: "#FF0000",
			strokeOpacity: 1.0,
			strokeWeight: 10
		});
		redLineBraintree.setMap(map);





}

function cAndW (lat, lng){
	 var request = new XMLHttpRequest();
					request.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
       					request.send(null);
					request.onreadystatechange = function callback() {
        					if (request.readyState == 4 && request.status == 200) {
							results = JSON.parse(request.responseText);
							for(var m in results){
							   if(results[m].name == "Waldo"){
								waldo = new google.maps.LatLng(results[m].loc.latitude, results[m].loc.longitude);
							        marker = new google.maps.Marker({
           							position: waldo,
            							map: map,
								icon: "waldo.png",
            							title:"Waldo"
       								});
								
								google.maps.event.addListener(marker, 'click', function() {
								wlat = waldo.lat();
								wlng = waldo.lng();
								var contents = "You are: " + haver(lat,lng,wlat, wlng) + " miles away from Waldo";

									tit = contents;
                                					loc = this.position;
                                					mvcObj = this;
									infowindow.setContent(tit);
			        					infowindow.open(map, mvcObj);

});

									
								}
								

							
							   if(results[m].name == "Carmen Sandiego"){
								carmen = new google.maps.LatLng(results[m].loc.latitude, results[m].loc.longitude);
							        marker = new google.maps.Marker({
           							position: carmen,
            							map: map,
								icon: "carmen.png",
            							title:"Carmen"
       								});
								google.maps.event.addListener(marker, 'click', function() {
								clat = carmen.lat();
								clng = carmen.lng();
								var contents = "You are: " + haver(lat,lng,clat, clng) + " miles away from Carmen";

									tit = contents;
                                					loc = this.position;
                                					mvcObj = this;
									infowindow.setContent(tit);
			        					infowindow.open(map, mvcObj);

});

}}}}

}


function predicatBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}


function stations(){
  var markers = new Array();
  tico = "tlogo2.png";
  pt = new google.maps.LatLng(42.395428, -71.142483);
				markers.push(new google.maps.Marker({position: pt, stopId:"RALE", title: "Alewife Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.39674, -71.121815);
				markers.push(new google.maps.Marker({position: pt,stopId:"RDAV", title: "Davis Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.3884, -71.119149);
				markers.push(new google.maps.Marker({position: pt, stopId:"RPOR",title: "Porter Square Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.373362, -71.118956);
				markers.push(new google.maps.Marker({position: pt, stopId:"RHAR", title: "Harvard Square Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.365486, -71.103802);
				markers.push(new google.maps.Marker({position: pt,stopId:"RCEN", title: "Central Square Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.36249079, -71.08617653);
				markers.push(new google.maps.Marker({position: pt, stopId:"RKEN", title: "Kendall/MIT Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.361166, -71.070628);
				markers.push(new google.maps.Marker({position: pt, stopId:"RMGH",title: "Charles/MGH Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.35639457, -71.0624242);
				markers.push(new google.maps.Marker({position: pt,stopId:"RPRK", title: "Park St. Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.355518, -71.060225);
				markers.push(new google.maps.Marker({position: pt,stopId:"RDTC", title: "Downtown Crossing Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.352271, -71.055242);
				markers.push(new google.maps.Marker({position: pt,stopId:"RSOU", title: "South Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.342622, -71.056967);
				markers.push(new google.maps.Marker({position: pt,stopId:"RBRO", title: "Broadway Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.330154, -71.057655);
				markers.push(new google.maps.Marker({position: pt,stopId:"RAND", title: "Andrew Station", icon: tico}));
					redStations.push(pt);
				pt = new google.maps.LatLng(42.320685, -71.052391);
				markers.push(new google.maps.Marker({position: pt,stopId:"RJFK", title: "JFK/UMass Station", icon: tico}));
					redStations.push(pt);
					redBranchAshmont.push(pt);
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.275275, -71.029583);
				markers.push(new google.maps.Marker({position: pt, stopId:"RNQU", title: "North Quincy Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.31129, -71.053331);
				markers.push(new google.maps.Marker({position: pt,stopId:"RSAV", title: "Savin Hill Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.300093, -71.061667);
				markers.push(new google.maps.Marker({position: pt,stopId:"RFIE", title: "Fields Corner Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.2665139, -71.0203369);
				markers.push(new google.maps.Marker({position: pt,stopId:"RWOL", title: "Wollaston Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.251809, -71.005409);
				markers.push(new google.maps.Marker({position: pt,stopId:"RQUC", title: "Quincy Center Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.29312583, -71.06573796);
				markers.push(new google.maps.Marker({position: pt,stopId:"RSHA", title: "Shawmut Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.233391, -71.007153);
				markers.push(new google.maps.Marker({position: pt,stopId:"RQUA", title: "Quincy Adams Station", icon: tico}));
					redBranchBraintree.push(pt);
				pt = new google.maps.LatLng(42.284652, -71.064489);
				markers.push(new google.maps.Marker({position: pt,stopId:"RASH", title: "Ashmont Station", icon: tico}));
					redBranchAshmont.push(pt);
				pt = new google.maps.LatLng(42.2078543, -71.0011385);
				markers.push(new google.maps.Marker({position: pt,stopId:"RBRA", title: "Braintree Station", icon: tico}));
					redBranchBraintree.push(pt);


 return markers; 

}

function loadScript(){
  var js = document.createElement("script");

  js.type = "text/javascript";
  js.src= "http://maps.google.com/maps/api/js?sensor=true&callback=initialize";

  document.body.appendChild(js);
}
window.onload=loadScript,getLoc;



