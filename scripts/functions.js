(async () => {
  window.sendUnrestricted = (json) => {
      let api = "https:" + window.GLOBAL_ENV.API_ENDPOINT + "/v" + window.GLOBAL_ENV.API_VERSION
      fetch(api + "/channels/" + document.location.href.split("/")[document.location.href.split("/").length - 1] + "/messages", {
          headers: {
              "Authorization": localStorage.token.replaceAll('"', ""),
              "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(json)
      })
  }
})();
