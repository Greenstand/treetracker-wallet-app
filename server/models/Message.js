// model used to fetch messages
function getMessage(
    messageRepository
){
   return async function (channel, from, to, filter=null) {
    const messages = await messageRepository.checkMessage(channel, from, to, filter);
    return messages;
   }
}

module.exports = {getMessage};