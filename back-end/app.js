const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Server Running" )
    console.log(req.method, req.url);


    res.setHeader('Content-Type', 'text/plain')
    res.end("Success");
})

server.listen(5000);