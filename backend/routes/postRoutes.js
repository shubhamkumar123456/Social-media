const express = require('express');
const { createPost, updatePost, deletePost, getAllYouPost, allUsersPost, likesPost, commentPost, deleteComment, friendPost } = require('../controllers/postController');
const checkToken = require('../middleware/checkToken');
const router = express.Router();

router.post('/create',checkToken,createPost);
router.put('/update/:postId',checkToken,updatePost);
router.delete('/delete/:postId',checkToken,deletePost);
router.get('/allUsersPosts',checkToken,allUsersPost);
router.get('/yourPosts',checkToken,getAllYouPost);
router.get('/likePost/:postId',checkToken,likesPost)
router.post('/commentPost/:postId',checkToken,commentPost)
router.delete('/commentDelete/:postId/:commentId',deleteComment)
router.get('/friendPost/:friendId',checkToken,friendPost)





module.exports =  router