const express = require('express');
const {check} = require('express-validator');
const Flashcard = require('../controllers/flashcard');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/all/:folderid', Flashcard.getAll);

router.get('/:flashcardid', Flashcard.getOne);

router.post('/add/:folderid', [
    check('front').not().isEmpty().withMessage('The front content of card is required.'),
    check('back').not().isEmpty().withMessage('The back content of card is required.')
], validate, Flashcard.add);

router.patch('/:flashcardid', [
    check('front').not().isEmpty().withMessage('The front content of card is required.'),
    check('back').not().isEmpty().withMessage('The back content of card is required.'),
], validate, Flashcard.update);

router.delete('/:flashcardid', Flashcard.delete);

module.exports = router;