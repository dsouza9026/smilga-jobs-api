require('dotenv').config();
const mongoose = require('mongoose')

const SessionsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'],
        uniquie: true
    },
    BeelinksToken: {
        type: String, 
        required: true
    },
    clientIp: { 
        type: String, 
        required: true 
    },
},
{timestamps: true}
)

module.exports = mongoose.model('Sessions', SessionsSchema);