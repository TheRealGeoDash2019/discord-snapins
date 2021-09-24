(async () => {
  console.log("Testing Script ran")
  console.log(document.location.href)

  let sendAsUser = findByUniqueProperties(["sendMessage"]).sendMessage

  sendAsUser(document.location.href.split("/")[document.location.href.split("/").length - 1], {content: "Test Message from Chrome"})
})();
