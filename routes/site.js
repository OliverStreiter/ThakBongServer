const express = require('express')
const router = express.Router()
const pool = require("../db")


// Get sites by community
router.get('/community/:community_name', async (req, res) => {
    const {community_name} = req.params
    try {
        const types = (await pool.query("SELECT * FROM dontfindview")).rows
        let sql = types.map(({ type }) => type);
        
        const items = await pool.query("SELECT * FROM siteview WHERE NOT type = ANY($1) AND community like $2", [sql, community_name])
        res.json(items.rows)
    }catch(err){
        console.error(err.message)
    }
})

// Get all
router.get("/", async (req, res) => {
    try {
        const types = (await pool.query("SELECT * FROM dontfindview")).rows
        let sql = types.map(({ type }) => type);
        
        const items = await pool.query("SELECT * FROM siteview WHERE NOT type = ANY($1) LIMIT 30", [sql])
        res.json(items.rows)
    }catch(err){
        console.error(err.message)
    }
})

// Search some by string
router.get("/search/:str", async (req, res) => {
    const {str} = req.params
    // console.log(str)
    try {
        const types = (await pool.query("SELECT * FROM dontfindview")).rows
        let sql = types.map(({ type }) => type);

        const items = await pool.query("SELECT * FROM siteview WHERE NOT type = ANY($1) AND name ILIKE '%' || $2 || '%' limit 30", [sql, str])
        res.json(items.rows)

    }catch(err){
        console.error(err.message)
        res.status(500).send(err.message)
    }
})



// Get one by name
router.get("/name/:name", async (req, res) => {
    const {name} = req.params
    // console.log(name)
    try {
        const items = await pool.query("SELECT * FROM siteview WHERE name = $1", [name])
        res.json(items.rows[0])
    }catch(err){
        console.error(err.message)
    }
})

// Get one by id
router.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const items = await pool.query("SELECT * FROM siteview WHERE id = $1", [id])
        res.json(items.rows[0])
    }catch(err){
        console.error(err.message)
    }
})



module.exports = router