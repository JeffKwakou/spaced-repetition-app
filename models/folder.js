const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    title: {
        type: String,
        required: 'The title of folder is required',
    },

    category: {
        type: String,
        required: 'The category of folder is required',
    },

    type_repetition: {
        type: String,
        default: 'standard'
    },
}, {timestamps: true});

module.exports = mongoose.model('Folders', folderSchema);