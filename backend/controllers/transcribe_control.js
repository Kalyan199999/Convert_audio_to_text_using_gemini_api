const conversion = require('./convert')
const Podcast = require('../models/transcraption')

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
        const filePath = path.join(__dirname, "../uploads", req.file.filename);

        const { summary } = req.body
 
        let prompt = "Write the summary of the audio file!";

        if(!summary)
        {
            prompt = "Write the complete description of the audio file!";
        }

        const result = await conversion( filePath , prompt )

        console.log(result);

        if( !result.ok ){

            return res.status(404).json({
                message: "Error in API call!",
                ok:false
            })
        }
        
        return res.status(200).json({
            message: "This is a post method of transcribe!",
            ok:true,
            data:result.text
         })
        
    } 
    catch (error) 
    {
        return res.status(404).json({
            message: "This is a post method error",
            ok:false
        })
    }
}

module.exports = {
    getMethod,
    postMethod
}