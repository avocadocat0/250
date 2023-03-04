const { Client, Events, GatewayIntentBits } = require('discord.js')
const { token, guildId, botId, devId, logChannelId } = require('./config')
const { logger } = require('./func/time')

const Dokdo = require('dokdo')

const avocado = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages
        ]
    }
)
const avocaDokdo = new Dokdo(avocado, 
    {
        aliases: ['dokdo', 'dok'],
        prefix: '!'
    }    
)

avocado.once(Events.ClientReady, c => 
    {
        console.log(logger(), '✅ 로그인.')

        avocado.channels.cache.get(logChannelId)
            .send(logger() + ' 봇이 온라인입니다. `' + avocado.ws.ping + 'ms`')
    }    
)

avocado.login(token)