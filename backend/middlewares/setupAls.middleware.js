const asyncLocalStorage = require('../services/als.service')

async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}
  asyncLocalStorage.run(storage, () => {
    if (!req.cookies) return next()
    asyncLocalStorage.getStore()
    next()
  })
}

module.exports = setupAsyncLocalStorage

