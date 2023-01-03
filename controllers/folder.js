const Folder = require('../models/folder');
const Flashcard = require('../models/flashcard');

exports.add = async (req, res) => {
    try {
        const { title, category, revision } = req.body;
        const user = req.user;

        const newFolder = new Folder({
            userId: user._id,
            title: title,
            category: category
        });

        const folderAdded = await newFolder.save();

        res.status(200).json({folder: folderAdded});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.getAll = async (req, res) => {
    try {
        const user = req.user;

        const folders = await Folder.find({userId: user._id});

        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.getOne = async (req, res) => {
    try {
        const user = req.user;

        const folder = await Folder.findOne({_id: req.params.folderid,userId: user._id});

        res.status(200).json(folder);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.update = async (req, res) => {
    try {
        const user = req.user;

        const folderUpdated = await Folder.updateOne({_id: req.params.folderid,userId: user._id}, { $set: {title: req.body.title, category: req.body.category}});

        res.status(200).json(folderUpdated);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.delete = async (req, res) => {
    try {
        const user = req.user;

        await Flashcard.deleteMany({folderId: req.params.folderid, userId: user._id})

        await Folder.deleteOne({_id: req.params.folderid,userId: user._id});

        res.status(200).json({message: 'the folder ' + req.params.folderid + 'has been deleted successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};