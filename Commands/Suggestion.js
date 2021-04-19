module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion'],
    permissions: ["SEND_MESSAGES"],
    description: 'creates a suggestion!',
    execute(message, args, cmd, client, discord, profileData){
        const channel = message.guild.channels.cache.find(c => c.name === '💭suggestions');
        if(!channel) return message.channel.send('suggestions channel does not exist!');

        let messageArgs = args.join(' ');
        const embed = new discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs);

        channel.send(embed).then((msg) =>{
            msg.react('<:upvote:819342299912732684>');
            msg.react('<:downvote:819342279880998952>');
            message.delete();
        }).catch((err)=>{
            throw err;
        });
    }
}