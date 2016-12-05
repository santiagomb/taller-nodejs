var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var mu = require("mu2");

var err = '404.html';
var visitas = [];

function send404(res){
  res.writeHead(302, {Location: err});
  res.end();	
}

function sendPage(res, filePath, fileContents) {
  res.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  res.end(fileContents);
}

function sendStats(res, urlData){
  res.end(JSON.stringify(visitas));  
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

function registrarIP(ip){
  var existeIP;
  for (var i = 0; i < visitas.length; i++) {
    console.log(visitas[i].IP);
    if (visitas[i].IP == ip){
      visitas[i].Visitas++;
      existeIP = true;
    }
  }
  if(!existeIP) visitas.push({"IP": ip, "Visitas": 1});  
}

var server = http.createServer(function(req, res) {
  var filePath = false;
  var urlData = url.parse(req.url,true);

  if (urlData.pathname == '/') {
    filePath = "public/index.html";
    // sumo una visita y guardo su ip
    var ip = req.connection.remoteAddress;
    registrarIP(ip);

  } else if (urlData.pathname == '/stats' &&
              urlData.query.user == 'ADMIN' && urlData.query.pass == 'ADMIN'){
    // muestro las visitas 
    sendStats(res, urlData);

  } else {
    filePath = "public" + req.url;
  }
  var absPath = "./" + filePath;
  serverWorking(res, absPath);
});

server.listen(process.env.PORT || 3000);