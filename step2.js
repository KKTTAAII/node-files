const fs = require("fs");
const axios = require("axios");

function cat(path) {
    fs.readFile(path, "utf8", function(err, data){
        if(err){
            console.log("Error", err)
        }
        console.log(data)
    })
}

async function webCat(URL) {
    try {
        const res = await axios.get(URL);
        console.log(res.data)
    } catch (e) {
        console.log(e)
    }
}

if(process.argv[2].startsWith('http:') || process.argv[2].startsWith('https:')){
    webCat(process.argv[2])
}else{
    cat(process.argv[2])
}