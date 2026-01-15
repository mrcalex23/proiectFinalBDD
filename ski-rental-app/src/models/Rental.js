const { shopDB } = require('../config/db');

/**
 * Modelul pentru gestionarea închirierilor în baza de date.
 */
class Rental {
    /**
     * Creează o nouă închiriere în baza de date.
     * @param {number} userId - ID-ul utilizatorului care închiriază.
     * @param {number} equipmentId - ID-ul echipamentului închiriat.
     * @param {string} scheduledDate - Data programată pentru închiriere.
     * @returns {Promise<number>} ID-ul noii închirieri.
     */
    static async create(userId, equipmentId, scheduledDate) {
        // Interogare SQL pentru a insera o nouă închiriere
        const result = await shopDB.query(
            'INSERT INTO rentals (user_id, equipment_id, scheduled_date) VALUES ($1, $2, $3) RETURNING id',
            [userId, equipmentId, scheduledDate]
        );
        return result.rows[0].id;
    }

    /**
     * Verifică dacă un echipament este deja rezervat la o anumită dată.
     * @param {number} equipmentId - ID-ul echipamentului de verificat.
     * @param {string} date - Data pentru care se verifică disponibilitatea.
     * @returns {Promise<boolean>} Adevărat dacă este rezervat, fals în caz contrar.
     */
    static async checkAvailability(equipmentId, date) {
        // Interogare SQL pentru a căuta o închiriere existentă pentru un echipament la o anumită dată
        const result = await shopDB.query(
            'SELECT * FROM rentals WHERE equipment_id = $1 AND scheduled_date = $2',
            [equipmentId, date]
        );
        return result.rows.length > 0; // Returnează true dacă există deja o înregistrare
    }

    /**
     * Găsește toate închirierile pentru un anumit utilizator.
     * @param {number} userId - ID-ul utilizatorului.
     * @returns {Promise<Array<object>>} O listă de obiecte reprezentând închirierile.
     */
    static async findByUserId(userId) {
        // Interogare SQL complexă pentru a prelua detalii despre închirieri și echipamente
        const sql = `
            SELECT r.id, r.rental_date, r.scheduled_date, e.name, e.type, e.price
            FROM rentals r
            JOIN equipment e ON r.equipment_id = e.id
            WHERE r.user_id = $1
            ORDER BY r.scheduled_date DESC
        `;
        const result = await shopDB.query(sql, [userId]);
        return result.rows;
    }
}

module.exports = Rental;