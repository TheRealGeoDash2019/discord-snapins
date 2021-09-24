(async () => {
  let sendAsUser = findByUniqueProperties(["sendMessage"]).sendMessage

  createSlashCommand("timestamp", "Grabs the Current Time and Sends a Timestamp as the User", [], () => {
    let timestamp = parseInt(new Date().setSeconds(new Date().getSeconds() + 0) / 1000)
    sendAsUser(document.location.href.split("/")[document.location.href.split("/").length - 1], {content: `Timestamp: \<t\:${timestamp}\:F\>`})
  })
})();
