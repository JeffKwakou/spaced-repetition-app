const express = require('express');
const {check} = require('express-validator');
const Folder = require('../controllers/folder');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/all', Folder.getAll);

router.get('/:folderid', Folder.getOne);

router.post('/add', [
    check('title').not().isEmpty().withMessage('The title is required.'),
    check('category').not().isEmpty().withMessage('The category is required.'),
], validate, Folder.add);

router.put('/:folderid', [
    check('title').not().isEmpty().withMessage('The title is required.'),
    check('category').not().isEmpty().withMessage('The category is required.'),
], validate, Folder.update);

router.delete('/:folderid', Folder.delete);

module.exports = router;