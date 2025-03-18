const express = require('express');
const { createChat, getFriendChat } = require('../controllers/chatController');
const checkToken = require('../middleware/checkToken');
const router = express.Router();


router.post('/create/:friendId',checkToken,createChat)
router.get('/getFriendChat/:friendId',checkToken,getFriendChat)



module.exports = router