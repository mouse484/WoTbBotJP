const fs = require("fs");//ファイル操作用モジュール

module.exports.run = (client, message, set) => {
    client.user.setStatus("idle");

    fs.readdir("/Esc/WoTbBotJP/files/commands/", (error, files) => {//コマンドの読み込み
        files.some((file) => {
            const aliases = [];
            let command = require(`../commands/${file}`);
            command.set.aliases.forEach((alias) => aliases.push(alias));
            if (aliases.includes(message.content.slice(set.prefix.length).split(" ")[0])) {
                if (command.set.nochannel.includes(message.channel.type)) {
                    client.user.setStatus("dnd");
                    message.reply(`${message.channel.type}では実行できないコマンドです`);
                    return;
                }
                if (command.set.allow.includes("OWNER")) {
                    if (message.author.id !== set.owner) {
                        client.user.setStatus("dnd");
                        message.reply("製作者(mouse#2240)専用のコマンドです");
                        return;
                    }
                } else if (message.guild) {
                    if (!message.member.hasPermission(command.set.allow)) {
                        client.user.setStatus("dnd");
                        message.reply("必要な権限がありません");
                        return;
                    }
                }
                command.run(client, set, message);
            }
        });
    });

};
