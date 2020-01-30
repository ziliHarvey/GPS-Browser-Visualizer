# GPS-Browser-Visualizer
A lightweight tool for visualizing gps trajectory in browser in real time.

### Demo
<img src="https://github.com/ziliHarvey/GPS-Browser-Visualizer/blob/master/demo1.gif" width=75% height=75%>

### Dependency
**Required**:
[ROS](https://www.ros.org/), [rosbridge](http://wiki.ros.org/rosbridge_suite/Tutorials/RunningRosbridge), [Mapbox.js](https://docs.mapbox.com/mapbox.js/api/v3.2.1/), [roslibjs](http://wiki.ros.org/roslibjs), and [openstreetmap](https://www.openstreetmap.org).  
**Optional**:
[Swift ROS SDK](https://support.swiftnav.com/customer/en/portal/articles/2924342-using-ros-with-swift-navigation-gnss-devices), which isn't required for visualizing trajectory, is used to display speed and states. 

### Data
All bags are collected around CMU neighborhood using a [Swift GNSS Receiver](https://www.swiftnav.com/duro) with RTK enabled.

### Install and usage
Insert your mapbox api key [here](https://github.com/ziliHarvey/GPS-Browser-Visualizer/blob/master/js/visualizer.js#L30), and then
```
sudo apt-get install ros-melodic-rosbridge-suite
git clone https://github.com/ziliHarvey/GPS-Browser-Visualizer.git
roslaunch rosbridge_server rosbridge_websocket.launch
cd GPS-Browser-Visualizer
google-chrome visualizer.html
cd ../data
rosbag play sample0.bag
```
### Acknowledgement
Welcome to use this tool for your research work, and just please cite this repo if it's helpful :)
