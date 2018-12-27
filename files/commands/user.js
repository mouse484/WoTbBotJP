module.exports.set = {
    name: "user",
    aliases: ["user"],
    allow: [],
    nochannel: [""],
    description: "userの戦績表示をします"
};

const request = require("request");

module.exports.run = (client, set, message) => {
    let user_name = message.content.split(" ")[1];
    request.post({
        uri: "https://api.wotblitz.asia/wotb/account/list/",
        json: true,
        form: {
            "application_id": set.api_key,
            "search": user_name
        }
    }, (err, res, data) => {
        let nick = "";
        data.data.map((data1, i) => {
            if (i > 10) {
                return true;
            }
            nick += `${i}:${data1.nickname}\n`;
        });
        message.channel.send(nick);


        const filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, { max: 1, time: 5000, errors: ["time"] })
            .then(collected => {
                let account_id = data.data[Number(collected.first().content)].account_id;
                message.channel.send(`ok!${collected.first().content}`);
                request.post({
                    uri: "https://api.wotblitz.asia/wotb/account/info/",
                    form: {
                        "application_id": set.api_key,
                        "account_id": account_id
                    }
                }, (err2, res2, data2) => {
                    message.channel.send(data2);
                });
            })
            .catch(() => message.channel.send("おそいぞ"));
    });

};
