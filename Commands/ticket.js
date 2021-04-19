module.exports = {
    name: 'ticket',
    aliases: [''],
    permissions: ["SEND_MESSAGES"],
    cooldown: 0,
    description: 'Makes tickets',
async execute(message, args, cmd, client, Discord, profileData) {

const staffRole = message.guild.roles.cache.find(role => role.name === 'Staff Team');
const channel = await message.guild.channels.create(`ticket-${message.author.username}`)

//await is only valid in async function
await channel.setParent('819348348468854814');
console.log(channel.parentID);

    channel.updateOverwrite(message.guild.id, {SEND_MESSAGES: false, 'VIEW_CHANNEL': false});
    channel.updateOverwrite(message.author, {'SEND_MESSAGES': true, 'VIEW_CHANNEL': true})

//This is the emebed that the bot sends to the new ticket channel 
    channel.send(staffRole, new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Welcome to support!')
        .setDescription(`Dear, <@${message.author.id}>\nThank you for contacting our support team! We will reach to you ASAP!`)
    )

//This is the emebed that the bot sends to the channel where the command was excuted
    message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('We will reach to you ASAP!')
        .setDescription(`<#${channel.id}>`)
    )
}};