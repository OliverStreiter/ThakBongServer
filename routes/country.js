const express = require('express')
const router = express.Router()
const pool = require("../db")


// Get all
router.get('/', async (req, res) => {
    try {
        const items = await pool.query("SELECT * FROM countryview")
        res.json(items.rows)
    }catch(err){
        console.error(err.message)
    }
})



module.exports = router