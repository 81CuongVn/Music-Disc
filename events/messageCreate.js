module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm')
        return;

    const prefix = client.config.prefix;

    if (message.content.indexOf(prefix) !== 0)
        return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel)
            return message.channel.send(`❌ | You are not connected to an audio channel.`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send(`❌ | You are not on the same audio channel as me.`);
    }

    if (cmd) {
        console.log(`${message.author.username} : ${message.content}`);
        cmd.execute(client, message, args);
    }
};
