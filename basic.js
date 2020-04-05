var http = require("http");
var fs = require('fs');

function onRequest (request, response){
    response.writeHead(200,{'Content-type':'text/html'});
    var myReadStream = fs.createReadStream(__dirname+'/index.html', 'utf8');
    myReadStream.pipe(response);
}

http.createServer(onRequest).listen(8000);