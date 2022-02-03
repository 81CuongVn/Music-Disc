const { MessageEmbed } = require('discord.js');
const embed = require('../embeds/embeds.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {

        let title = client.user.username;
        let thumbnail = client.user.displayAvatarURL();
        const commands = client.commands.filter(x => x.showHelp !== false);
        let description = `**Available - ${commands.size} Command Available**\n` + commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | ');

        return message.channel.send({ embeds: [embed.Embed_help(title, thumbnail, description)] });
    },
};
