// const MessageModel = require('../models/messages.model')

// class MessageDao {
    
//     async find(){
//         try {
//             const messages = await MessageModel.find()
//             return messages
//         } catch (error) {
//             return error
//         }
//     }

//     async create(newMessage){
//         try {
//             const response = await MessageModel.create(newMessage)
//             return response
//         } catch (error) {
//             return response
//         }
//     }

//     async deleteMany(){
//         try {
//             await MessageModel.deleteMany()
//             return 'Mensajes Eliminados'
//         } catch (error) {
//             return error 
//         }
//     }
// }

// module.exports = MessageDao
const MessageModel = require('../models/messages.model')

 class MessageManager {
  constructor() {
    console.log("Working with messages using MongoDB");
  }

  getMessages = async () => {
    const messages = await MessageModel.find().lean();
    return messages;
  };

  create = async (message) => {
    const result = await MessageModel.create(message);
    return result;
  };
}
module.exports = MessageManager