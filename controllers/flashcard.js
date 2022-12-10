const Flashcard = require('../models/flashcard');

exports.add = async (req, res) => {
    try {
        const { front, back } = req.body;
        const user = req.user;

        const newFlashcard = new Flashcard({
            userId: user._id,
            folderId: req.params.folderid,
            front: front,
            back: back
        })

        const flashcardAdded = await newFlashcard.save();

        res.status(200).json(flashcardAdded);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.getAll = async (req, res) => {
    try {
        const user = req.user;

        const flashcards = await Flashcard.find({userId: user._id, folderId: req.params.folderid});

        res.status(200).json(flashcards);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.getOne = async (req, res) => {
    try {
        const user = req.user;

        const flashcard = await Flashcard.findOne({_id: req.params.flashcardid, userId: user._id});

        res.status(200).json(flashcard);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.update = async (req, res) => {
    try {
        const user = req.user;

        const flashcardUpdated = await Flashcard.updateOne({_id: req.params.flashcardid,userId: user._id}, { $set: {front: req.body.front,back: req.body.back}});

        res.status(200).json(flashcardUpdated);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.delete = async (req, res) => {
    try {
        const user = req.user;

        await Flashcard.deleteOne({_id: req.params.flashcardid,userId: user._id});

        res.status(200).json({message: 'the flashcard ' + req.params.flashcardid + 'has been deleted successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};