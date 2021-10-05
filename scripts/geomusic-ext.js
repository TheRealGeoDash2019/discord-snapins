class GeoMusicAPIError extends Error {}

class GeoMusicAPI {
  constructor(token, action, json) {
    if (!token) throw new GeoMusicAPIError("NO TOKEN DEFINED")
    if (!action) throw new GeoMusicAPIError("NO ACTION DEFINED")
    if (!json) throw new GeoMusicAPIError("NO JSON BODY")
    
    this.token = token
    this.action = action
    this.json = json
  }
  
  async run() {
    let act = this.action
    let token = this.token
    let json = this.json
    let apiURL = "https://geomusic.tech/api/v1/player/"
    let res = await fetch(apiURL + act, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(json)
    }).then(async res => {
      return await res.json().then(async jso => {
        return await jso
      })
    })
    return await res
  }
}

window.GeoMusicAPI = GeoMusicAPI
window.GeoMusicAPIError = GeoMusicAPIError
