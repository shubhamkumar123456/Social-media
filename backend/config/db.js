

const mongoose = require('mongoose');

const connectToDb = async()=>{
 try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MediaNew')
 console.log("mongodb connected successfully")
 } catch (error) {
    console.log({msg:"error in connecting mongodb",error:error.message})
 }
  
}

module.exports = connectToDb