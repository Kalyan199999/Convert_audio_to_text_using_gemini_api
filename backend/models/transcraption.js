const mongoose = require('mongoose');

const file = mongoose.Schema({
    
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number

} , {_id:false} )

const podcastSchama = mongoose.Schema(
    {
        audio:file,
        description:String,
        summary:String
    },
    
    {timestamps: true} )


module.exports = podcastSchama;