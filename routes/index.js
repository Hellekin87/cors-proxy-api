const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const proxyController = require('./../controllers/proxyController');

router.get('/proxy', [
    query('url').exists().withMessage('url is required as query param!')
],
proxyController.proxied_request);
module.exports = router;