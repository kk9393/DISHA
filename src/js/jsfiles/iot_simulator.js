var latitude;
var longitude;

function myMap() {
  var myCenter = new google.maps.LatLng(18.949545, 72.950468);
  var mapCanvas = document.getElementById("map");
  var mapOptions = {center: myCenter, zoom: 10};
  var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({position:myCenter});
  marker.setMap(map);

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

  // Zoom to 9 when clicking on marker
  google.maps.event.addListener(map,'click',function(event) {
    //map.setZoom(9);
    map.setCenter(marker.getPosition());
    latitude = event.latLng.lat();
    longitude = event.latLng.lng();
    placeMarker(event.latLng);
    document.getElementById("mylat").innerHTML = String(latitude);
    document.getElementById("mylong").innerHTML = String(longitude);
  });
}



function IOT_update(){
       var Temp = (Math.random() * (22 - 18) + 18).toFixed(4);
       console.log("temp", Temp);
       document.getElementById("temp").value = String(Temp);

       var Pressure = (Math.random() * (101.5 - 100.95) + 100.95).toFixed(4);
       console.log("Pressure", Pressure);
       document.getElementById("pressure").value = String(Pressure);

       UID_db = document.getElementById("uid_IOT").innerHTML;
       var timestamp = Math.floor((new Date()).getTime() / 1000);

       var obj = new Object();
       obj.uid = UID_db;
       obj.time = timestamp;
       obj.temperature = Temp;
       obj.pressure = Pressure;
       obj.latitude = latitude;
       obj.longitude = longitude;
       console.log("Obj", obj);
       var jsonString= JSON.stringify(obj);
       console.log("jsonString", jsonString);

        var xhr = new XMLHttpRequest();
        var url = "http://localhost:3000/track/";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log("json 4 or 200");
            }
        };

        xhr.send(jsonString);

        //////////////GET/////////////

      /*  var xhr = new XMLHttpRequest();
        var url = "http://localhost:3000/db";
        xhr.open("GET", url, true);
        xhr.onload = function(){

            var ourdata = JSON.parse(xhr.responseText);
            console.log("OUR DATA : ", ourdata);

        };
        xhr.send();*/



       /*var fs = require('fs');
       var UID_tmp = document.getElementById("uid_IOT");
       var filename = UID_tmp.concat(".json");
       console.log("filename", filename);
       //fs.writeFile('myjsonfile.json', json, 'utf8', callback);*/


}

function updateUID(){
    var UID = document.getElementById("uid").value;
    document.getElementById("uid_IOT").innerHTML = UID;
    var myVar = setInterval(IOT_update, 1000);

}

/*
window.addEventListener('load',
  function() {
    //while(true){


       setTimeout(function () {
           //alert('hello!');
           var Temp = (Math.random() * (20 - 18) + 18).toFixed(4);
           console.log("temp", Temp);
           document.getElementById("temp").value = String(Temp);

           var Pressure = (Math.random() * (101.5 - 100.95) + 100.95).toFixed(4);
           console.log("Pressure", Pressure);
           document.getElementById("pressure").value = String(Pressure);
       }, 1000);
    //}
  }, false);*/