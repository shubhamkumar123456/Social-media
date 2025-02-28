
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
    let posts = await PostCollection.find({userId:_id})
    res.status(200).json({posts})
}

const allUsersPost = async (req, res) => {
    let posts = await PostCollection.find();
    res.status(200).json({posts})
}



module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllYouPost,
    allUsersPost
}

