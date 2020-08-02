const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const GameRecordSchema  = Schema ({
    title: String,
    userId: String,
    timePlayed: Number,
    description: String, 
    //notes: Array<String>,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('gameRecords',GameRecordSchema);