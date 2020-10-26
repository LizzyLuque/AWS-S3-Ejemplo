//imports  necesarios
const fs = require('fs');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

//importar configuración de Amazon
var {AWS_CONFIG} = require( './global/enviroment');

//inicializamos la interfaz S3 pasandole las claves de acceso
const s3 = new AWS.S3({
    accessKeyId: AWS_CONFIG.ID,
    secretAccessKey: AWS_CONFIG.SECRET
});


 uploadFile= (fileName) =>{
    // Leer el contenido desde el archivo
    const fileContent = fs.readFileSync(fileName);

    // nombre del archivo con el que quieres guardar en  S3
    const file_name = uuidv4();

    //  llenar los parametros para subir S3
    const params = {
        Bucket: AWS_CONFIG.BUCKET_NAME,
        Key: file_name+fileName, 
        Body: fileContent
    };

    // Subir el archivo a S3
    var upload = s3.upload(params);
    return upload.promise();

};

uploadFile('casa.png').then(function(res) { 
    console.log(`Archivo subido correctamente. ${res.Location}`); 
}, function(err) { 
    throw err; 
});



