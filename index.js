var http = require("http");

var server = http.createServer();

server.on("request", function(req, res){
	var date = new Date();
	res.end(JSON.stringify(date));
});

server.listen(procces.env.PORT || 3000);