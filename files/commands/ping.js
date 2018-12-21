module.exports.set = {
    name: "ping",
    aliases: ["ping"],
    allow: [],
    nochannel: [""],
    category: "bot",
    description: "botのpingを表示します",
    detail: "",
};

module.exports.run = (client, set,message) => {
    message.channel.send(`${client.ping}ms`);
};
