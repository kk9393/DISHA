var http = require('http');
var fs = require('fs');


function send404Response(response){
    response.writeHead(404,{"content-type":"text/plain"});
    response.write("Error 404 : page not found");
    response.end();
}

function onRequest(request, response){

    if(request.method == 'GET' && request.url == '/'){
        response.writeHead(200,{"context-type":"text/html"});
        fs.createReadStream('./index.html').pipe(response);
    }else{
        send404Response(response);
    }
}


http.createServer(onRequest).listen(6924);
console.log("server is running.....");