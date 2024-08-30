// Create Web server
// 1. Load http module
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = require('./comments');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// 2. Create server
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        pathname = 'index.html';
    }
    if (pathname == '/index.html') {
        var filePath = path.join(__dirname, pathname);
        fs.readFile(filePath, 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                res.statusCode = 404;
                res.end('Resource not found!');
            } else {
                res.end(data);
            }
        });
    } else if (pathname == '/getComments') {
        var commentsData = comments.get();
        res.end(commentsData);
    } else if (pathname == '/addComment') {
        var comment = urlObj.query;
        comments.add(comment);
        res.end('Add comment successfully');
    } else {
        res.statusCode = 404;
        res.end('Resource not found!');
    }
}).listen(8080, function () {
    console.log('Server is running at http://');
});