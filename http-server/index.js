/* eslint-disable no-undef */
const http = require("http");
const fs = require("fs").promises;
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = parseInt(args.port);

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let regScript = "";

Promise.all([
    fs.readFile("home.html", "utf-8"),
    fs.readFile("project.html", "utf-8"),
    fs.readFile("registration.html", "utf-8"),
    fs.readFile("reg_script.js", "utf-8")
])
    .then(([home, project, registration, regscript]) => {
        homeContent = home;
        projectContent = project;
        registrationContent = registration;
        regScript = regscript;

        http.createServer((request, response) => {
            let url = request.url === '/' ? '/home.html' : request.url;

            // Set content type based on file extension
            let contentType = "text/html"; // Default to HTML
            if (url.endsWith(".js")) {
                contentType = "application/javascript";
            }

            response.writeHead(200, { "Content-Type": contentType });

            // Serve content based on URL
            switch (url) {
                case "/project":
                    response.write(projectContent);
                    response.end()
                    break;
                case "/registration.html":
                    response.write(registrationContent);
                    response.end()
                    break;
                case "/reg_script.js":
                    response.write(regScript);
                    response.end()
                    break;
                case "/home.html":
                default:
                    response.write(homeContent);
                    response.end()
                    break;
            }
        }).listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error("Error reading files:", err);
        process.exit(1); // Exit on error
    });
