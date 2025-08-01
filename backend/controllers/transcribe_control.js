
const conversion = require('./convert')

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
        return res.status(200).json({message: "This is a post method"})
        
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