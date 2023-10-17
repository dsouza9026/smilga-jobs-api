require('dotenv').config();
const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position:{
        type:String,
        required: [true, 'Please provide position name'],
        maxlength: 100
    },
    status:{
        type:String,
        enum:['interview', 'declined', 'pending']
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',//Job tied to User
        required: [true, 'Please provide user'],
    }
}, 
{timestamps: true} //Gives CreatedAt and UpdatedAt automatically
)

module.exports = mongoose.model('Job', JobSchema)