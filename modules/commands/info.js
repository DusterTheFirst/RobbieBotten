Mechan = require('mechan.js');

module.exports = (handler, database, client) => {
    handler.createCommand('info')
        .setDescription('Get some of dat info')
        .setCategory('Info Commands')
        .setCallback((context) => {
            var builder = new Mechan.Discord.RichEmbed();
            
            var time = process.uptime();
            var uptime = (time + "").toHHMMSS();
        
            builder.setTitle("Robbie Botten - Info");
            builder.setColor(context.message.guild.me.displayColor);
            builder.setDescription(`Robbie Botten is a discord bot designed for Grandayy's discord server. \nType ***${handler.config.prefix}help*** for all commands`);
            builder.setThumbnail(client.user.displayAvatarURL);
            builder.addField("Bot Info", "Written In: *[javascript](https://www.javascript.com/), running the [node.js](https://nodejs.org/en/) framework*\nVersion: *2.0*\nRuns On: *[discord.js](https://discord.js.org/#/)* and *[mechan.js](https://github.com/DusterTheFirst/mechan.js)*\nSource Code: *[GitHub](https://github.com/DusterTheFirst/RobbieBotten)*\nWebpanel: *[grandayy.github.io](https://grandayy.github.io)*", true);
            builder.addField("Stats", `Uptime: *${uptime}*\nPing: *${client.ping}ms*\nLines: *Wayy too many*\nTime Wasted: *A lot*`, true);
            builder.addField("Credits", "Avatar: *Carrotzy*\nBot: *DusterTheFirst*\nmechan.js: *DusterTheFirst*\ndiscord.js: *hydrabolt* and contributors", false);
            
            context.channel.send("", { embed: builder });
        });

    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - hours * 3600) / 60);
        var seconds = sec_num - hours * 3600 - minutes * 60;
    
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    };
}