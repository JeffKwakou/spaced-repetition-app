const express = require('express');
const Dashboard = require('../controllers/dashboard');

const router = express.Router();

router.get('/distribution-card-by-folder', Dashboard.getDistributionCardByFolders);

router.get('/revision-count', Dashboard.revisionCountPercentage);

router.get('/answer-count', Dashboard.answerRevisionCountPercentage);

module.exports = router;