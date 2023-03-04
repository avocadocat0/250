const fs = require('node:fs')
const path = require('node:path')

const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
const { token, guildId, botId, devId, logChannelId } = require('./config')
const { logger } = require('./func/time')


const avocado = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds
        ]
    }
)

avocado.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command){
        avocado.commands.set(command.data.name, command)
    } else {
        console.log(logger(), ' ⚠️ 파일(명령어) 형식이 올바르지 않습니다.')
    }
}

avocado.once(Events.ClientReady, c => 
    {
        console.log(logger(), '✅ 로그인.')

        setTimeout(function() {
            avocado.channels.cache.get(logChannelId).send(logger() + ' 봇이 온라인입니다. `' + avocado.ws.ping + 'ms`')
        }, 3000)
    }    
)

avocado.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error(`${logger()} ⚠️ ${interaction.commandName} 명령어를 찾을 수 없습니다.`)
    }

    try {
        await command.execute(interaction)
    } catch(error) {
        console.error(error)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(
                {
                    content: '⚠️',
                    ephemeral: true
                }
            )
        } else {
            await interaction.reply(
                {
                    content: '⚠️',
                    ephemeral: true
                }
            )
        }
    }
})

avocado.login(token)