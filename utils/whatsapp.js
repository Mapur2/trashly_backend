/* const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')

const whatsapp = new Client({
    authStrategy: new LocalAuth()
})

whatsapp.on('qr', qr => {
    qrcode.generate(qr, {
        small: true
    })
})

whatsapp.on('message', async (message) => {
    if (message.body)
        message.reply('Hello, thus is from trashly')
})


whatsapp.on('ready', () => {
    console.log('CLient is ready')
})

module.exports = whatsapp.initialize() */