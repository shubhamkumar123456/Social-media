
const chatCollection = require('../models/Chat')
const Conversations = require('../models/Conversations')

const createChat = async(req,res)=>{
   try {
    const {friendId} = req.params
    const {text, file} = req.body
         let {_id} = req.user;
    let chat = await chatCollection.create({
        friendId,
        text,
        file,
        userId:_id
    })


    let conversation = await Conversations.findOne({members:{$all:[friendId,_id]}})
    if(!conversation){
        conversation = await Conversations.create({members:[friendId,_id]})
    }

    conversation.messages.push(chat._id);
    await conversation.save()


    res.status(201).json({msg:"message sent successfully"})
   } catch (error) {
        res.status(500).json({error:error.message})
   }
}


const getFriendChat = async(req,res)=>{
  try {
    let {friendId }= req.params;
    let {_id} = req.user;

    let chat = await Conversations.find({members:{$all:[friendId,_id]}}).populate('messages');
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}



module.exports = {
    createChat,
    getFriendChat
}