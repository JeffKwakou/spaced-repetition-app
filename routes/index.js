const auth = require('./auth');
const user = require('./user');
const folder = require('./folder');
const flashcard = require('./flashcard')
const revision = require('./revision')

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/folder', folder);
    app.use('/api/flashcard', flashcard);
    app.use('/api/revision', revision);
};