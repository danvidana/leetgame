const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const GameRecordSchema  = Schema ({
    title: String,
    userId: String,
    timePlayed: Number,
    dateStarted: Date,
    lastPlayed: Date,
    description: String,
    genre: String,
    estimatedCompletionTime: Number, 
});

module.exports = mongoose.model('gameRecords',GameRecordSchema);