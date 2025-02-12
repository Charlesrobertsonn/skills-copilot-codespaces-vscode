// Create web server
// Create a web server that listens for incoming requests and sends back responses.
// The server should respond to requests to /comments with a JSON object that represents an array of comments.
// The comments should be objects with properties for the comment, the author, and the date.
// The server should respond to requests to /comments/new with a form that allows users to submit new comments.
// The server should respond to requests to /comments/new with a POST request by adding the submitted comment to the list of comments.
// The server should respond to requests to /comments/new with a GET request by adding the submitted comment to the list of comments.
// The server should respond to requests to /comments/new with a GET request by redirecting the user back to /comments.
// The server should respond to requests to any other URL with a 404 status code and a message indicating that the resource could not be found.
// The server should respond to requests with a method other than GET or POST with a 405 status code and a message indicating that the method is not allowed.

const http = require('http');
const fs = require('fs');
const url = require('url');

const comments = [];

const server = http.createServer((req, res) => {
  const urlParts = url.parse(req.url, true);
  const { pathname } = urlParts;

  if (req.method === 'GET') {
    if (pathname === '/comments') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comments));
    } else if (pathname === '/comments/new') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync('./form.html'));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } else if (req.method === 'POST') {
    if (pathname === '/comments/new') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', () => {
        const newComment = JSON.parse(body);
        comments.push(newComment);
        res.writeHead(302, { Location: '/comments' });
        res.end();
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');

