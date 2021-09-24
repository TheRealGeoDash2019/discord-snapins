//Begin Functions to Grab Data
grabJSON = (url, init) => {
    return fetch(url, init).then(res => {
        return res.json().then(json => {
            return json
        })
    })
}

grabEval = (url, init) => {
    return fetch(url, init).then(res => {
        return res.text().then(res => {
            //document.eval(res)
            let result = new DOMParser().parseFromString(res, "text/html")
            
            try {
                return eval(result.body.innerText)
            } catch (err) {
                return new Error("Invalid JS")
            }
        })
    })
}

// END

let scriptsDir = "https://api.github.com/repos/TheRealGeoDash2019/discord-snapins/contents/scripts/"

log = (name, text) => {
    console.log("%c[" + name + "] %c" + text, "font-weight: 800; color: blue;", "font-weight: 400; color: white;")
}

grabJSON(scriptsDir).then(res => {
    if (res instanceof Object || typeof res === "object") {
        res.forEach(file => {
            if (file.name.split(".")[1] === "js") {
                log("INJECTOR", "Running " + file.name + "...")
                grabEval(file.download_url)
            }
        })
    }
})
