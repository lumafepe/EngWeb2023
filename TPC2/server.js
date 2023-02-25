const http = require('http')
const url = require('url')
const fs = require('fs')

const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === "/") {
        fs.readFile('index.html', (err, html) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            }
            else {
                fs.readFile('style.css', (err, css) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error loading style.css');
                    }
                    else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(html);
                        res.write(`<style>${css}</style>`);
                        res.end();
                    }
                })
            }
        })
    }
    else{
        let match = new RegExp("c[1-9][0-9]?[0-9]?")
        if (match.test(parsedUrl.pathname)) {
            fs.readFile(`generated/${parsedUrl.pathname}.html`, (err, html) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading'+`generated/${parsedUrl.pathname}.html`);
                }
                else {
                    fs.readFile('style.css', (err, css) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Error loading style.css');
                        }
                        else {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.write(html);
                            res.write(`<style>${css}</style>`);
                            res.end();
                        }
                    })
                }
            })
        }
        else {
            res.writeHead(404);
            res.end('Page not found');
        }
    }
});
server.listen(7777);
console.log("Server is running at localhost:7777")