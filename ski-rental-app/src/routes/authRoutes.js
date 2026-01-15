const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rută pentru afișarea paginii de login
router.get('/login', authController.getLogin);

// Rută pentru procesarea datelor de login
router.post('/login', authController.postLogin);

// Rută pentru afișarea paginii de înregistrare
router.get('/register', authController.getRegister);

// Rută pentru procesarea datelor de înregistrare
router.post('/register', authController.postRegister);

// Rută pentru logout
router.get('/logout', authController.logout);

module.exports = router;
