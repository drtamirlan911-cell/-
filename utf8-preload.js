const http=require('node:http');
const original=http.ServerResponse.prototype.writeHead;
http.ServerResponse.prototype.writeHead=function(statusCode,...args){const headers=args[args.length-1];if(headers&&headers['content-type']&&/^text\//i.test(headers['content-type'])&&!/charset=/i.test(headers['content-type']))headers['content-type']+='; charset=utf-8';return original.call(this,statusCode,...args)};
