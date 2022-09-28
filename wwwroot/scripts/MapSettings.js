var map;
var marker
var originMarker;
var destinationMarker;
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
        //content:"test",
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

function coordinates(param1, param2)
{
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


/*function FetchRawData(param1, param2) {
    var haight = new google.maps.LatLng(37.7699298, -122.4469157);
    var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);

    var request ={
        origin: haight,
        destination: oceanBeach,
        travelMode: google.maps.TravelMode :'DRIVING'
    };

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    directionsService = new google.maps.DirectionsService();

    directionsService.route(request,(response, status)=>{
        if (status == 'OK') {
            directionsRenderer.setDirections(response);
            console.log(result.routes[0].legs[0])
            var checkSteps = result.routes[0].legs[0].steps;
            for (s = 0; s < checkSteps.length; s++) {

                console.log("Startlocation :", checkSteps[s].start_location)
                console.log("endLocation :", checkSteps[s].end_location)

            }
        }
    });
}*/



/////////////////////// Directions ///////////////////////////
function calcRoute() {
    var start = new google.maps.LatLng(37.7699298, -122.4469157);
    var end = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
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
    



    
    
    
