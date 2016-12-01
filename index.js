var http = require("http");

var server = http.createServer();

server.on("request", function(req, res){
	//res.end("Hola, mundo");
	var date = new Date();
	res.end(JSON.stringify(date));
});

server.listen(3000);