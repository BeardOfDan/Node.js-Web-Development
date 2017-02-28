var http = require('http'),
    util = require('util'),
    url  = require('url'),
    os   = require('os');

var server = http.createServer();
server.on('request', (req, res) => {
  var requrl = url.parse(req.url, true);
  if(requrl.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(
      `<html><head><meta charset="utf-8"><title>Hello, World!</title></head>
      <body><h1>Hello World!</h1>
      <p><a href='/osinfo'>Os Info</a></p>
      </body></html>`);
  } else if (requrl.pathname === "/osinfo") {
    res.writeHead(200, {'ContentYpte': 'text/html'});
    res.end(
      `<html><head><meta charset="utf-8"><title>Operating System Info</title></head>
      <body><h1>Operating System Info</h1>
      <table>
      <tr><th>TMP Dir</th><td>${os.tmpDir()}</td></tr>
      <tr><th>Host Name</th><td>${os.hostname()}</td><tr>
      <tr><th>Os Type</th><td>${os.type()} ${os.platform()} ${os.arch()} ${os.release()}</td></tr>
      <tr><th>Uptime</th><td>${os.uptime()} ${util.inspect(os.loadavg())} </td></tr>
      <tr><th>Memory</th><td>total: ${os.totalmem()} free: ${os.freemem()}</td></tr>
      <tr><th>CPU's</th><td><pre>${util.inspect(os.cpus())}</pre></td></tr>
      <tr><th>Network</th><td><pre>${util.inspect(os.networkInterfaces())}</pre></td></tr>
      </table>
      </body></html>`);
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("bad URL " + req.url);
  }
});

require('./httpsniffer').sniffOn(server);
server.listen(8124);
console.log('listening to http://localhost:8124');