module.exports = {
    name: 'ping',
    aliases: ['p'],
    permissions: ["SEND_MESSAGES"],
    cooldown: 10,
    description: "This is a ping command!",
    execute(message, args, cmd, client, discord, profileData) {
        message.channel.send('pong!')

    }
}