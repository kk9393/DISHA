var uniqueidid;
var temp_tmp;
var time_tmp;
var pressure_tmp;

function getTimeValue() {
  var dateBuffer = new Date();
  var Time = dateBuffer.getTime();
 // var d = new Date("2011-04-20T09:30:51.01");
  return Time;
}

function setUID(){
  console.log("Confirm button is pressed0");
    uniqueidid = document.getElementById("uniqueidid").value;
    var myvar = setInterval(updateGraph,1000);

    /////////////////////////////temp///////////////////////////////////
    tempChartInstance.getVisibleLayers()[0].className = "layer category2";
    tempChartInstance.redraw();
    ///////////////////////////temp end/////////////////////////////////

    /////////////////////////////pressure///////////////////////////////////
    pressureChartInstance.getVisibleLayers()[0].className = "layer category3";
    pressureChartInstance.redraw();
    ///////////////////////////pressure end/////////////////////////////////
}
////////////// this function generates a random value ////////////////////////////
function getLatestValue() {

    console.log("UID temp", uniqueidid);

    url = 'http://localhost:3000/track/';
    url = url.concat('?uid=');
    url = url.concat(uniqueidid);
    console.log(url);
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);
    ourRequest.onload = function(){
        var ourdata = JSON.parse(ourRequest.responseText);
        console.log("GET DATA : ", ourdata);
        ourdata_latest = ourdata[ourdata.length-1];
        console.log("GET DATA LATEST: ", ourdata_latest);
        console.log(ourdata_latest.temperature);
        temp_tmp = ourdata_latest.temperature;
        time_tmp = ourdata_latest.time;
        pressure_tmp = ourdata_latest.pressure;
        console.log("time_tmp : ", time_tmp);
        console.log("temp_tmp0 : ", temp_tmp);
        console.log("pressure_tmp : ", pressure_tmp);
      }
     ourRequest.send();


}

////////////// this function is used to update the chart values /////////////// 
function updateGraph() {
  getLatestValue();

  ////////////////////temp///////////////////////////
  var newTempChartData = [{time: time_tmp , y:temp_tmp}];
  tempChartInstance.push(newTempChartData);
  ////////////////temp end/////////////////////////////

  ////////////////////pressure///////////////////////////
  var newPressureChartData = [{time: time_tmp , y:pressure_tmp}];
  pressureChartInstance.push(newPressureChartData);
  ////////////////pressure end/////////////////////////////
}

//////////////////////////temp/////////////////////////////////
var tempChartData = [{
  label: "Layer 1",
  values: [{
    time: Math.floor((new Date()).getTime() / 1000),
    y: temp_tmp
  }]
}, ];

var tempChartInstance = $('#tempChart').epoch({
  type: 'time.bar',
  axes: ['right', 'bottom', 'left'],
  data: tempChartData
});
///////////////////////temp end//////////////////////////////

//////////////////////////pressure/////////////////////////////////
var pressureChartData = [{
  label: "Layer 1",
  values: [{
    time: Math.floor((new Date()).getTime() / 1000),
    y: pressure_tmp
  }]
}, ];

var pressureChartInstance = $('#pressureChart').epoch({
  type: 'time.line',
  axes: ['right', 'bottom', 'left'],
  data: pressureChartData
});
///////////////////////pressure end//////////////////////////////

