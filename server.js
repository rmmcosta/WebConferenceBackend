const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;

const express = require('express');
const app = express();

const cors = require('cors');

//create a virtual path prefix (where the path does not actually exist in the file system) 
//for files that are served by the express.static function, 
//specify a mount path for the static directory:

app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

//restrict access with cors()
//Configuring CORS w/ Dynamic Origin
const whitelist = ['localhost','127.0.0.1','109.49.176.10'];
const corsOptions = {
    origin: function(origin, callback) {
        console.log(origin);
        let isFromWhiteOrigin = origin===undefined || whitelist.indexOf(origin)>-1;
        if(isFromWhiteOrigin) {
            //callback with signature function(req,res)
            callback(null,true);
        } else {
            callback(new Error('Not allowed by CORS!'));
        }
    }
};

//use cors
 app.use(cors(corsOptions));

//start the app on the given port
const listenHandler = (err) => {
    if(err){
        console.log(err);
    } else {
        console.log(`Web conference up and running on ${host}:${port}`);
    }
}

app.listen(port,listenHandler);

module.exports = app;
require('./loader');

