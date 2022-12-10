const Folder = require('../models/folder');
const Flashcard = require('../models/flashcard');

exports.getFlashcards = async (req, res) => {
    try {
        let flashcards = await Flashcard.find({ folderId: req.params.folderid, date_revision: { $lte: new Date()}});

        res.status(200).json({flashcards});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.updateFlashcard = async (req, res) => {
    try {
        let flashcard = req.body.flashcard;
        const { attempt } = req.body;

        let date = new Date();

        // SM-2 Algorithm
        if (attempt >= 3) {
            if (flashcard.correct_repetition == 0) {
                flashcard.date_revision = date.setDate(date.getDate() + flashcard.interval);
                flashcard.interval = 6;
            } else if (flashcard.correct_repetition == 1) {
                flashcard.date_revision = date.setDate(date.getDate() + flashcard.interval);
                flashcard.interval = Math.round(flashcard.interval * flashcard.easiness_factor);
            } else {
                flashcard.date_revision = date.setDate(date.getDate() + flashcard.interval);
                flashcard.interval = Math.round(flashcard.interval * flashcard.easiness_factor);
            }
            flashcard.correct_repetition += 1;
        } else {
            flashcard.correct_repetition = 0;
            flashcard.interval = 1;
        }

        flashcard.easiness_factor += Math.round(0.1 - (5 - attempt) * (0.08 + (5 - attempt) * 0.02));
        if (flashcard.easiness_factor < 1.3) {
            flashcard.easiness_factor = 1.3;
        }

        // Update flashcard
        const revisedCard = await Flashcard.updateOne({ _id: flashcard._id }, {
            $set: {
                date_revision: flashcard.date_revision,
                easiness_factor: flashcard.easiness_factor,
                correct_repetition: flashcard.correct_repetition,
                interval: flashcard.interval
            }
        });

        res.status(200).json(revisedCard);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};