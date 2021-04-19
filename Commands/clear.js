module.exports = {
    name: 'clear',
    aliases: ["delete"],
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
    description: "Clear messages!",
    async execute(message, args, cmd, client, discord, profileData) {
        if (!args[0]) return message.reply("Please enter the amount of messages to clear!");
 
        if(isNaN(args[0])) return message.reply("Please type a real number!");
 
        if(args[0] > 100) return message.reply("Please state a number less than 100 messages!");
        
        if(args[0] < 1) return message.reply("Please state a number more then 1 message!");
 
        await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)
    });
 }
}   