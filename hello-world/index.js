<<<<<<< HEAD
const fs = require("fs")

fs.writeFile("sample.txt","Hi There! This is a sample text file.",
    (err) => {
        if (err) throw err
        console.log("File is created!")
    }
)

fs.readFile("sample.txt",
    (err,data) => {
        if (err) throw err
        console.log(data.toString())
    }
)

fs.cl
=======
console.log("Hello GitHub!")
>>>>>>> origin/main
