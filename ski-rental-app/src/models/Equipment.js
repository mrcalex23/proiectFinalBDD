const { shopDB } = require('../config/db');

/**
 * Modelul pentru gestionarea echipamentelor în baza de date.
 */
class Equipment {
    /**
     * Găsește toate echipamentele care sunt disponibile.
     * @returns {Promise<Array<object>>} O listă de obiecte reprezentând echipamentele disponibile.
     */
    static async findAllAvailable() {
        // Interogare SQL pentru a selecta echipamentele cu `is_available` = TRUE
        const result = await shopDB.query(
            'SELECT * FROM equipment WHERE is_available = TRUE'
        );
        return result.rows;
    }

    /**
     * Găsește un echipament după ID.
     * @param {number} id - ID-ul echipamentului de căutat.
     * @returns {Promise<object|undefined>} Obiectul echipamentului sau undefined dacă nu este găsit.
     */
    static async findById(id) {
        // Interogare SQL pentru a selecta un echipament după ID
        const result = await shopDB.query(
            'SELECT * FROM equipment WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    /**
     * Găsește un echipament după nume.
     * @param {string} name - Numele echipamentului de căutat.
     * @returns {Promise<object|undefined>} Obiectul echipamentului sau undefined dacă nu este găsit.
     */
    static async findByName(name) {
        // Interogare SQL pentru a selecta un echipament după nume
        const result = await shopDB.query(
            'SELECT * FROM equipment WHERE name = $1',
            [name]
        );
        return result.rows[0];
    }

    /**
     * Actualizează starea de disponibilitate a unui echipament.
     * @param {number} id - ID-ul echipamentului de actualizat.
     * @param {boolean} isAvailable - Noua stare de disponibilitate.
     * @returns {Promise<void>}
     */
    static async updateImageUrl(id, imageUrl) {
        // SQL query to update the `image_url` field
        await shopDB.query(
            'UPDATE equipment SET image_url = $1 WHERE id = $2',
            [imageUrl, id]
        );
    }
}

module.exports = Equipment;