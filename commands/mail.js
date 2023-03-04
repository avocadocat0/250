const { SlashCommandBuilder } = require('discord.js')
const nodemailer = require('nodemailer')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('메일')
        .setDescription('메일을 전송합니다.')
        .addStringOption(option => 
            option.setName('이메일')
                .setDescription('이메일을 받을 주소를 입력하세요.')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('제목')
                .setDescription('이메일의 제목을 입력하세요.')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('내용')
                .setDescription('내용을 작성하세요.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const address = interaction.options.getString('이메일')
        const title = interaction.options.getString('제목')
        const content = interaction.options.getString('내용')

        async function main() {
            const testAccount = await nodemailer.createTestAccount()

            const transporter = nodemailer.createTransport(
                {
                    host: 'smtp.ethereal.email',
                    port: 587,
                    secure: false,
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass
                    }
                }
            )
    
            const info = await transporter.sendMail(
                {
                    from: '250으로부터 전송된 메일.',
                    to: address,
                    subject: title,
                    text: '250',
                    html: `<b>${content}<b>`,
                }
            )
        }
        main().catch(console.error)

        const embed = {
            color: 0x7289DA,
            title: '`✅`',
            description: '이메일이 성공적으로 전송되었습니다.\n받은 편지함을 확인해주세요.',
            footer: {
                text: address
            }
        }

        await interaction.reply({ embeds: [embed] })
    }
}