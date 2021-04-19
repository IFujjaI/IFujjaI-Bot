module.exports = {
    name: "balance",
    aliases: ["bal"],
    permissions: ["SEND_MESSAGES"],
    description: "Check the user balance",
    execute(message, args, cmd, client, discord, profileData) {
      message.channel.send(`Your wallet bal is ${profileData.coins}, you banks bal is ${profileData.bank}`);
    },
  };