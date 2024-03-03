import { rmdirSync } from "fs"
import MwFsDb from "./index.js"

//create the database
//param 1 is the root path, param 2 are the data locations
const db = new MwFsDb("data", [
    "user",
    "user-data",
    "images/user",
    "images/profile"
])

//store json in database

var userID = "xx/\\..yyxx"
var name = "Hubert"
var age = 50

db.store(["user", userID, "data.txt"], { name, age })

//store binary in database

db.store(["images", "user", userID, "main.png"], Buffer.from("sjsjjs")/* Some Binary data */, true)

//read json from database

var data = db.read(["user", userID, "data.txt"])

console.log(`name : ${data.name}\nage : ${data.age}`)

//read binary data from database

console.log(
    db.read(["images", "user", userID, "main.png"], true)
)

//delete 

db.delete(["user", userID, "data.txt"])
db.delete(["images"])
db.delete(["user-data"])