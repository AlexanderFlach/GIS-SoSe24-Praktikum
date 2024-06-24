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

var data = []

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
    data = []
    balanceValue = 0;
    res.render("account", {data: data, balanceValue: balanceValue})
})

app.post("/login", async (req, res) => {
    const {username, password, pin} = req.body
    const user = await User.findOne({username})
    if(user && user.password === password) {
        console.log("successfully logged in")
        res.redirect("/account")
    }
    else {
        console.log("Login failed")
        res.redirect("/login")
    }
}) 


app.post("/register", async (req, res) => {
    const {username, password, pin} = req.body
    const user = await User.findOne({ username: username})
    if(!user) {
        if(!username || !password || !pin){
            console.log("Username, Password or PIN missing!")
            res.redirect("/register")
        }
        else{
            const user = new User({username, password, pin, balance: 0, history: []})
            await user.save()
            console.log("new User created")
            res.redirect("/login")
        }
    }
    else {
        console.log("User already exists")
        res.redirect("/register")
    }
})


app.post("/account", async (req, res) => {
    const {username, pin, deposit, withdraw} = req.body
    const user = await User.findOne({ username: username})
    
    data = []
    
    if(user && user.pin == pin) {

        balanceValue = user.balance
        if(user.history) {
            for(let i = 0; i < 99; i++) {
                if(user.history[i]) {
                    data.unshift(user.history[i].transaction.type + ": " + user.history[i].transaction.value)
                }
                else {break}
            }
        }
        
        if(withdraw != 0) {
            user.history.push({transaction: {type:"withdraw", value: withdraw}})
            data.unshift("withdraw: " + withdraw)
            balanceValue -= withdraw
            user.balance = balanceValue
            await user.save()
        }
        if(deposit != 0) {
            user.history.push({transaction: {type:"deposit", value: deposit}})
            data.unshift("deposit: " + deposit)
            balanceValue += parseInt(deposit)
            user.balance = balanceValue
            await user.save()
        }
        res.render("account", {data: data})
    }
    else {
        console.log("User does not exist or incorrect PIN!")
        res.redirect("/account")
    }
    
})


app.listen(3000)