const auth = require('./auth');
const user = require('./user');
const folder = require('./folder');
const flashcard = require('./flashcard')
const revision = require('./revision')
const dashboard = require('./dashboard')

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/folder', authenticate, folder);
    app.use('/api/flashcard', authenticate, flashcard);
    app.use('/api/revision', authenticate, revision);
    app.use('/api/dashboard', authenticate, dashboard);
};