const fetch = require('node-fetch');
const { Client, Intents } = require('discord.js');

require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] });

async function getRandomJoke() {
    try {
        const response = await fetch('https://witzapi.de/api/joke');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

client.once('ready', () => {
    console.log('Beep beep! I am ready!');
});

client.on('messageCreate', async(msg) => {
    if (msg.content === '!joke') {
        await getRandomJoke().then(joke => {
            msg.channel.send(joke[0].text, { tts: true })
                .then(() => console.log(`Replied to message "${msg.content}"`))
                .catch(console.error);
        }).catch(error => console.log(error));
    }
});

client.login(process.env.BOT_TOKEN);