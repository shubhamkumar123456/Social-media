
const userCollection = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mySecret@123'
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");

const registerUser = async (req, res) => {
    // res.send("register is running")
    const { name, email, phone, password } = req.body;

    try {
        let hashedPassword = bcrypt.hashSync(password, salt);

        let data = await userCollection.create({
            name,
            email,
            password: hashedPassword,
            phone
        })

        res.status(201).json({ msg: "user registered successfully" });
    } catch (error) {
        res.status(500).json({ msg: "error in creating user", error: error.message })
    }



}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.json({ msg: "all fields are required" })
    }
    try {
        let user = await userCollection.findOne({ email });
        if (user) {
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (comparePassword) {
                // let token = jwt.sign({}, secretKey)
                let token = jwt.sign({ _id: user._id }, JWT_SECRET)
                res.cookie('token', token)
                res.status(200).json({ msg: "user log in successfully", token })

            }
            else {
                return res.status(401).json({ msg: "inavlid credentials" })
            }
        }
        else {
            res.status(404).json({ msg: "user not found please sign up" })
        }
    } catch (error) {
        res.status(500).json({ msg: "error in login user", error: error.message })
    }
}
const updateUser = async (req, res) => {
    // res.send("update is running");
    const { name, password, phone, profilePic, coverPic, bio } = req.body;
    const id = req.user._id

    if (password) {
        var hashedPassword = bcrypt.hashSync(password, salt)
    }
    let data = await userCollection.findByIdAndUpdate(id, { name, password: hashedPassword, profilePic, coverPic, bio, phone }, { new: true });
    res.status(200).json({ msg: "updated successfully", data });

}

const deleteUser = async (req, res) => {
    // const  {id} = req.params;
    console.log(req.user)
    try {
        let data = await userCollection.findByIdAndDelete(req.user._id)
        res.status(200).json({ msg: "user deleted successfully" })

    } catch (error) {
        res.status(500).json({ msg: "error in deleting user", error: error.message })
    }

}

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    let user = await userCollection.findOne({ email });

    if (user) {
        let resetToken = randomstring.generate(25)
        user.passwordResetToken = resetToken;
        await user.save()
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "clboy768@gmail.com",
                pass: "guot dszi tfya btlt",
            },
        });

        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: 'clboy768@gmail.com', // sender address
                to: email, // list of receivers
                subject: "Password reset Request", // Subject line
                text: ` please click the link  below to reset your password \n http://localhost:8080/users/passwordToken/${resetToken}`, // plain text body

            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }

        main().catch(console.error);
        res.json({ msg: "please check email for further informations" })
    }
    else {
        return res.status(404).json({ msg: "user not found" })
    }
}

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    let user = await userCollection.findOne({ passwordResetToken: token })
    let hashedPassword = bcrypt.hashSync(password, salt)
    user.password = hashedPassword
    user.passwordResetToken = null
    await user.save();
    res.status(200).json({ msg: "password updated successfully" })
}

const getLoggedInUser = async (req, res) => {
    // console.log(req.user)
    res.status(200).json(req.user)
}

const searchUser = async (req, res) => {
 try {
    let { name } = req.query;
    console.log(name);
    if(name===''){
       return res.json({users:[]})
    }
    // let regex = new RegExp();

    let users = await userCollection.find({ name: new RegExp(name) })
    console.log(users)

    res.status(200).json({users})
 } catch (error) {
    res.status(500).json({error:error.message})
 }

}

const getFriend = async(req,res)=>{
        const {friendId} = req.params;
       try {
        let user  = await userCollection.findById(friendId).select('-password');
        return res.status(200).json({user})
       } catch (error) {
        res.status(500).json({error:error.message})
       }
}

const followUser = async(req,res)=>{
    let {_id} = req.user;
    let {friendId} = req.params;

 try {
    let user = await userCollection.findById(_id).select('-password');
    let friend = await userCollection.findById(friendId).select('-password');

    if(!user.followings.includes(friend._id)){
        user.followings.push(friend._id)
        friend.followers.push(user._id)
        await user.save()
        await friend.save()
        res.status(200).json({msg:"follow successfully",user,friend})
    }
    else{
        user.followings.pull(friend._id)
        friend.followers.pull(user._id)
        await user.save()
        await friend.save()
        res.status(200).json({msg:"unfollow successfully",user,friend})
    }
 } catch (error) {
    res.status(500).json({error:error.message})
 }
}
// const UnfollowUser = async(req,res)=>{
//     let {_id} = req.user;
//     let {friendId} = req.params;

//  try {
//     let user = await userCollection.findById(_id);
//     let friend = await userCollection.findById(friendId);

//     if(user.followings.includes(friend._id)){
//         user.followings.pull(friend._id)
//         await user.save()
//     }
//     res.status(200).json({msg:"follow successfully"})
//  } catch (error) {
//     res.status(500).json({error:error.message})
//  }
// }

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    forgetPassword,
    resetPassword,
    getLoggedInUser,
    searchUser,
    getFriend,
    followUser
}