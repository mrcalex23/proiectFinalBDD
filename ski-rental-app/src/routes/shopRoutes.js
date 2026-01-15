const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Middleware pentru a proteja rutele care necesită autentificare
const isAuth = (req, res, next) => {
    // Verifică dacă utilizatorul este autentificat prin prezența ID-ului în sesiune
    if (!req.session.userId) {
        // Redirecționează către pagina de login dacă nu este autentificat
        return res.redirect('/auth/login');
    }
    // Permite accesul la rută dacă este autentificat
    next();
};

// Rută pentru afișarea dashboard-ului cu echipamentele disponibile
router.get('/dashboard', isAuth, shopController.getDashboard);

// Rută pentru procesarea cererii de închiriere a unui echipament
router.post('/rent', isAuth, shopController.postRent);

// Rută pentru afișarea echipamentelor închiriate de utilizator
router.get('/rentals', isAuth, shopController.getRentals);

// Rută pentru actualizarea imaginii unui echipament
router.post('/equipment/:id/image', isAuth, shopController.updateEquipmentImage);

// Rută temporară pentru actualizarea imaginilor
router.get('/update-images', isAuth, shopController.updateImages);

module.exports = router;
