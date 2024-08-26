// model used to fetch messages
function getMessage(
    messageRepository
){
   return async function (channel, from, to) {
    const messages = await messageRepository.checkMessage(channel, from, to);
    return messages;
   }
}

module.exports = {getMessage};