const maxVol = require("../config.json").maxVol;

module.exports = {
    name: 'volume',
    aliases: ['v'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return message.channel.send(`❌ | There is no music currently playing.`);

        const vol = parseInt(args[0]);

        if (!vol)
            return message.channel.send(`Current volume: **${queue.volume}** 🔊\n**To change the volume, with \`1\` to \`${maxVol}\` Type a number between.**`);

        if (queue.volume === vol)
            return message.channel.send(`❌ | The volume you want to change is already the current volume`);

        if (vol < 0 || vol > maxVol)
            return message.channel.send(`❌ | **Type a number from \`1\` to \`${maxVol}\` to change the volume .**`);

        const success = queue.setVolume(vol);

        return message.channel.send(success ? `Volume changed: **%${vol}**/**${maxVol}** 🔊` : `❌ | Something went wrong.`);
    },
};