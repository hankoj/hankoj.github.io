/* JavaScript source code for Comp
 * This code is part of my senior comp project, designing
 * an online campus map for Allegheny College.
 * This code has various modifications from existing projects
 * all made note of in the code. 
 * - Jacob Hanko
*/

var map;
var feature;

var academicBuildingNames = [
    "Alden Hall",
    "Carnegie Hall",
];

var buildingAndBoundsObj = [];

// The markerClusterGroup variable makes use of a Github project made by leaflet
// It is not used in the current version of this map, but left here in case that changes
// and needs to be used.
var academicBuildingMarkers = L.markerClusterGroup({ animateAddingMarkers: false});

var academicMarkerLayerGroup;
var academicMarkersList = [
    ["Alden Hall", 41.64921425, -80.144721481079],
    ["Carnegie Hall", 41.64710705, -80.147352004377],
    ["Carr Hall", 41.65064135, -80.1471706043562]
];

var athleticMarkerLayerGroup;
var athleticMarkersList = [
    ["Wise Center", 41.648545, -80.1424898],
    ["Robertson Complex", 41.6586411, -80.1469044]
];

var dormMarkersLayerGroup;
var dormMarkersList = [
    ["Walker Hall", 41.6496472, -80.147820978719],
    ["North Village II", 41.6506193, -80.1441403090227],
    ["Crawford Hall", 41.6491697, -80.1421374129715]
];

var foodMarkerLayerGroup;
var foodMarkersList = [
    ["Brooks Dining Hall", 41.6492537, -80.1480476],
    ["McKinley's Food Court", 41.64890635, -80.1435965390593]
];

var aldenMarker;

//academic building markers are red
/***********************************************************************************************
 * This portion of code uses the "leaflet-color-markerss" library hosted on github by user
 * pointhi.  This project can be found at "https://github.com/pointhi/leaflet-color-markers".
/***********************************************************************************************/
var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//robertson and the wise center get a green marker
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//dorm markers are blue
var blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//brooks and kins (food places) get orange markers
var orangeIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
/***********************************************************************************************
/***********************************************************************************************/

function initMap() {

    // create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 16, maxZoom: 19, attribution: osmAttrib});

     map = L.map('map', {
        center: [41.64924, -80.14404],
        //41.64923/-80.14535
        zoom: 17,
        zoomControl: false,
        layers: [osm]
    });

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

/*
* This side bar is part of github user "Turbo87"'s "leaflet-sidebar" project.
* The project can be found here at: https://github.com/Turbo87/leaflet-sidebar.
*/
 var sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'left',
            isHidden: false
        });
        map.addControl(sidebar);

        setTimeout(function () {
            sidebar.show();
        }, 100);

var outlinesjson = [{
    "type": "Feature",
    "properties": {
        "name": "Allegheny College"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [-80.149188, 41.647076 ],
        [-80.148747, 41.648273 ],
        [-80.148031, 41.650005 ],
        [-80.148041, 41.650066 ],
        [-80.147631, 41.651098 ],
        [-80.147552, 41.651358 ],
        [-80.147226, 41.652093 ],
        [-80.146230, 41.652296 ],
        [-80.144057, 41.651605 ],
        [-80.143949, 41.651592 ],
        [-80.142564, 41.651896 ],
        [-80.141743, 41.652056 ],
        [-80.141711, 41.652004 ],
        [-80.141883, 41.651790 ],
        [-80.141921, 41.651723 ],
        [-80.141951, 41.651580 ],
        [-80.141915, 41.651402 ],
        [-80.141696, 41.650777 ],
        [-80.141586, 41.650768 ],
        [-80.140967, 41.648390 ],
        [-80.140969, 41.648340 ],
        [-80.141354, 41.647727 ],
        [-80.140257, 41.647487 ],
        [-80.140656, 41.646909 ],
        [-80.142374, 41.646856 ],
        [-80.142960, 41.646801 ],
        [-80.143149, 41.646569 ],
        [-80.143151, 41.646579 ],
        [-80.144060, 41.646853 ],
        [-80.144353, 41.646305 ],
        [-80.146673, 41.647038 ],
        [-80.147042, 41.646378 ]
    ]]}
}, {
    "type": "Feature",
    "properties": {
        "name": "Robertson Complex"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
        [-80.151906, 41.661608 ],
        [-80.143312, 41.661520 ],
        [-80.146380, 41.654554 ],
        [-80.147582, 41.654762 ],
        [-80.150371, 41.654249 ],
        [-80.152045, 41.660397 ]
    ]]}
}];

var myStyle = {
    color: "#102d5b", 
    weight: "1.5",
    opactity: 1.0,
    fillOpacity: 0.0
};

L.geoJSON(outlinesjson, {
    style: myStyle
}).addTo(map);

//var aldenMarker = L.marker([-80.144721481079,41.64921425]).addTo(map);

//console.log(outlinesjson);

//getBuildingsInfo();
//populateMapWithMarkers();
//console.log(academicBuildingMarkers);

// map.addLayer(academicBuildingMarkers);

// for (i=0; i < academicBuildingNames.length; i++)
// {
//     academicBuildingMarkers.addLayer(academicMarkersList[i]);
// }

//hard code markers for a few buildings
//to show what could/should be done automatically
//with the marker cluster code
//trouble with async calls

//academic building markers
//var academicMarkerArray = [];
for (i=0; i<academicMarkersList.length; i++)
{
    var academicMarker = new L.marker([academicMarkersList[i][1], academicMarkersList[i][2]],
    {icon: redIcon})
    .bindPopup("<b>" + academicMarkersList[i][0] + "</b>")
    .addTo(map);

    //academicMarkerArray.push(academicMarker);
}
//console.log(academicMarkerArray);
//academicMarkerLayerGroup = L.layerGroup(academicMarkerArray);
//console.log(academicMarkerLayerGroup);

//athletic building markers
//var athleticMarkerArray = [];
for (i=0; i<athleticMarkersList.length; i++)
{
    var athleticMarker = new L.marker([athleticMarkersList[i][1], athleticMarkersList[i][2]],
    {icon: greenIcon})
    .bindPopup("<b>" + athleticMarkersList[i][0] + "</b>")
    .addTo(map);

    //athleticMarkerArray.push(athleticMarker);
}
//athleticMarkerLayerGroup = L.layerGroup(athleticMarkerArray);

//dorm building markers
//var dormMarkerArray = [];
for (i=0; i<dormMarkersList.length; i++)
{
    var dormMarker = new L.marker([dormMarkersList[i][1], dormMarkersList[i][2]],
    {icon: blueIcon})
    .bindPopup("<b>" + dormMarkersList[i][0] + "</b>")
    .addTo(map);

    //dormMarkerArray.push(dormMarker);
}
//dormMarkersLayerGroup = L.layerGroup(dormMarkerArray);

//food building markers
//var foodMarkerArray = [];
for (i=0; i<foodMarkersList.length; i++)
{
    var foodMarker = new L.marker([foodMarkersList[i][1], foodMarkersList[i][2]],
    {icon: orangeIcon})
    .bindPopup("<b>" + foodMarkersList[i][0] + "</b>")
    .addTo(map);

    //foodMarkerArray.push(foodMarker);
}
//foodMarkerLayerGroup = L.layerGroup(foodMarkerArray);

var typesOfMarkersOverlay = {
    "Academic": academicMarkerLayerGroup,
    "Athletic": athleticMarkerLayerGroup,
    "Dorm": dormMarkersLayerGroup,
    "Food": foodMarkerLayerGroup
};

//console.log(typesOfMarkersOverlay);
//L.control.layers(typesOfMarkersOverlay).addTo(map);

var legend = L.control({position: 'topright'});
var legendLabels = [];
var legendIcons = [];
legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
    legendLabels = [
    "Academic",
    "Athletic",
    "Dormitory",
    "Food"
    ],
    legendIcons = [
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png"
];

    for (i=0; i < legendLabels.length; i++)
    {
        div.innerHTML +=
        (" <img src="+ legendIcons[i] +" height='15' width='15'>") + legendLabels[i] + '<br>';
    }
    return div;

};
legend.addTo(map);

} //end of map initilization

/*
 * The chooseAddr and searchBar functions are modified versions of github user
 * derickr's "osm-tools" project, specifically the "leaflet-nominatim-example" project.
 * The original project can be found at
 * https://github.com/derickr/osm-tools/tree/master/leaflet-nominatim-example
*/
function chooseAddr(lat1, lng1, lat2, lng2, osm_type) {
	var loc1 = new L.LatLng(lat1, lng1);
	var loc2 = new L.LatLng(lat2, lng2);
	var bounds = new L.LatLngBounds(loc1, loc2);

	if (feature) {
		map.removeLayer(feature);
	}
	if (osm_type == "node") {
		feature = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(map);
		//feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(map);        
		map.fitBounds(bounds);
		map.setZoom(18);
	} else {
		var loc3 = new L.LatLng(lat1, lng2);
		var loc4 = new L.LatLng(lat2, lng1);

		feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(map);
		map.fitBounds(bounds);
        map.setZoom(18);
	}
}

function searchBar() {
    var inp = document.getElementById("addr");

    $.getJSON('https://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value + " meadville" + " pa", function(data) {
        var items = [];

        // $.each(data, function(key, val) {
        //     bb = val.boundingbox;
        //     items.push("<li><a href='#' onclick='chooseAddr(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></li>');
        // });

        $.each(data, function(key, val) {
            bb = val.boundingbox;
            chooseAddr(bb[0], bb[2], bb[1], bb[3], val.osm_type);

            items.push("<li><a href='#' onclick='chooseAddr(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  + ", \"" + val.osm_type + "\");return false;'>" + val.display_name.split(',')[0] + '</a></li>');
            //console.log(val.boundingbox);
        });

		$('#results').empty();
        if (items.length != 0) {
            $('<p>', { html: "Search results:" }).appendTo('#results');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#results');
        } else {
            $('<p>', { html: "No results found, please try another search" }).appendTo('#results');
        }
    });
}

/*
 * Custom function to try and use Nomintim to query the building names and return
 * geodata needed for markers.  Currently the markers are hard coded, manually obtaining
 * the information from the same source.
*/

function getBuildingsInfo () {    

    for (i = 0; i < academicBuildingNames.length; i++) {

        $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + academicBuildingNames[i] + " meadville" + " pa", function(data) {
            var items = [];

            $.each(data, function(key, val) {

                if (val.osm_type == "way") {
                    var buildingLat = val.lat;
                    var buildingLng = val.lon;

                    buildingAndBoundsObj.push({
                        name: val.display_name.split(',')[0],
                        lat: buildingLat,
                        lng: buildingLng
                    });

                    //console.log(buildingLat);
                    //console.log(buildingLng);                    
                }
            });

        });

    }

//console.log(buildingAndBoundsObj);
}

//In progress
function populateMapWithMarkers() {
    console.log(academicMarkersList);
    for (i=0; i < academicBuildingNames.length; i++)
    {
        var m = L.marker(buildingAndBoundsObj[i].buildingLat, buildingAndBoundsObj[i].buildingLng);
        console.log(buildingAndBoundsObj[i].buildingLat);
        console.log(buildingAndBoundsObj[i].buildingLng);
        academicMarkersList.push(m);
        academicBuildingMarkers.addLayer(m);

    }
        console.log(buildingAndBoundsObj[i].buildingLat);
}

//In progress
function toggleRed()
{
    map.eachLayer(function (layer) {
        
    });

    console.log(mapMarkers);
}

//loads the map
window.onload = initMap;