module.exports = {
    name: 'ban',
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS" ],
    description: "This command bans a member!",
    execute(message, args, cmd, client, discord, profileData){
        const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.ban();
            message.channel.send("User has been banned");
        }else{
            message.channel.send(`You coudn't ban that member!`);
        }
    }
}