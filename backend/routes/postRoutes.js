const express = require('express');
const { createPost, updatePost, deletePost, getAllYouPost, allUsersPost } = require('../controllers/postController');
const checkToken = require('../middleware/checkToken');
const router = express.Router();

router.post('/create',checkToken,createPost);
router.put('/update/:postId',checkToken,updatePost);
router.delete('/delete/:postId',checkToken,deletePost);
router.get('/allUsersPosts',checkToken,allUsersPost);
router.get('/yourPosts',checkToken,getAllYouPost);





module.exports =  router