/*
getPlaybackStatus   Get the current playback status.
loadLineIn	Change the current group source to the line-in source on a player.
pause	Pause group playback.
play	Initiate group playback.
seek	Go to a specific position in the current track.
seekRelative	Go to a relative position in the current track.
setPlayModes	Change group play modes, such as repeat, repeat one track, shuffle, and crossfade.
skipToNextTrack	Skip to the next track.
skipToPreviousTrack	Skip to the previous track.
subscribe	Subscribe to events in the playback namespace.
togglePlayPause	Toggle the playback state on the given group, if possible.
unsubscribe	Unsubscribe from events in the playback namespace.
*/
const fs = require('fs')
const fetch = require("node-fetch")
const { exit } = require('process');
const auth = require('../config.json')
const other = require('./other.js')
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
}

module.exports = {
    async play(room){
        _groups = await get_groups()
        if(_groups.fault) return _groups
        groupid = room_check(room, _groups)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/groups/"+groupid+"/playback/play", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async pause(room){
        _groups = await get_groups()
        if(_groups.fault) return _groups
        groupid = room_check(room, _groups)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/groups/"+groupid+"/playback/pause", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async skipToNextTrack(room){
        _groups = await get_groups()
        if(_groups.fault) return _groups
        groupid = room_check(room, _groups)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/groups/"+groupid+"/playback/skipToNextTrack", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async skipToPreviousTrack(room){
        _groups = await get_groups()
        if(_groups.fault) return _groups
        groupid = room_check(room, _groups)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/groups/"+groupid+"/playback/skipToPreviousTrack", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async getPlaybackStatus(room){
        _groups = await get_groups()
        if(_groups.fault) return _groups
        groupid = room_check(room, _groups)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/groups/"+groupid+"/playback/getPlaybackStatus", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async togglePlayPause(room){
        _groups = await get_groups()
        if(_groups.fault) return _groups
        groupid = room_check(room, _groups)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/groups/"+groupid+"/playback/getPlaybackStatus", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async subscribe(room){
        _groups = await get_groups()
        if(_groups.fault) return _groups
        groupid = room_check(room, _groups)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/groups/"+groupid+"/playback/subscription", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "POST",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async unsubscribe(room){
        _groups = await get_groups()
        if(_groups.fault) return _groups
        groupid = room_check(room, _groups)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/groups/"+groupid+"/playback/subscription", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "DELETE",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    },
    async testing(){
        _groups = await get_groups()
        if(_groups.fault) return _groups
        groupid = room_check(room, _groups)
        sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/groups/"+groupid+"/playback", {
        headers: {
            Authorization: "Bearer "+access_token,
            "Content-Type": "application/json"
        },
        method: "GET",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        return sonoswait
    }
}