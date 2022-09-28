var map;
function initMap() {
    
    
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom: 7,
        center: chicago
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
}

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
    
    directionsService.route(request, (result, status)=> {
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

var postdata = new FormData();
postdata.append('file', '');
postdata.append('user_id', '');
postdata.append('type', '')



function sendImage() {
    const filePDF = document.getElementById('imageSelect').files[0];
    if (document.getElementById('imageSelect').files.length == 0) {
       console.log('please select image')
    } else {
        postdata.set('file', filePDF);
        postdata.set('type', 'pdffiles')
        $.ajax({
            url: 'http://127.0.0.1:5000/processImage',
            data: postdata, //json
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            type: 'POST',
            success: function (response) {
                console.log(response.file)
                document.getElementById('processedImage').src = response.file
            }
        });
    }

}