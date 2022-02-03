const embed = require('../embeds/embeds.js');

module.exports = (client, int) => {
    if (!int.isButton())
        return;

    const queue = client.player.getQueue(int.guildId);
    const track = queue.current;

    const timestamp = queue.getPlayerTimestamp();
    const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
    let description = `Author : **${track.author}**\nDuration **${trackDuration}**`;

    switch (int.customId) {
        case 'Save Song': {
            if (!queue || !queue.playing)
                return int.reply({ content: `❌ | No music currently playing.`, ephemeral: true, components: [] });

            int.member.send({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description)] })
                .then(() => {
                    return int.reply({ content: `✅ | I sent you the name of the music in a private message.`, ephemeral: true, components: [] });
                }).catch(error => {
                    return int.reply({ content: `❌ | I can't send you a private message.`, ephemeral: true, components: [] });
                });
        }
    }
};
