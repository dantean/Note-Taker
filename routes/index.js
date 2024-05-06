const router=require("express").Router()
const notes=require("./notes")

//http://localhost:3001/notes

router.use("/notes",notes)
module.exports = router