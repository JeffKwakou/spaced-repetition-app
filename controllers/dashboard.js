const Flashcard = require('../models/flashcard');
const Folder = require('../models/folder');
const User = require('../models/user');

exports.getDistributionCardByFolders = async (req, res) => {
    try {
        const user = req.user;

        const folders = await Folder.find({userId: user._id});

        const cardGrouped = await Flashcard.aggregate([
            {
                $match : {
                    userId : user._id
                }
            },
            {
                $group: {
                    _id: '$folderId',
                    count: { $sum: 1 }
                }
            }
        ]);

        const totalCard = cardGrouped.reduce((acc, item) => {
            return acc + item.count;
        }, 0);

        let result = [];

        cardGrouped.forEach((item) => {
            let id = item._id.toString();

            const found = folders.find(element => element._id == id);

            if (found != undefined) {
                result.push({
                    folderName: found.title,
                    percentage: Math.floor(item.count / totalCard * 100)
                });
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.revisionCountPercentage = async (req, res) => {
    try {
        const user = req.user;

        const total = user.standardRevisionCount + user.quizRevisionCount + user.qcmRevisionCount

        let response = [
            {
                revisionType: "Standard",
                percentage: user.standardRevisionCount != 0 ? Math.floor(user.standardRevisionCount / total * 100) : 0
            },
            {
                revisionType: "Quiz",
                percentage: user.quizRevisionCount != 0 ? Math.floor(user.quizRevisionCount / total * 100) : 0
            },
            {
                revisionType: "QCM",
                percentage: user.qcmRevisionCount != 0 ? Math.floor(user.qcmRevisionCount / total * 100) : 0
            }
        ]

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

exports.answerRevisionCountPercentage = async (req, res) => {
    try {
        const user = req.user;

        const total = user.veryGoodAnswerCount + user.goodAnswerCount + user.averageAnswerCount + user.badAnswerCount + user.notAllAnswerCount

        let response = [
            {
                answerType: "Very good",
                percentage: user.veryGoodAnswerCount != 0 ? Math.floor(user.veryGoodAnswerCount / total * 100) : 0
            },
            {
                answerType: "Good",
                percentage: user.goodAnswerCount != 0 ? Math.floor(user.goodAnswerCount / total * 100) : 0
            },
            {
                answerType: "Average",
                percentage: user.averageAnswerCount != 0 ? Math.floor(user.averageAnswerCount / total * 100) : 0
            },
            {
                answerType: "Bad",
                percentage: user.badAnswerCount != 0 ? Math.floor(user.badAnswerCount / total * 100) : 0
            },
            {
                answerType: "Not all",
                percentage: user.notAllAnswerCount != 0 ? Math.floor(user.notAllAnswerCount / total * 100) : 0
            },
        ]

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};