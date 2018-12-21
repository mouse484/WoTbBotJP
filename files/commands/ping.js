module.exports.set = {
    name: "ping",
    aliases: ["ping"],
    allow: [],
    nochannel: [""],
    category: "bot",
    description: "botのpingを表示します",
    detail: "",
};

module.exports.run = (client, message) => {
    message.channel.send("<a:loading:482420749668188170> | Ping を確認しています...")
        .then((beforemsg) =>
            beforemsg.edit(`
${Math.round(client.ping)} ms
${beforemsg.createdTimestamp - message.createdTimestamp} ms
`));
};
