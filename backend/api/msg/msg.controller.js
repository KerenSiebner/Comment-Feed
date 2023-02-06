const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service')
const msgService = require('./msg.service')

async function getMsgs(req, res) {
    try {
        const msgs = await msgService.query(req.query)
        res.send(msgs)
    } catch (err) {
        logger.error('Cannot get msgs', err)
        res.status(500).send({ err: 'Failed to get msgs' })
    }
}

async function addMsg(req, res) {
    console.log('req.body', req.body)
     
    try {
        var msg = req.body
        const addedMsg = await msgService.add(msg)

        // socketService.broadcast({type: 'msg-added', data: msg})
        // socketService.emitToUser({type: 'msg-about-you', data: msg})

        res.send(addedMsg)

    } catch (err) {
        logger.error('Failed to add msg', err)
        res.status(500).send({ err: 'Failed to add msg' })
    }
}

module.exports = {
    getMsgs,
    addMsg
}