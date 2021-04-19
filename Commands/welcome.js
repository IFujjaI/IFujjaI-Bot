module.exports = (client) => {
const welcomeChannel = 756599506182602814
const rulesChannel = '690207019181146156'

client.on('guildMemberAdd', (member) => {
    console.log(member)

    const message = `Welcome <@${member.id}> to ${member.guild.name}, Please check the rules: ${rulesChannel}!`

    const channel = member.guild.channels.cache.get(welcomeChannel)
    channel.send(message)
    })
}