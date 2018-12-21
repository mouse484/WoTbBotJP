require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const set = {
    token: process.env.BOT_TOKEN,
    owner: "348385393160355840",
    prefix:"w!",
    api_key: process.env.API_KEY
};

const command = require("./files/bot/command.js");

client.login(set.token);

client.on("ready", () => {
    console.log(`起動しました！　${client.user.tag}`);
    client.user.setActivity(`w!help|${client.user.tag}`);
});

client.on("message", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(set.prefix)) {
        command.run(client, message, set);
    }
});
