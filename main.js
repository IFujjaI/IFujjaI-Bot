const Discord = require('discord.js'); 
require("dotenv").config();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const mongoose = require("mongoose");
const fs = require('fs')

client.command = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
});

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Connected to the database!");
})
.catch((err) => {
    console.log(err);
});
client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');

    guildMember.roles.add(welcomeRole)
})

client.login(process.env.DISCORD_TOKEN);