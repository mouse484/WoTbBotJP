module.exports.set = {
    name: "ping",
    aliases: ["ping"],
    allow: [],
    nochannel: [""],
    description: "botのpingを表示します",
};

module.exports.run = (client, set,message) => {
    message.channel.send(`${client.ping}ms`);
};
