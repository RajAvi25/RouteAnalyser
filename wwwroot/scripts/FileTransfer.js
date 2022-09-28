///////////////////// API /////////////////////////

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
