const mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true,
        minLength:[3,'name should be greater than 3 character'],
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,

    }
},{timestamps:true})

UserSchema.add({
    passwordResetToken:{
        type:String,
        default:null
    },
    profilePic:{
        type:String
    },
    coverPic:{
        type:String
    },
    bio:{
        type:String
    }
})

module.exports = mongoose.model('users',UserSchema  )

