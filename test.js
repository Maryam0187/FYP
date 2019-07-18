/*eslint-env node*/
(function() {
    'use strict';



    var express = require('express');
    var compression = require('compression');
    var url = require('url');
    var request = require('request');
    const fs = require('fs');


    var yargs = require('yargs').options({
        'port' : {
            'default' : 3000,
            'description' : 'Port to listen on.'
        },
        'public' : {
            'type' : 'boolean',
            'description' : 'Run a public server that listens on all interfaces.'
        },
        'help' : {
            'alias' : 'h',
            'type' : 'boolean',
            'description' : 'Show this help.'
        }
    });
    var argv = yargs.argv;

    if (argv.help) {
        return yargs.showHelp();
    }

    // eventually this mime type configuration will need to change
    // https://github.com/visionmedia/send/commit/d2cb54658ce65948b0ed6e5fb5de69d022bef941
    // *NOTE* Any changes you make here must be mirrored in web.config.
    var mime = express.static.mime;
    mime.define({
        'application/json' : ['czml', 'json', 'geojson', 'topojson'],
        'image/crn' : ['crn'],
        'image/ktx' : ['ktx'],
        'model/gltf+json' : ['gltf'],
        'model/gltf.binary' : ['bgltf', 'glb'],
        'text/plain' : ['glsl']
    });

    var app = express();
    app.use(compression());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(express.static(__dirname));

    function getRemoteUrlFromParam(req) {
        var remoteUrl = req.params[0];
        if (remoteUrl) {
            // add http:// to the URL if no protocol is present
            if (!/^https?:\/\//.test(remoteUrl)) {
                remoteUrl = 'http://' + remoteUrl;
            }
            remoteUrl = url.parse(remoteUrl);
            // copy query string
            remoteUrl.search = url.parse(req.url).search;
        }
        return remoteUrl;
    }

   

    var server = app.listen(argv.port, argv.public ? undefined : 'localhost', function() {
        if (argv.public) {
            console.log('Recursive learning server running.  Connect to http://localhost:%d/', server.address().port);
        } else {
            console.log('Recursive learning server running.  Connect to http://localhost:%d/', server.address().port);
        }
    });   

//For testing the connection
    app.get('/test/', function(req, res){
          res.send("Server running");

    });

 

//for getting kmlfile , writing it and  printing it
	app.post('/filedata/', function(req, res){
	       
		   
		   req.on('data', function(chunk) {
                var filedata=chunk.toString();
                var obj=JSON.parse(filedata);

                console.log(obj.textdata);
                console.log(obj.name);
                filedata=obj.textdata;
                var file=obj.name+".txt";


	            fs.writeFile("./mycodes/"+file, filedata, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    console.log("The file was saved!");
				}); 

	        res.send('Connected!');
	        console.log('Success');

	    });

	});
    //====================================================================//
    //============ Code to receive data from server ======================//
    //====================================================================//

    server.on('error', function (e) {
        if (e.code === 'EADDRINUSE') {
            console.log('Error: Port %d is already in use, select a different port.', argv.port);
            console.log('Example: node server.js --port %d', argv.port + 1);
        } else if (e.code === 'EACCES') {
            console.log('Error: This process does not have permission to listen on port %d.', argv.port);
            if (argv.port < 1024) {
                console.log('Try a port number higher than 1024.');
            }
        }
        console.log(e);
        process.exit(1);
    });

    server.on('close', function() {
        console.log('server stopped.');
    });

    var isFirstSig = true;
    process.on('SIGINT', function() {
        if (isFirstSig) {
            console.log('server shutting down.');
            server.close(function() {
              process.exit(0);
            });
            isFirstSig = false;
        } else {
            console.log('server force kill.');
            process.exit(1);
        }
    });


})();



