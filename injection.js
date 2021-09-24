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

grabJSON(scriptsDir).then(res => {
    if (res instanceof Object || typeof res === "object") {
        res.forEach(file => {
            grabEval(file.download_url)
        })
    }
})
