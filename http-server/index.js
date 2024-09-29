const http = require("http");
const fs = require("fs").promises;
const minimist = require("minimist")
const args = minimist(process.argv.slice(2))

const port = parseInt(args.port)

let homeContent = "";
let projectContent = "";
let registrationContent = ""

Promise.all([
    fs.readFile("home.html"),
    fs.readFile("project.html"),
    fs.readFile("registration.html"),
])
    .then(([home, project, registration]) => {
        homeContent = home;
        projectContent = project;
        registrationContent = registration;

        http
            .createServer((request, response) => {
                let url = request.url;
                response.writeHead(200, { "Content-Type": "text/html" });
                switch (url) {
                    case "/project":
                        response.write(projectContent);
                        response.end();
                        break;
                    case "/registration.html":
                        response.write(registrationContent);
                        response.end();
                        break;
                    default:
                        response.write(homeContent);
                        response.end();
                        break;
                }
            })
            .listen(port);
    })
    .catch(err => {
        throw err
    });
