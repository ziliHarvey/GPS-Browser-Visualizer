// gps
var lat = "N/A";
var lng = "N/A";
var center;
var points = 0;
var speed = 0;

// ros
// Connecting to ROS
var ros = new ROSLIB.Ros({
url : 'ws://localhost:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

// map
var layerStyle = "satellite-v8";

// example: https://docs.mapbox.com/mapbox.js/api/v3.2.1/
L.mapbox.accessToken = "<INSERT YOUR MAPBOX API KEY HERE>";
var map = L.mapbox.map('map', null, {minZoom:3})
    .setView([0, 0], 3);
L.control.locate().addTo(map);
var polyline = L.polyline([]).addTo(map);
var layerGroup = L.layerGroup().addTo(map);
layerGroup.addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/" + layerStyle));


function draw() {
    polyline.addLatLng(center);
    if (points == 0) {
        map.setView(center, 20);            
    } else {
        map.setView(center);
    }
    points++;
}

var listener_pos = new ROSLIB.Topic({
    ros : ros,
    name : '/piksi/navsatfix_best_fix',
    messageType : 'sensor_msgs/NavSatFix'
});

var listener_vel = new ROSLIB.Topic({
    ros : ros,
    name : '/piksi/vel_ned',
    messageType : 'piksi_rtk_msgs/VelNed'
});

var listener_status = new ROSLIB.Topic({
    ros : ros,
    name : '/piksi/debug/receiver_state',
    messageType : 'piksi_rtk_msgs/ReceiverState_V2_4_1'
});

listener_pos.subscribe(function(message) {
    lat = message.latitude;
    lng = message.longitude;
    center = L.latLng(lat, lng);
    if (center)
        draw();
    document.getElementById("position").innerHTML = "Latitude:" + lat + " Longitude:" + lng;
});


listener_vel.subscribe(function(message) {
    var vel_n = message.n;
    var vel_e = message.e;
    var vel_d = message.d;
    // km/h speed
    speed = Math.sqrt(vel_n*vel_n + vel_d*vel_d + vel_e*vel_e)*0.0036;
    var cur_color = switchColor(speed);
    polyline.setStyle({color: cur_color});
    document.getElementById("speed").innerHTML = "Speed: " + speed.toPrecision(4) + " Km/h";

});

listener_status.subscribe(function(message) {
    document.getElementById("fix").innerHTML = "Mode: " + message.fix_mode +
                                               "                   Num_sat " + message.num_sat;
})

colors = ['#ffd22b', '#ffb524', '#fe981e', '#f67b18', '#ea6012', '#da460d', '#c62d09', '#ae1705', '#920b00'];
function switchColor(speed) {
    if (speed < 10)
        return colors[0];
    if (speed < 15)
        return colors[1];
    if (speed < 20)
        return colors[2];
    if (speed < 25)
        return colors[3];
    if (speed < 30)
        return colors[4];
    if (speed < 35)
        return colors[5];
    if (speed < 40)
        return colors[6];
    if (speed < 45)
        return colors[7];
    return colors[8];
}

function switchLayer(layerId) {
    if (layerId == 1) {
        layerStyle = "satellite-v8";
    } else {
        layerStyle = "streets-v11";
    }
    layerGroup.clearLayers().addLayer(L.mapbox.styleLayer("mapbox://styles/mapbox/" + layerStyle));
}

var panel = document.getElementsByClassName("panel");
panel[0].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    console.log(content);
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
});
