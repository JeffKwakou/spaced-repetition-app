const express = require('express')
const {check} = require('express-validator')
const Folder = require('../controllers/folder')
const validate = require('../middlewares/validate')
const authenticate = require('../middlewares/authenticate')

const router = express.Router()

router.get('/all', authenticate, Folder.getAll);

router.get('/:folderid', authenticate, Folder.getOne);

router.post('/add', [
    check('title').not().isEmpty().withMessage('The title is required.'),
    check('category').not().isEmpty().withMessage('The category is required.'),
    check('revision').not().isEmpty().withMessage('The type of revision is required.')
], validate, authenticate, Folder.add)

router.put('/:folderid', [
    check('title').not().isEmpty().withMessage('The title is required.'),
    check('type_repetition').not().isEmpty().withMessage('The type of repetition is required.'),
    check('category').not().isEmpty().withMessage('The category is required.'),
], validate, authenticate, Folder.update)

router.delete('/:folderid', authenticate, Folder.delete)

module.exports = router