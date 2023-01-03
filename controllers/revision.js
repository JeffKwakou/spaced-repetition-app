const User = require('../models/user');
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

        const user = req.user;

        // Revision answer count
        switch (attempt) {
            case 1:
                await User.updateOne({_id: user._id}, {
                    $set: {
                        notAllAnswerCount: user.notAllAnswerCount + 1
                    }
                });
                break;
            case 2:
                await User.updateOne({_id: req.user._id}, {
                    $set: {
                        badAnswerCount: user.badAnswerCount + 1
                    }
                });
                break;
            case 3:
                await User.updateOne({_id: req.user._id}, {
                    $set: {
                        averageAnswerCount: user.averageAnswerCount + 1
                    }
                });
                break;
            case 4:
                await User.updateOne({_id: req.user._id}, {
                    $set: {
                        goodAnswerCount: user.goodAnswerCount + 1
                    }
                });
                break;
            case 5:
                await User.updateOne({_id: req.user._id}, {
                    $set: {
                        veryGoodAnswerCount: user.veryGoodAnswerCount + 1
                    }
                });
                break;
            default:
                console.log("bad response");
        }

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

exports.updateRevisionTypeCount = async (req, res) => {
    try {
        const { revisionType } = req.body;

        const user = await User.findOne({_id: req.user._id})

        switch (revisionType) {
            case 'standard':
                await User.updateOne({_id: user._id}, {
                    $set: {
                        standardRevisionCount: user.standardRevisionCount + 1
                    }
                });
                break;
            case 'quiz':
                await User.updateOne({_id: user._id}, {
                    $set: {
                        quizRevisionCount: user.quizRevisionCount + 1
                    }
                });
                break;
            case 'qcm':
                await User.updateOne({_id: user._id}, {
                    $set: {
                        qcmRevisionCount: user.qcmRevisionCount + 1
                    }
                });
                break;
            default:
                res.status(200).json("No revision type to update");
        }

        // res.status(200).json("Revision type updated");
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};