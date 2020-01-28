# GPS-Browser-Visualizer
A lightweight tool for visualizing gps trajectory in browser in real time

### Demo
<img src="https://github.com/ziliHarvey/GPS-Browser-Visualizer/blob/master/demo0.gif" width=75% height=75%>

### Dependency
ROS, rosbridge, Mapbox.js, roslibjs

### Install and usage
```
sudo apt-get install ros-melodic-rosbridge-suite
git clone https://github.com/ziliHarvey/GPS-Browser-Visualizer.git
roslaunch rosbridge_server rosbridge_websocket.launch
cd GPS-Browser-Visualizer
google-chrome visualizer.html
cd ../data
rosbag play -r sample_spp.bag
```
