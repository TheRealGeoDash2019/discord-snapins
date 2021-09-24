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

// Add Better Webpack Module Find Method
const req = typeof(webpackJsonp) === "function" ? webpackJsonp([], {
    '__extra_id__': (module, exports, req) => exports.default = req
}, ['__extra_id__']).default : webpackJsonp.push([[], {
    '__extra_id__': (module, exports, req) => module.exports = req
}, [['__extra_id__']]]);
delete req.m['__extra_id__'];
delete req.c['__extra_id__'];
const find = (filter, options = {}) => {
    const {cacheOnly = true} = options;
    for (let i in req.c) {
        if (req.c.hasOwnProperty(i)) {
            let m = req.c[i].exports;
            if (m && m.__esModule && m.default && filter(m.default))
                return m.default;
            if (m && filter(m))
                return m;
        }
    }
    if (cacheOnly) {
        console.warn('Cannot find loaded module in cache');
        return null;
    }
    console.warn('Cannot find loaded module in cache. Loading all modules may have unexpected side effects');
    for (let i = 0; i < req.m.length; ++i) {
        try {
            let m = req(i);
            if (m && m.__esModule && m.default && filter(m.default))
                return m.default;
            if (m && filter(m))
                return m;
        }
        catch (e) {
        }
    }
    console.warn('Cannot find module');
    return null;
};
window.findByUniqueProperties = (propNames, options) => find(module => propNames.every(prop => module[prop] !== undefined), options);

// END

let scriptsDir = "https://api.github.com/repos/TheRealGeoDash2019/discord-snapins/contents/scripts/"

log = (name, text) => {
    console.log("%c[" + name + "] %c" + text, "font-weight: 800; color: blue;", "font-weight: 400; color: white;")
}

log("GITHUB", "Grabing Scripts from Github")
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
