const express = require('express')
const {log} = require('../../middlewares/logger.middleware')
const {addMsg, getMsgs} = require('./msg.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getMsgs)
router.post('/',  log, addMsg)

module.exports = router