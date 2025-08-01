const mongoose = require('mongoose')

const connectDB = async () => {
    try 
    {
      const conn = mongoose.connect(process.env.CONNECTION_STRING);
      
      console.log(`The data base is conneced!`);
      
    } 
    catch (error) 
    {
        console.log(`The data base is not conneced!`);
        
    }
    
}

module.exports = connectDB