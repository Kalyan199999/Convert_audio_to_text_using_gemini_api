const conversion = require('./convert')
const podcastSchama = require('../models/transcraption')

// const fs = require('fs');
const path = require('path');

const getMethod =async (req, res) => {
    try 
    {
        return res.status(200).json({message: "Hello World"})
    } 
    catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const postMethod =async (req, res) => {
    try 
    {
        console.log(req.file);
        
        // const filePath = `C:\\Users\\hp\Desktop\\Transcriber\\backend\\uploads\\${req.file.filename}`

        // const filepath = `..\\${req.file.path}`

        const filePath = path.join(__dirname, "../uploads", req.file.filename);

        await conversion(filePath , "")
        
        return res.status(200).json({message: "This is a post method of transcribe!" })
        
    } 
    catch (error) 
    {
        return res.status(500).json({message: "This is a post method error"})
    }
}

module.exports = {
    getMethod,
    postMethod
}