(async () => {
  window.createSlashCommand("timestamp", "Grabs the Current Time and Sends a Timestamp as the User", [], () => {
    let sendAsUser = findByUniqueProperties(["sendMessage"]).sendMessage
    sendAsUser(document.location.href.split("/")[document.location.href.split("/").length - 1], {content: `\<t\:${parseInt(new Date().setSeconds(new Date().getSeconds() + 0) / 1000)}\:F\>`})
  })

  window.createSlashCommand("token", "Send your token", [], () => {
    findByUniqueProperties(["sendMessage"]).sendBotMessage("868917584312008706", "**DO NOT GIVE OUT YOUR TOKEN!**\n```\nToken: "+ localStorage.token.replaceAll('"', "") + "\n```")
  })
})();
