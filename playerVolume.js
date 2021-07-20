/*
subscribe	Subscribe to events in the playerVolume namespace.
unsubscribe	Unsubscribe from events in the playerVolume namespace.
getVolume	Get player volume and mute state.
setVolume	Set player volume to a specific level and unmute the player if muted.
setMute	Mute or unmute the player.
setRelativeVolume	Increase or decrease player volume.
*/

const fetch = require("node-fetch")
const { exit } = require('process');
const auth = require('../config.json')
const access_token = auth.access_token
const h_id = auth.h_id

function room_check(room, _groups){
    for(i=0; i < _groups.groups.length; i++){
        if(_groups.groups[i].name == room){
            return groupid = _groups.groups[i].id
        }
    }
    exit(console.log("Didnt find Sonos with name "+room))
}
async function get_groups(){
    sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/households/"+auth.h_id+"/groups", {
    headers: {
        Authorization: "Bearer "+auth.access_token,
        "Content-Type": "application/json"
    },
    method: "GET",
    mode: 'no-cors'
    }).then(response => response.json()).then(data => data)
    return sonoswait
        //console.log("Got data")
        //return data
    
}

async function get_player_id(player){
    _groups = await get_groups()
    for(i=0; i < _groups.groups.length; i++){
        if(_groups.groups[i].name == player){
            return playerid = _groups.groups[i].playerIds[0]
        }
    }
    exit(console.log("Didnt find Sonos with name "+room))
}

module.exports = {
    async getVolume(room){
        playerid = get_player_id(room)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/players/"+playerid+"/playerVolume", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "GET",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async setMute(room, mute=true){
        playerid = get_player_id(room)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/players/"+playerid+"/playerVolume", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json",
            "muted": mute
        },
        method: "GET",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async setVolume(room, mute, volume){
        if(typeof(volume) !== Number) exit(console.log("Volume is not a number!"))
        else if(volume > 100) exit(console.log("Volume cannot be greater than 100!"))
        else if(volume < 0) exit(console.log("Volume cannot be less than 0!"))
        playerid = get_player_id(room)
        if(!mute){
            sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/players/"+playerid+"/playerVolume", {
            headers: {
                Authorization: "Bearer "+access_token,
                "Content-Type": "application/json",
                "volume": volume
            },
            method: "GET",
            mode: 'no-cors'
            }).then(response => response.json()).then(data => data)
            return sonoswait
        }else{
            sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/players/"+playerid+"/playerVolume", {
            headers: {
                Authorization: "Bearer "+access_token,
                "Content-Type": "application/json",
                "volume": volume,
                "muted": mute
            },
            method: "GET",
            mode: 'no-cors'
            }).then(response => response.json()).then(data => data)
            return sonoswait
        }
    }
}