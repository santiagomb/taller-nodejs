var http = require("http");
var url = require("url");

var server = http.createServer();

server.on("request", function(req, res){
	var urlData = url.parse(req.url, true);
	//var date = new Date();
	//res.end(JSON.stringify(date));
	
	// poner en browser localhost:3000/recurso/sub?id=1) y ver el json que retorna
	res.end(JSON.stringify(urlData));
});

server.listen(process.env.PORT || 3000);