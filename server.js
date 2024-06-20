
// Imports
const express = require("express")
const User = require("./models/User")
const mongoose = require("mongoose")
var bodyParser = require('body-parser')
mongoose.connect("mongodb://localhost:27017/Login")

const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", error => console.error("Connected to Mongoose!"))

const app = express()
const port = 3000


// Static Files
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/css", express.static(__dirname + "public/css"))
app.use("/js", express.static(__dirname + "public/js"))
app.use("/img", express.static(__dirname + "public/img"))

// Set Views
app.set("views", "./views")
app.set("view engine", "ejs")


async function createUser(data) {
    const user = new User({username: data.username, password: data.password, pin: data.pin})
    await user.save()
    console.log(user)
}



app.get("/", (req, res) => {
    res.render("homepage")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/account", (req, res) => {
    res.render("account")
})

app.post("/login", async (req, res) => {
    const {username, password, pin} = req.body
    const user = await User.findOne({username})
    if(user && user.password === password) {
        res.redirect(`/account?id=${encodeURIComponent(user._id)}`)
    }
    else {
        res.send({user, body: req.body})
    }
})

app.post("/register", async (req, res) => {
    const {username, password, pin} = req.body
    const user = new User({username, password, pin})
    await user.save()
    console.log(user)
    res.redirect(`/login?id=${encodeURIComponent(user._id)}`)
})

app.post("/account", async (req, res) => {
    const {pin, deposit, withdraw} = req.body
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const id = url.searchParams.get("id");
    console.log(url.searchParams.has("id"))
    console.log(id)
})


app.listen(3000)