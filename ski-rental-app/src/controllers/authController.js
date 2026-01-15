const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * Afișează pagina de login.
 * @param {object} req - Obiectul cererii Express.
 * @param {object} res - Obiectul răspunsului Express.
 */
exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

/**
 * Afișează pagina de înregistrare.
 * @param {object} req - Obiectul cererii Express.
 * @param {object} res - Obiectul răspunsului Express.
 */
exports.getRegister = (req, res) => {
    res.render('register', { error: null });
};

/**
 * Gestionează procesul de înregistrare a unui nou utilizator.
 * @param {object} req - Obiectul cererii Express (conține username și password în body).
 * @param {object} res - Obiectul răspunsului Express.
 */
exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Verifică dacă utilizatorul există deja în baza de date
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.render('register', { error: 'Numele de utilizator există deja' });
        }
        // Hashuiește parola înainte de a o salva
        const hashedPassword = await bcrypt.hash(password, 10);
        // Creează un utilizator nou
        await User.create(username, hashedPassword);
        // Redirecționează către pagina de login după înregistrare reușită
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.render('register', { error: 'Eroare de server' });
    }
};

/**
 * Gestionează procesul de autentificare a unui utilizator.
 * @param {object} req - Obiectul cererii Express (conține username și password în body).
 * @param {object} res - Obiectul răspunsului Express.
 */
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Caută utilizatorul în baza de date
        const user = await User.findByUsername(username);
        if (!user) {
            return res.render('login', { error: 'Credențiale invalide' });
        }
        // Compară parola introdusă cu cea hash-uită din baza de date
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Credențiale invalide' });
        }
        // Salvează ID-ul și username-ul utilizatorului în sesiune
        req.session.userId = user.id;
        req.session.username = user.username;
        // Redirecționează către dashboard după autentificare reușită
        res.redirect('/shop/dashboard');
    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Eroare de server' });
    }
};

/**
 * Gestionează procesul de logout.
 * @param {object} req - Obiectul cererii Express.
 * @param {object} res - Obiectul răspunsului Express.
 */
exports.logout = (req, res) => {
    // Distruge sesiunea utilizatorului
    req.session.destroy(() => {
        // Redirecționează către pagina de login
        res.redirect('/auth/login');
    });
};
