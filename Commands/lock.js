module.exports = {
    name: 'lock',
    aliases: ['lc'],
    permissions: ["ADMINISTRATOR"],
    cooldown: 0,
    description: 'locks channels',
    async execute(message, args, cmd, client, Discord, profileData) {
        const role = message.guild.roles.cache.get('690202182510706824');
        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if (!lockChannel) lockChannel = message.channel;

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: false
        }).catch(err => console.log(err));
        message.channel.send('Channel has been locked :lock:')
    }
}