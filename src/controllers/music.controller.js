const musicModel = require("../models/music.model")
const jwt = require("jsonwebtoken")
const {uploadFile} = require("../services/storage.service")

async function createMusic(req, res) {

    console.log("Cookies received:", req.cookies);
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message : "Unauthorise"})

       
    }
    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
         if(decoded.role !== "artist"){
            return res.status(403).json({message : "You dont have access"})
        }
   

    const {title} = req.body;
    const file = req.file


    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id
    })

    res.status(201).json({
        message: "Music created succesfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })
     }catch (err){

    console.log("Error in createMusic:", err.message);
        return res.status(401).json({
            message : "Unauthorised"
        })
    }
}

module.exports = {createMusic}