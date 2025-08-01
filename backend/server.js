const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config();

const connectDB = require('./config_db/connect')
const router = require('./routers/route')

const app = express()
app.use(cors())
app.use(express.json())

app.use( '/api/transcribe' , router );

app.use( '/uploads', express.static(path.join(__dirname, 'uploads') ) );

const PORT = process.env.PORT || 5001

app.listen( PORT , ()=>{
    try 
    {
        console.log(`Server is running on port ${PORT}`);
        connectDB()
    } 
    catch (error) 
    {
    console.log(`Server not started! ${error}`);
    }

} )