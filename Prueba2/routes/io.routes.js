const express = require('express');
const router = express.Router();
const ioController = require('../controllers/io.controller');
// const iosMiddleware = require('../middleware/ios.middleware');

router.get('/', ioController.chat);
// router.get('/:id', iosMiddleware.checkValidId, ioController.get);
// router.post('/', ioController.create);
// router.put('/:id', iosMiddleware.checkValidId, ioController.edit);
// router.delete('/:id', iosMiddleware.checkValidId, ioController.delete);

module.exports = router;