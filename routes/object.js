const express = require('express')
const router = express.Router()
const pool = require("../db")


// Get sites by community
router.get('/community/:community_name', async (req, res) => {
    try{
        console.log(req.params.community_name)
        // const items = await Site.find({ geo:{country_name: req.params.country} })
        const items = await Site.find({ 
            "geo.community": req.params.community_name
        })
        res.json(items)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Get all
router.get("/", async (req, res) => {
    try {
        const items = await pool.query("SELECT * FROM objectview limit 10")
        res.json(items.rows)
    }catch(err){
        console.error(err.message)
    }
})

// Get one by id
router.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const items = await pool.query("SELECT * FROM objectview where id = $1", [id])
        res.json(items.rows[0])
    }catch(err){
        console.error(err.message)
    }
})


module.exports = router