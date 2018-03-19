const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

router.get('/', chatController.chat);
router.get('/new', chatController.newChat);

module.exports = router;