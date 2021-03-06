const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: { 
        type: Number, 
        required: true, 
        min: [ 1 ], 
        max: [ 120 ] 
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }, 
    contactInfo: {
        type: String,
        required: true,
        trim: true,
    }
})

const friendModel = mongoose.model('Friend', FriendSchema);
module.exports = friendModel;