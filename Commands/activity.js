module.exports = {
    name: 'activity',
    permissions: ["ADMINISTRATOR"],
    aliases: ['ac'],
    description: 'Sets bot activity',
async execute(message, args, cmd, client, discord, profileData){



if(args[0] === "playing"){
    types = 0
} else if (args[0] === "streaming") {
    types = 1
} else if (args[0] === "listening") {
    types = 2
} else if (args[0] === "watching") {
    types = 3
} else if (args[0] === "competing") {
    types = 5
} else if (args[0] === "reset") {

    client.user.setActivity(`https://twitch.tv/IFujjaI`, {type:"STREAMING"}); //you can change that to whatever you like

    return message.channel.send('Status changed succesfully');

} else {
    return message.channel.send('Invalid activity type.');
}
//here you tell the bot what the activity is
    args.shift()
    content = args.join(' ');
    client.user.setPresence({
        activity: {
            name: content,
            type: types

          }
        })
    }
};
 
    //return message.channel.send('Status changed succesfully');