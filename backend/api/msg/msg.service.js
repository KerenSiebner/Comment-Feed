const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('msg')
        // const msgs = await collection.find(criteria).toArray()
        var msgs = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    localField: 'aboutUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'aboutUser'
                }
            },
            {
                $unwind: '$aboutUser'
            }
        ]).toArray()
        msgs = msgs.map(msg => {
            msg.byUser = { _id: msg.byUser._id, fullname: msg.byUser.fullname }
            msg.aboutUser = { _id: msg.aboutUser._id, fullname: msg.aboutUser.fullname }
            delete msg.byUserId
            delete msg.aboutUserId
            return msg
        })

        return msgs
    } catch (err) {
        logger.error('cannot find msgs', err)
        throw err
    }

}



async function add(msgToAdd) {
    console.log('msgToAdd', msgToAdd)
    try {
        const collection = await dbService.getCollection('comment_db')
        await collection.insertOne(msgToAdd)
        return msgToAdd
    } catch (err) {
        logger.error('cannot insert msg', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

module.exports = {
    query,
    add
}


