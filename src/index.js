const { Client, Intents } = require('discord.js');

require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Beep beep! I am ready!');
});

client.login(process.env.BOT_TOKEN);