const { authDB } = require('../config/db');

/**
 * Modelul pentru gestionarea utilizatorilor în baza de date.
 */
class User {
    /**
     * Creează un utilizator nou în baza de date.
     * @param {string} username - Numele de utilizator.
     * @param {string} passwordHash - Parola hash-uită.
     * @returns {Promise<number>} ID-ul utilizatorului nou creat.
     */
    static async create(username, passwordHash) {
        // Interogare SQL pentru inserarea unui nou utilizator
        const result = await authDB.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
            [username, passwordHash]
        );
        return result.rows[0].id;
    }

    /**
     * Găsește un utilizator după numele de utilizator.
     * @param {string} username - Numele de utilizator de căutat.
     * @returns {Promise<object|undefined>} Obiectul utilizatorului sau undefined dacă nu este găsit.
     */
    static async findByUsername(username) {
        // Interogare SQL pentru a selecta un utilizator după username
        const result = await authDB.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        return result.rows[0];
    }

    /**
     * Găsește un utilizator după ID.
     * @param {number} id - ID-ul utilizatorului de căutat.
     * @returns {Promise<object|undefined>} Obiectul utilizatorului sau undefined dacă nu este găsit.
     */
    static async findById(id) {
        // Interogare SQL pentru a selecta un utilizator după ID
        const result = await authDB.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }
}

module.exports = User;