const mongoose = require('mongoose')

const AdminSessionSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { collation: 'adminSessions' })

mongoose.model('AdminSession', AdminSessionSchema)