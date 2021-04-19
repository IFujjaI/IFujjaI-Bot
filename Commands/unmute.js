module.exports = {
    name: 'unmute',
    permissions: ["ADMINISTRATOR", "MANAGE_ROLES"],
    description: "This unmutes a member!",
    execute(message, args, cmd, client, discord, profileData) {
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.add(mainRole.id);
            memberTarget.roles.remove(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> The member has been unmuted.`)
        } else {
            message.channel.send('Cant find that member!');
        }
    }
}