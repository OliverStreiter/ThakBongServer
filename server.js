require('dotenv').config()


const express = require('express')
const cors = require('cors')
const pool = require("./db")

const corsOptions ={
    origin:['http://localhost:8080', 'http://localhost:8081'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors(corsOptions));


//ROUTES//
const siteRouter = require('./routes/site')
const objectRouter = require('./routes/object')
const countryRouter = require('./routes/country')
const communityRouter = require('./routes/community')
const landmassRouter = require('./routes/landmass')
const projectRouter = require('./routes/project')
const userRouter = require('./routes/user')

app.use('/api/site', siteRouter)
app.use('/api/object', objectRouter)
app.use('/api/country', countryRouter)
app.use('/api/community', communityRouter)
app.use('/api/landmass', landmassRouter)
app.use('/api/landmass', landmassRouter)
app.use('/api/project', projectRouter)
app.use('/api/user', userRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server Started')
})