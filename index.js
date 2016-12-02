var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var mu = require("mu2"); // mustach2
var express = require('express');
var app = express();

/*var server = http.createServer();

server.on("request", function(req, res){
	var urlData = url.parse(req.url, true);
	//var date = new Date();
	//res.end(JSON.stringify(date));
	
	// poner en browser localhost:3000/recurso/sub?id=1) y ver el json que retorna
	res.end(JSON.stringify(urlData));
});*/

var err = '404.html';
var userCount = 0;


function send404(response){
  response.writeHead(302, {Location: err});
  response.end();	
}

function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = "public/index.html";
    userCount++;
    console.log(request.connection.remoteAddress);
  } else {
    filePath = "public" + request.url;
  }
  var absPath = "./" + filePath;
  serverWorking(response, absPath);
});

server.listen(process.env.PORT || 3000);