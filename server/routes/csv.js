const express = require('express');
const multer = require('multer');
const { exportTasks, importTasks } = require('../controllers/csvController');
const router = express.Router();
const upload = multer();

router.get('/exports', exportTasks);  // Ensure this matches the service
router.post('/imports', upload.single('file'), importTasks); // Ensure this matches the service

module.exports = router;
