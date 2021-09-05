require('dotenv').config();

const Client = require('../src/Client');
const { Intents } = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.on('ready', async () => {
    const guild = await client.guilds.fetch('561483929119358976');
    if (!guild) throw new Error('Guild could not be found.')
    console.info(`Guild id: '${guild.id}'`);
    
    const channel = await guild.channels.fetch('884026019869249586');
    if (!channel) throw new Error('Channel could not be found.')
    console.info(`Channel id: '${channel.id}'`);

    const server = await client.servers.fetch('734okr');
    if (!server) throw new Error('Server could not be found.')
    console.info(`Server name: '${server.name}'`);

    const message = await channel.send(server.name)
    console.info(`Message sent: '${message.id}'`);
    process.exit();
});

client.login();