(async () => {
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

  setInterval(async () => {
      let VoiceGuildID = ""

      Object.entries(findByUniqueProperties(["getVoiceState"]).getAllVoiceStates()).forEach(entry => {
          let userId = findByUniqueProperties(["getCurrentUser"]).getCurrentUser().id
              if (Object.keys(entry[1]).includes(userId)) {
                  VoiceGuildID = entry[0]
              }
      })
      try {
          new GeoMusicAPI("beanftw", "queue", {
              user: "710268763844640839",
              guild: VoiceGuildID
          }).run().then(resjson => {
              if (resjson && resjson.tracks && resjson.tracks[0] && resjson.tracks[0].title && resjson.tracks[0].author) {
                  window.setActivity("806224910284095518", "Geo Music", resjson.tracks[0].title, resjson.tracks[0].author)
              } else {
                  window.setActivity("", "", "", "", {}, [], {})
              }
          })
      } catch {
          window.setActivity("", "", "", "", {}, [], {})
      }
  }, 3000)
})();
