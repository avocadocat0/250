const { REST, Routes } = require('discord.js')
const { botId, guildId, token } = require('./config')
const fs = require('node:fs')
const path = require('node:path')
const { logger } = require('./func/time')

const commands = []

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`${logger()} 명령어를 등록 중입니다. [${commands.length}]`)
        
        const data = await rest.put(
            Routes.applicationCommands(botId, guildId),
            { body: commands }
        )

        console.log(`${logger()} 명령어가 등록되었습니다. [${data.length}]`)
    } catch (error) {
        console.error(error)
    }
})();