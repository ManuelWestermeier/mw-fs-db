import { log } from "console";
import fs from "fs"
import path from "path"

export default class {

    constructor(rooPath = "", dataLocations = [""]) {

        this.root = rooPath;

        if (!fs.existsSync(rooPath))
            fs.mkdirSync(rooPath, { recursive: true })

        dataLocations.forEach(key => {

            const keyPath = path.join(this.root, key)

            if (!fs.existsSync(path))
                fs.mkdirSync(keyPath, { recursive: true })

        })

    }

    store(pathName = [], data, isBinary = false) {

        var actualPath = this.root

        pathName.forEach((part, i) => {

            actualPath = path.join(actualPath, securifyPathPart(part));

            if (!fs.existsSync(actualPath) && i != pathName.length - 1) {

                fs.mkdirSync(actualPath, { recursive: true })

            }

        })

        if (!isBinary) {

            fs.writeFileSync(actualPath, JSON.stringify(data), "utf-8")

        }
        else {

            fs.writeFileSync(actualPath, data)

        }

    }

    read(pathName = [], isBinary = false) {

        const actualPath = path.join(this.root, pathName.map(p => securifyPathPart(p)).join("/"))

        if (fs.existsSync(actualPath)) {

            if (isBinary) {
                return fs.readFileSync(actualPath)
            }
            else {
                return JSON.parse(fs.readFileSync(actualPath, "utf-8"))
            }

        }
        else {

            return new Error("file not exist")

        }

    }

    delete(pathName = []) {

        const actualPath = path.join(this.root, pathName.map(p => securifyPathPart(p)).join("/"))

        if (fs.existsSync(actualPath)) {

            if (fs.statSync(actualPath).isFile()) {

                fs.unlinkSync(actualPath)

            }
            else {

                fs.rmdirSync(actualPath, { maxRetries: 5, retryDelay: 1 })

            }

        }

    }

}


function securifyPathPart(pathName = "") {

    return (pathName + "").split("/").join("-").split("\\").join("-").split("..").join("--")
    //return Buffer.from((pathName + "")).toString("base64url")

}