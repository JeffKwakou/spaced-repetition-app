const express = require('express');
const {check} = require('express-validator');
const Revision = require('../controllers/revision');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/getflashcards/:folderid', Revision.getFlashcards);

router.put('/updateflashcard', [
    check('attempt').not().isEmpty().withMessage('The attempt field is required.'),
], validate, Revision.updateFlashcard);

module.exports = router;