module.exports = {
    name: 'warn',
    aliases: [''],
    permissions: ["ADMINISTRATOR"],
    cooldown: 0,
    description: 'warns people',

    async execute(message, args, cmd, client, Discord, profileData) {

        const warnRole1 = message.guild.roles.cache.find(role => role.name == '[Warning: 1]');
        const warnRole2 = message.guild.roles.cache.find(role => role.name == '[Warning: 2]');
        const warnRole3 = message.guild.roles.cache.find(role => role.name == '[Warning: 3]');
        const mentionedMember = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        let punishment = 1;
        let reason = args.slice(2).join(" ");

        if(!warnRole1) await message.guild.create({
            data: {
                name: '[Warning: 1]',
                color: 'GRAY'
            }
        }).catch(err => console.log(err));

        if(!warnRole1) await message.guild.create({
            data: {
                name: '[Warning: 2]',
                color: 'GRAY'
            }
        }).catch(err => console.log(err));

        if(!warnRole1) await message.guild.create({
            data: {
                name: '[Warning: 3]',
                color: 'GRAY'
            }
        }).catch(err => console.log(err));

        //-warn @member [add, remove] [reason]
        if(!args[0]) return message.channel.send('You need to state a member along that you are just checking adding for removing warnings.');
        if(!mentionedMember) return message.channel.send('The member mentioned is not in the server.');
        if(!reason) reason = 'No reason provided.';

        if(mentionedMember.roles.cache.has(warnRole1.id)) punishment = 2;
        if(mentionedMember.roles.cache.has(warnRole2.id)) punishment = 3;
        if(mentionedMember.roles.cache.has(warnRole3.id)) punishment = 4;

        if(!['add', 'remove'].includes(args[1])) {
            if(punishment === 1) {
                return message.channel.send(`${mentionedMember.user.tag} has no warnings.`);
            } else if(punishment == 2) {
                return message.channel.send(`${mentionedMember.user.tag} has one warnings.`);
            } else if(punishment == 3) {
                return message.channel.send(`${mentionedMember.user.tag} has two warnings.`);
            } else if(punishment == 4) {
                return message.channel.send(`${mentionedMember.user.tag} has three warnings.`);
            }
        } else {
            if(args[1] == 'add') {
                if(punishment === 1) {
                    await mentionedMember.roles.add(warnRole1.id).catch(err => console.log(err));
                    return message.channel.send(`${mentionedMember}, you have been warned for: ${reason}`)
                    
                } else if(punishment == 2) {
                    await mentionedMember.roles.add(warnRole2.id).catch(err => console.log(err));
                    await mentionedMember.roles.remove(warnRole1.id).catch(err => console.log(err));
                    return message.channel.send(`${mentionedMember}, you have been warned for: ${reason}`)
                } else if(punishment == 3) {
                    await mentionedMember.roles.add(warnRole3.id).catch(err => console.log(err));
                    await mentionedMember.roles.remove(warnRole2.id).catch(err => console.log(err));
                    return message.channel.send(`${mentionedMember}, you have been warned for: ${reason}`)
                } else if(punishment == 4) {
                    
                }
            } else if(args[1] == 'remove'){
                if(punishment === 1) {
                    return message.channel.send(`${mentionedMember.user.tag} has no warning to remove.`)
                    
                } else if(punishment == 2) {
                    await mentionedMember.roles.remove(warnRole1.id).catch(err => console.log(err));
                    return message.channel.send(`I removed a warning from ${mentionedMember.user.tag}`);
                } else if(punishment == 3) {
                    await mentionedMember.roles.remove(warnRole2.id).catch(err => console.log(err));
                    return message.channel.send(`I removed a warning from ${mentionedMember.user.tag}`);
                } else if(punishment == 4) {
                    await mentionedMember.roles.remove(warnRole3.id).catch(err => console.log(err));
                    return message.channel.send(`I removed a warning from ${mentionedMember.user.tag}`);
                    
                }
            }
        }
    }
}