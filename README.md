Ski Rental Shop App
O aplicație web completă pentru gestionarea închirierilor de echipamente de ski, construită pe o arhitectură MVC (Model-View-Controller). Proiectul demonstrează persistența datelor folosind două baze de date PostgreSQL separate: una dedicată autentificării și una pentru inventarul magazinului.

📋 Cerințe și Funcționalități
Acest proiect a fost dezvoltat pentru a îndeplini următoarele specificații tehnice:

Arhitectură MVC: Separare clară între logica de business (Controllers), accesul la date (Models) și interfață (Frontend/Views).

2 Baze de Date distincte:

ski_auth: Gestionează utilizatorii și securitatea.

ski_shop: Gestionează inventarul (schiuri, clăpari) și închirierile.

Autentificare: Sistem de Login și Înregistrare securizat.

Persistență: Datele sunt salvate permanent în PostgreSQL.

Interfață Grafică: Frontend responsive (HTML/CSS) care comunică cu serverul prin API.

🛠️ Tehnologii Folosite
Backend: Node.js, Express.js

Bază de Date: PostgreSQL (pg library)

Frontend: HTML5, CSS3, Vanilla JavaScript (Fetch API)

Tools: DBeaver (Management BD), GitHub Desktop
