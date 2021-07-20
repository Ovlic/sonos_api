const fetch = require('node-fetch')
const auth = require('../config.json')

module.exports = {
    async get_access_token(code){
        const sonoswait = await fetch("https://api.sonos.com/login/v3/oauth/access", {
        body: "grant_type=authorization_code&code="+code+"&redirect_uri="+encodeURIComponent("https://ovlic.com/sonos_api/"),
        headers: {
            Authorization: auth.auth_key,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        method: "POST",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        console.log(sonoswait)
        return sonoswait
    },
    async refresh_access_token(refresh_token){
        const sonoswait = await fetch("https://api.sonos.com/login/v3/oauth/access", {
            body: "grant_type=refresh_token&refresh_token="+refresh_token,
            headers: {
                Authorization: auth.auth_key,
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
        method: "POST",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        console.log(sonoswait)
        return sonoswait
    },
    async get_households(){
        const sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/households", {
        headers: {
            Authorization: "Bearer "+auth.access_token,
            "Content-Type": "application/json"
        },
        method: "GET",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        console.log(sonoswait)
        return sonoswait
    },
    async get_groups(){
        const sonoswait = await fetch("https://api.ws.sonos.com/control/api/v1/households/"+auth.h_id+"/groups", {
        headers: {
            Authorization: "Bearer "+auth.access_token,
            "Content-Type": "application/json"
        },
        method: "GET",
        mode: 'no-cors'
        }).then(response => response.json()).then(data => data)
        console.log(sonoswait)
        return sonoswait
    }
}