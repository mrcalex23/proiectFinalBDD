const Equipment = require('../models/Equipment');
const Rental = require('../models/Rental');

/**
 * Afișează dashboard-ul cu toate echipamentele disponibile pentru închiriere.
 * @param {object} req - Obiectul cererii Express.
 * @param {object} res - Obiectul răspunsului Express.
 */
exports.getDashboard = async (req, res) => {
    try {
        // Găsește toate echipamentele marcate ca fiind disponibile
        const equipment = await Equipment.findAllAvailable();
        // Trimite datele către view-ul 'dashboard'
        res.render('dashboard', { 
            user: req.session.username, 
            equipment: equipment 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Eroare de Server');
    }
};

/**
 * Gestionează procesul de închiriere a unui echipament.
 * @param {object} req - Obiectul cererii Express (conține ID-ul echipamentului și data închirierii).
 * @param {object} res - Obiectul răspunsului Express.
 */
exports.postRent = async (req, res) => {
    const { equipmentId, rentalDate } = req.body;
    const userId = req.session.userId;
    try {
        // 1. Verifică dacă echipamentul este deja închiriat la data specificată
        const isBooked = await Rental.checkAvailability(equipmentId, rentalDate);
        
        if (isBooked) {
            // Dacă este deja rezervat, informează utilizatorul (ideal printr-un mesaj de eroare)
            console.log(`Echipamentul ${equipmentId} este deja rezervat pe data de ${rentalDate}`);
            return res.redirect('/shop/dashboard'); 
        }

        // 2. Creează o nouă înregistrare de închiriere
        await Rental.create(userId, equipmentId, rentalDate);
        
        // Redirecționează către pagina cu închirierile utilizatorului
        res.redirect('/shop/rentals');
    } catch (err) {
        console.error(err);
        res.redirect('/shop/dashboard');
    }
};

/**
 * Afișează toate închirierile pentru utilizatorul curent.
 * @param {object} req - Obiectul cererii Express.
 * @param {object} res - Obiectul răspunsului Express.
 */
exports.getRentals = async (req, res) => {
    const userId = req.session.userId;
    try {
        // Găsește toate închirierile asociate ID-ului de utilizator
        const rentals = await Rental.findByUserId(userId);
        // Trimite datele către view-ul 'rentals'
        res.render('rentals', { 
            user: req.session.username, 
            rentals: rentals 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Eroare de Server');
    }
};

/**
 * Actualizează URL-ul imaginii unui echipament.
 * @param {object} req - Obiectul cererii Express (conține ID-ul echipamentului și noul URL al imaginii).
 * @param {object} res - Obiectul răspunsului Express.
 */
exports.updateEquipmentImage = async (req, res) => {
    const { id } = req.params; // Get equipment ID from URL parameters
    const { imageUrl } = req.body; // Get new image URL from request body

    try {
        await Equipment.updateImageUrl(id, imageUrl);
        res.status(200).send({ message: 'Imaginea echipamentului a fost actualizată cu succes.' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Eroare la actualizarea imaginii echipamentului.');
    }
};

/**
 * Actualizează imaginile pentru echipamentele specificate.
 * @param {object} req - Obiectul cererii Express.
 * @param {object} res - Obiectul răspunsului Express.
 */
const updateImages = async () => {
    const equipmentToUpdate = [
        { name: 'Atomic Hawx', image: '1.jpg' },
        { name: 'Oakley Mod1', image: '2.jpg' },
        { name: 'Rossignol Experience 88', image: '3.jpg' },
        { name: 'Burton Custom', image: '4.jpg' },
        { name: 'Salomon QST', image: '5.jpg' }
    ];

    try {
        for (const item of equipmentToUpdate) {
            const equipment = await Equipment.findByName(item.name);
            if (equipment) {
                const imageUrl = `/images/${item.image}`;
                await Equipment.updateImageUrl(equipment.id, imageUrl);
                console.log(`Imaginea pentru ${item.name} a fost actualizată cu succes.`);
            } else {
                console.log(`Echipamentul ${item.name} nu a fost găsit.`);
            }
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getDashboard: exports.getDashboard,
    postRent: exports.postRent,
    getRentals: exports.getRentals,
    updateEquipmentImage: exports.updateEquipmentImage,
    updateImages
};