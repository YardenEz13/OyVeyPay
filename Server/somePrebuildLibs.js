// fs stands for file system
const fs = require('fs');

// path is to work with paths on the pc 
const path = require('path');

// http is for creating a web server but is old and not easy to use so it's not preffered
const http = require('http');


http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    res.end("hello, world");
}).listen(1312);


const filePath = path.join(__dirname, 'hello.txt');
console.log(filePath);

function CreateFile()
{
    fs.writeFileSync('hello.txt', 'hello, world');
}

function ReadFile()
{
    const data = fs.readFileSync('hello.txt', 'utf8');
    console.log(data);
}

// how to export js files
// const {users, getUser} = require("./users");

// console.log(users.getUser(1));



// CreateFile()
//ReadFile();
