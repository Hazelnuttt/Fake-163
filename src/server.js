var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer( function (request, response) {
   // 解析请求，包括文件名
   //pathname 是URL的路径部分，它位于主机之后和查询之前，包括初始斜杠（如果存在）
   var pathname = url.parse(request.url).pathname;

   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");

   //"=="表示只要值相等即可为真，而"==="则要求不仅值相等，而且也要求类型相同
   var dst = pathname === '/' ? '../dist/index.html' : '../dist' + pathname;

   // 从文件系统中读取请求的文件内容
   fs.readFile(dst, function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': ['text/html']});
      }else{
         contentType = 'text/html';
         pathname = pathname.toLowerCase();//如果有大写，要化为小写（路径内）
         if(pathname.endsWith('css') || pathname.endsWith('js')){
           ends = pathname.split('.')[2];//split分割
           contentType = 'text/' + ends;
         }
         response.writeHead(200, {'Content-Type':contentType});
         response.write(data,'binary');
         //用二进制，但是一开始，用data.toString()也出来了，，折腾过后，出不来了，，



      }
      //  发送响应数据
      response.end();
   });
}).listen(8080);

// 控制台会输出以下信息
console.log('Server running...');
