const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Folder'
    },
    front: {
        type: String,
        required: 'The front card is required'
    },
    back: {
        type: String,
        required: 'The back card is required'
    },
    date_revision: {
        type: Date,
        default: Date.now()
    },
    easiness_factor: {
        type: Number,
        default: 2.5
    },
    correct_repetition: {
        type: Number,
        default: 0
    },
    interval: {
        type: Number,
        default: 1
    },
    info_sup: {
        type: String,
        default: null
    },
}, {timestamps: true});

module.exports = mongoose.model('Flashcards', FlashcardSchema);