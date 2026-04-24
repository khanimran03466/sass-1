const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Module ready' }));
module.exports = router;
