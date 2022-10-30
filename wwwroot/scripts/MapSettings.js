/////////////// Initialize Map/////////////////
var map;
var marker
var originMarker;
var destinationMarker;
var startSet;
var endSet;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 55.759086, lng: 12.250580, },
        disableDefaultUI: true,
    })

        ;

     marker = new google.maps.Marker({
        position: (new google.maps.LatLng(55.759086, 12.250580)),
        title: "Hello World!"
    });

    marker.setMap(map);

    const infowindow = new google.maps.InfoWindow({
        maxWidth: 4000
    });

    infowindow.setContent("<h>test</h>");

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });
}



function TestFunction(param1, param2)
{
    
    marker.setMap(null);
    var param1Arr = param1.split(',')
  

    testmarker = new google.maps.Marker({
        position: (new google.maps.LatLng(param1Arr[0], param1Arr[1])),
        title: "testing!"
    });

    testmarker.setMap(map);

    alert(param1);
   
    
    
}






/////////////////////// Directions ///////////////////////////



function calcRoute(param1, param2) {
    console.log(startSet, endSet)
    var param1Arr = startSet.split(',')
    var param2Arr = endSet.split(',')
    var start = new google.maps.LatLng(param1Arr[0], param1Arr[1]);
    var end = new google.maps.LatLng(param2Arr[0], param2Arr[1])
    //var start = new google.maps.LatLng(37.7699298, -122.4469157);
    //var end = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
  /*  marker.setMap(null);*/
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService.route(request, (result, status) => {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
            console.log(result.routes[0].legs[0])
            var checkSteps = result.routes[0].legs[0].steps;
            for (s = 0; s < checkSteps.length; s++) {

                console.log("Startlocation :", checkSteps[s].start_location)
                console.log("endLocation :", checkSteps[s].end_location)

            }

        }
    });
}

function coordinates(param1, param2) {
    var param1Arr = param1.split(',')
    var param2Arr = param2.split(',')
    var originLatLng = new google.maps.LatLng(param1Arr[0], param1Arr[1]);
    var destinationLatLng = new google.maps.LatLng(param2Arr[0], param2Arr[1])

    marker.setMap(null);

    originMarker = new google.maps.Marker({
        position: (originLatLng),
        title: "Point of Origin!"
    });
    destinationMarker = new google.maps.Marker({
        position: (destinationLatLng),
        title: "Point of Destination!"
    });

    originMarker.setMap(map);
    destinationMarker.setMap(map);
}
const center = { lat: 50.064192, lng: -130.605469 };
// Create a bounding box with sides ~10km away from the center point
const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
};


const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
};

var temp="pre-function";

function StartSelect() {
    const input = document.getElementById('From')
    Autocomplete(input, 0)
}
function ENDSelect() {
    const input = document.getElementById('To')
    Autocomplete(input, 1)
}
function Autocomplete(param, id) {

    /*alert(document.getElementById(param).value)*/
    /*    console.log(document.getElementById('setvalue').value)*/
    console.log(param)
    const input = param;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);
    // Specify just the place data fields that you need.
    autocomplete.setFields(["place_id", "geometry", "name", "formatted_address"]);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");

    infowindow.setContent(infowindowContent);

    const geocoder = new google.maps.Geocoder();
    const marker = new google.maps.Marker({ map: map });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
    autocomplete.addListener("place_changed", () => {
        infowindow.close();

        const place = autocomplete.getPlace();

        if (!place.place_id) {
            return;
        }
        console.log(place,place.geometry.location.lat, place.geometry.location.lng);
        if (id == 0) {
            startSet = place.geometry.location.lat() + "," +place.geometry.location.lng();
        }
        else {
            endSet = place.geometry.location.lat() + "," + place.geometry.location.lng();
        }
        new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            map: map
        })

    });
    /*temp = new google.maps.places.Autocomplete(document.getElementById('setvalue').value, options)*/
    console.log(autocomplete)
}


function setElementById(param1) {
    element = document.getElementById(param1).value
    return element
   }

/*
var from_Location = getElementById("From")
var from_autocomplete = new google.maps.places.Autocomplete(from_Location,options)

var destination_Location = getElementById("To")
var destination_autocomplete = new google.maps.places.Autocomplete(destination_Location, options)
*/



    
    
    
