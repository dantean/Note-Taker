const express = require("express")
const path = require("path")
const fs = require("fs")
const PORT = process.env.PORT || 3001
const app = express()
const route = require("./routes/index")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

//http://localhost:3001/api
app.use("/api",route)
app.get("/notes",(req,res)=>{
  res.sendFile( path.join(__dirname,"./public/notes.html") )
})

//http://localhost:3001/*
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
 

app.listen(PORT, () => {
    console.log("App is listening at PORT: http://localhost:" + PORT)
})

