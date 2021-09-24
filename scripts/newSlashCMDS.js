(async () => {
  createSlashCommand("timestamp", "Grabs the Current Time and Sends a Timestamp as the User", [], () => {
    let sendAsUser = findByUniqueProperties(["sendMessage"]).sendMessage
    sendAsUser(document.location.href.split("/")[document.location.href.split("/").length - 1], {content: `Timestamp: \<t\:${parseInt(new Date().setSeconds(new Date().getSeconds() + 0) / 1000)}\:F\>`})
  })
})();
