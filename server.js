const http = require('http'),
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  proxy = require('http-proxy');

const port = process.env.PORT || 3000;

const proxyServer = proxy.createProxyServer();
const server = http.createServer((req, res) => {
  // 获取解析后的url对象
  const pathObj = url.parse(req.url, true);
  // 后台api
  if (pathObj.pathname === '/barrage') {
    proxyServer.web(req, res, { target: 'http://127.0.0.1:8080' });
    return;
  }
  // 资源路径
  // const staticPath = path.resolve(__dirname, 'static');
  const filePath = path.join(__dirname, pathObj.pathname);
  console.log(filePath);
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      // console.error('404');
      // res.writeHead('<h1>404 not found</h1>');
      // res.end();
      console.error('404');
      // res.writeHead('<h1>404 not found</h1>');
      res.end('<h1>404 not found</h1>');
    } else {
      console.log('success');
      // 二进制
      res.write(fileContent, 'binary');
      res.end();
      // console.log('success');
      // res.writeHead(200, { 'Context-Type': 'text/html' });
      // res.end(fileContent);
    }
  });
});

server.listen(port);
console.log(`server start on ${port}`);
