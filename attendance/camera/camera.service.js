const cameras = await Html5Qrcode.getCameras();

let cameraId = null;

// Ưu tiên camera sau
const back = cameras.find(c =>
    /back|rear|environment/i.test(c.label)
);

if(back){

    cameraId = back.id;

}else{

    cameraId = cameras[0].id;

}

await scanner.start(

    cameraId,

    {

        fps:10,

        qrbox:{
            width:250,
            height:250
        },

        aspectRatio:1,

        disableFlip:false

    },

    onSuccess,

    ()=>{}

);
