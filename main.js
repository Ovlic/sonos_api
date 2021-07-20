const playback = require('./Handlers/playback.js')
const auth = require('./config.json')
const other = require('./Handlers/other.js')
const fs = require('fs');

async function update_auth(){
    const fileName = './config.json';
    const file = require(fileName);
    const new_refresh_token = await other.refresh_access_token(auth.refresh_token)

    file.access_token = new_refresh_token.access_token;

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
    });
}

async function run(){
    ee = await playback.play()
    if(ee.fault){
        console.log(ee)
    } else{
        console.log(ee)
        console.log("Done.")
    }
}

run()
return