const express = require("express")
const app = express()
const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false,
});

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")

app.get("/", (req,res) =>{
    res.render("index")
})
app.post("/login",async (req,res) =>{
    const token = req.body.token//tutaj pobiera legancko dane z POST
    const channelId = req.body.channelId
    const repeats = req.body.repeats
    const content = req.body.content
    try{
    await client.login(token)
    console.log(`Zalogowano jako ${client.user.username}`)
    const kanal = await client.channels.fetch(channelId)
    for (let index = 0; index < repeats; index++) {
        await kanal.send(content)
    }
    res.redirect("/gotowe")
    }catch{
            res.render("error")
        }
})
app.get("/gotowe", (req,res) =>{
    res.render("done.ejs")
})

app.listen(8080)//testowa wersja