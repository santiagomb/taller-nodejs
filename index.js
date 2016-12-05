var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var mu = require("mu2"); // mustach2

/*
server.on("req", function(req, res){
	var urlData = url.parse(req.url, true);
	//var date = new Date();
	//res.end(JSON.stringify(date));
	
	// poner en browser localhost:3000/recurso/sub?id=1) y ver el json que retorna
	res.end(JSON.stringify(urlData));
});*/

var err = '404.html';
var userCount = 0;

function send404(res){
  res.writeHead(302, {Location: err});
  res.end();	
}

function sendPage(res, filePath, fileContents) {
  res.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  res.end(fileContents);
}

function sendStats(res, urlData){
  console.log('asd');
  res.end(JSON.stringify(urlData));  
}

function serverWorking(res, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(res)
        } else {
          sendPage(res, absPath, data);
        }
      });
    } else {
      send404(res);
    }
  });
}

var server = http.createServer(function(req, res) {
  var filePath = false;
  var urlData = url.parse(req.url,true);
  //console.log(urlData);

  if (urlData.pathname == '/') {
    filePath = "public/index.html";
    // sumo una visita y guardo su ip
    userCount++;
    console.log(req.connection.remoteAddress);
  } else if (urlData.pathname == '/stats' &&
              urlData.query.user == 'ADMIN' && urlData.query.pass == 'ADMIN'){ sendStats(res, urlData);
  } else {
    filePath = "public" + req.url;
  }
  var absPath = "./" + filePath;
  serverWorking(res, absPath);
});

server.listen(process.env.PORT || 3000);