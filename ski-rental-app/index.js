const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./src/routes/authRoutes');
const shopRoutes = require('./src/routes/shopRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Session Config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Routes
app.use('/auth', authRoutes);
app.use('/shop', shopRoutes);

// Root Redirect
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});

const { updateImages } = require('./src/controllers/shopController');

// Start Server
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    try {
        await updateImages();
        console.log("Database images updated successfully.");
    } catch (err) {
        console.error("Failed to update database images:", err);
    }
    console.log(`Ensure you have run 'node scripts/init_db.js' to set up the databases.`);
});
