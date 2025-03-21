
const { default: mongoose } = require('mongoose');
const PostCollection = require('../models/PostCollection')

const createPost = async (req, res) => {
    try {
        const { title, description, file } = req.body;
        const { _id } = req.user;
        let post = await PostCollection.create({
            title,
            description,
            file,
            userId: _id
        })
        res.status(201).json({ msg: "post created successfully", success: true })
    } catch (error) {
        res.status(500).json({ msg: 'error in creating post', error: error.message })
    }
}
const updatePost = async (req, res) => {

}
const deletePost = async (req, res) => {

}
const getAllYouPost = async (req, res) => {
    let {_id} = req.user
    let posts = await PostCollection.find({userId:_id}).populate({path:'userId',select:'-password'}).sort({createdAt:-1}).populate({path:'comment',populate:{path:'userId',select:"profilePic name"}})
    res.status(200).json({posts})
}

const allUsersPost = async (req, res) => {
    let posts = await PostCollection.find().populate({path:'userId',select:'-password'}).sort({createdAt:-1}).populate({path:'comment',populate:{path:'userId',select:"profilePic name"}})
    res.status(200).json({posts})
}

const likesPost = async(req,res)=>{
    let {postId} = req.params;
    const { _id } = req.user;

   try {
    let post = await PostCollection.findById(postId)
    if(post.likes.includes(_id)){
        post.likes.pull(_id)
        await post.save()
        res.status(200).json({msg:'post disliked successfully'})
    }
    else{
        post.likes.push(_id)
        await post.save()
        res.status(200).json({msg:'post liked successfully'})
    }
   } catch (error) {
    res.status(500).json({error:error.message})
   }   
}

const commentPost = async(req,res)=>{
    let {postId} = req.params;
    const { _id } = req.user;
    let {text} = req.body;

    let post = await PostCollection.findById(postId);

    post.comment.push({userId:_id, text:text})
    await post.save()

    res.status(200).json({msg:"comment added successfully"})

}

const deleteComment = async(req,res)=>{
    const {postId, commentId} = req.params;
    // console.log(postId)
    // console.log(commentId)

    let post = await PostCollection.findById(postId);
   let filterArr =  post.comment.filter((comnt)=>comnt._id.toString()!==commentId)
    post.comment = filterArr
    await post.save()
    res.status(200).json({msg:"comment deleted successfully"})
}

const friendPost = async(req,res)=>{
   try {
    let {friendId} = req.params;

    let posts = await PostCollection.find({userId:friendId}).populate({path:'userId',select:'-password'}).sort({createdAt:-1}).populate({path:'comment',populate:{path:'userId',select:"profilePic name"}});

    res.status(200).json({posts})
   } catch (error) {
    res.status(200).json({error:error.message})
   }

}



module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllYouPost,
    allUsersPost,
    likesPost,
    commentPost,
    deleteComment,
    friendPost
}

