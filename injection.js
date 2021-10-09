(async () => {
//Begin Functions to Grab Data
window.grabJSON = (url, init) => {
    return fetch(url, init).then(res => {
        return res.json().then(json => {
            return json
        })
    })
}

window.grabEval = (url, init) => {
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
    window.createSlashCommandSection = (id, iconHash, name, type) => {
        let slashCommandsSections = findByUniqueProperties(["BUILT_IN_COMMANDS", "BUILT_IN_SECTIONS"]).BUILT_IN_SECTIONS
        slashCommandsSections[id] = {
            id: id,
            icon: iconHash,
            name: name,
            type: type? type : 1
        }
    }
    
    window.getSlashCommandSections = (id) => {
        let slashCommandsSections = findByUniqueProperties(["BUILT_IN_COMMANDS", "BUILT_IN_SECTIONS"]).BUILT_IN_SECTIONS
        if (slashCommandsSections[id] !== null && slashCommandsSections[id] !== undefined) {
            return slashCommandsSections[id]
        } else {
            return null
        }
    }
    
    window.createSlashCommand = (name, desc, options, execute) => {
        let slashCommands = findByUniqueProperties(["BUILT_IN_COMMANDS", "BUILT_IN_SECTIONS"]).BUILT_IN_COMMANDS
        if (window.getSlashCommandSections("891090626119102475")) {
            let slashCommandTemplate = {
                applicationId: "891090626119102475", // DO NOT TOUCH
                description: desc, // USER PROVIDED DESCRIPTION
                execute: execute, // USER PROVIDED EXECUTE FUNCTION
                id: "-" + parseInt(Math.random() * 10000), // DO NOT TOUCH
                name: name, // "taco"
                options: options, // [{name: 'message', type: 3, required: true}]
                target: 1,
                type: 0
            }
            
            if (name && execute) {
                slashCommands.push(slashCommandTemplate)
            }
        } else {
            window.createSlashCommandSection("891090626119102475", "5876ede7fef55303bd4d1e0d7108a408", "GeoMod", 1)
            let slashCommandTemplate = {
                applicationId: "891090626119102475", // DO NOT TOUCH
                description: desc, // USER PROVIDED DESCRIPTION
                execute: execute, // USER PROVIDED EXECUTE FUNCTION
                id: "-" + parseInt(Math.random() * 10000), // DO NOT TOUCH
                name: name, // "taco"
                options: options, // [{name: 'message', type: 3, required: true}]
                target: 1,
                type: 0
            }
            
            if (name && execute) {
                slashCommands.push(slashCommandTemplate)
            }
        }
    }

window.geomod = true
// END

let scriptsDir = "https://api.github.com/repos/TheRealGeoDash2019/discord-snapins/contents/scripts/"

window.log = (name, text) => {
    console.log("%c[" + name + "] %c" + text, "font-weight: 800; color: blue;", "font-weight: 400; color: white;")
}

window.injectIntoSite = (content, scriptname) => {
    let scripts = document.createElement("script")
    scripts.innerText = content
    scripts.className = scriptname.toLowerCase()
    return document.head.appendChild(scripts)
}

window.addEventListener('load', (event) => {
    log("GITHUB", "Grabing Scripts from Github")
    window.grabJSON(scriptsDir).then(res => {
        if (res instanceof Object || typeof res === "object") {
            res.forEach(file => {
                if (file.name.split(".")[1] === "js") {
                    window.log("INJECTOR", "Running " + file.name + "...")
                    window.grabEval(file.download_url)
                }
            })
        }
    })
});
})();
