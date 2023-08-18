const express = require('express')
const router = express.Router()
const pool = require("../db")

// Get all
router.get('/', async (req, res) => {
    try {
        const items = await pool.query("SELECT * FROM communityview")
        res.json(items.rows)
    }catch(err){
        console.error(err.message)
    }
})

// Get all dontfindview
router.get("/dont", async (req, res) => {
    try {
        console.log("dont")
        const items = await pool.query("SELECT * FROM dontfindview")
        res.json(items.rows)
    }catch(err){
        console.error(err.message)
    }
})

// Get by country_code
router.get('/:country_code', async (req, res) => {
    const {country_code} = req.params
    try {
        const items = await pool.query("SELECT * FROM communityview where country_code = $1", [country_code])
        res.json(items.rows)
    }catch(err){
        console.error(err.message)
    }
})



// Get one
// router.get('/:id', getCommunity, async (req, res) => {
//     res.json(res.community)
// })

// Creat one
// router.post('/', async (req, res) => {
//     const newCommunity = new Community(req.body)
//     try {
//         res.status(201).json(newCommunity)
//     } catch (err) {
//         res.status(400).json({message: err.message})
//     }
// })

// Update one
// router.patch('/:id', getCommunity, async (req, res) => {
    
// })

// Delete one
// router.delete('/:id', getCommunity, async (req, res) => {
//     try {
//         await res.community.remove()
//         res.json({ message: 'Deleted Community' })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// async function getCommunity(req, res, next) {
//     let community
//     try {
//         community = await Community.findById(req.params.id)
//         if (community == null) {
//             return res.status(404).json({ message: 'Cannot find community' })
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }
  
//     res.community = community
//     next()
// }


module.exports = router