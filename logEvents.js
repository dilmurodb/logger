const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const path = require('path')
const fsPromises = require('fs').promises
const fs = require('fs')

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem)
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'logEvents.txt'), logItem)
    } catch (err) {
            console.error(err)
        }
}



module.exports = logEvents

// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))
// console.log(uuid())