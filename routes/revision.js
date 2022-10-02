const express = require('express')
const {check} = require('express-validator')
const Revision = require('../controllers/revision')
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')

const router = express.Router()

router.get('/getflashcards/:folderid', authenticate, Revision.getFlashcards);

router.put('/updateflashcard', [
    check('attempt').not().isEmpty().withMessage('The attempt field is required.'),
], validate, authenticate, Revision.updateFlashcard)

module.exports = router