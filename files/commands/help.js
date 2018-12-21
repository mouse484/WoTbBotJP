module.exports.set = {
    name: "help",
    aliases: ["help"],
    allow: [],
    nochannel: [""],
    description: "helpを表示します"
};

const fs = require("fs");

module.exports.run = (client, set, message) => {
    let help = "";
    fs.readdir("/Esc/WoTbBotJP/files/commands/", (error, files) => {

        files.some((file) => {
            let command = require(`../commands/${file}`);
            help += `w!${command.set.name}\t:\t${command.set.description}\n`;
        });

        let embed = {
            "color": 0xffa500,
            "author": {
                "name": client.user.username,
                "icon_url": client.user.avatarURL,
            },
            "fields": [
                {
                    "name": "コマンド一覧",
                    "value": help
                },
                {
                    "name": "ℹ️",
                    "value": "バグ、質問等はmouse#2240まで"
                }
            ]
        };
        message.channel.send({ embed });
    });
};
