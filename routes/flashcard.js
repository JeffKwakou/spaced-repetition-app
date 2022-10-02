const express = require('express')
const {check} = require('express-validator')
const Flashcard = require('../controllers/flashcard')
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')

const router = express.Router()

router.get('/all/:folderid', authenticate, Flashcard.getAll);

router.get('/:flashcardid', authenticate, Flashcard.getOne);

router.post('/add/:folderid', [
    check('front').not().isEmpty().withMessage('The front content of card is required.'),
    check('back').not().isEmpty().withMessage('The back content of card is required.')
], validate, authenticate, Flashcard.add)

router.patch('/:flashcardid', [
    check('front').not().isEmpty().withMessage('The front content of card is required.'),
    check('back').not().isEmpty().withMessage('The back content of card is required.'),
    // check('info_sup').not().isEmpty().withMessage('The additionnal information is required.'),
], validate, authenticate, Flashcard.update)

router.delete('/:flashcardid', authenticate, Flashcard.delete)

module.exports = router