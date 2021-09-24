plugin = { }

plugin.log = (text, manifest) => {
    console.log("%c[" + manifest.name + "] %c" + text, "font-weight: 800; color: blue;", "font-weight: 400; color: white;")
}

let manifest = {
  name: "demo",
  author: "TheRealGeoDash2019",
  version: 1
}

(async () => {
  plugin.log("If you are seeing this, then this script has worked", manifest)
})();
