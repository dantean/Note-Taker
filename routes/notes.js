const router = require("express").Router()
const fs = require("fs")
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// http://localhost:3001/notes/
router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        const newData = JSON.parse(data)
        res.json(newData)
    })
})

router.post("/", (req, res) => {
    console.info(`${req.method} request received to a new note`)
    const { title, text} = req.body

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        }

        readAndAppend(newNote, "./db/db.json")
    
        const response = {
            status: 'success',
            body: newNote,
          }
      
        res.json(response)
    }else {
        res.error("Error in adding note")
    }
})

router.delete("/:id/", (req, res) => {

    fs.readFile('./db/db.json', (err, data) => {
        obj = JSON.parse(data)
       
        obj = obj.filter((item) => {
            let url = req.params.id; 
            return item.id !== url;
        })
       
        console.log(obj)
        let json = JSON.stringify(obj);
        fs.writeFile('./db/db.json', json, (err)=>{
            if(err) throw err
            res.json(obj)
        })
    })
})

module.exports = router