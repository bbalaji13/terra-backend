const express = require('express');
const config = require('./server/config/config');


const app = express();
/* Enable developer logs */
/* Initialize body parser */
app.use(express.json());
app.use(express.urlencoded({extended:true}));


/* Enable CORS*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,authorization,Content-Type,Access-Control-Request-Headers,enctype');
    // Set to true if you need the website to include cookies in  requests
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log("method type", req.method);
    if (req.method === 'OPTIONS') {
        console.log("going to options")
        res.status(200);
        res.end();
    } else {
        // Pass to next layer of middleware
        next();
    }
});
/* Intializing routes */

app.get('/', (req, res) => {   res.send('Hello, Express2!'); });

app.use('/node-express/api/', require("./server/routes"));
app.use("/",require("./server/routes"))
app.use((error, req, res, next) => {
    console.log("Error", error)
    if (error.isBoom) {
       // console.log('error', error);
        let obj = {
            err:"Bad Request",
            msgs:[],
            errorPaths:[]
        };

        if (error.data.length) {
            error.data.forEach(element => {
                obj.msgs.push(element.message);
                obj.errorPaths.push(element.path);
            });
        }

        return res.status(error.output.statusCode).json(obj);
    }
    res.status(error.status || 500);
    res.json({ success: false, data: null, msg: "Request is not processing" });
});

app.listen(config.port);
console.log(`Server started on port :${config.port} with ${process.env.NODE_ENV}  mode `);

module.exports = app; // for testing

