var fileResult;

App = {

    fileResult: null,
    fileName: null,

    captureFile: function(event) { 
        debugger;               
        const file = event.files[0]
        fileName = file.name;
        let reader = new window.FileReader()        
        reader.readAsDataURL(file);   
        reader.onloadend = () => {    
            console.log(file);        
            fileResult = reader.result;
        }
    },

    onSubmit: function(e) {
        var form_data = new FormData();
        form_data.append("content", fileResult);
        form_data.append("name", fileName);        
        console.log(fileResult);

        $.ajax({
            type: 'POST',
            async: false,
            cache: false,            
            url: "http://localhost:3000/uploadToIpfs", 
            data: form_data,
            processData: false,
            contentType: false, //'multipart/form-data',
            success: function(result) {
                debugger;
                console.log(result);
            },
            error: function(err) {
                debugger;
                console.log(err);
            }
        });
    }

    // convertToBuffer = async(reader) => {
    //     debugger;
    //     //file is converted to a buffer for upload to IPFS
    //       const buffer = await Buffer.from(reader.result);
    //     //set this buffer -using es6 syntax          
    // }

}