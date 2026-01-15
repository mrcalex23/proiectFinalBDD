# Ski Rental MVC App

This is a Node.js application demonstrating a Ski Rental shop using a strict MVC architecture and connecting to **two separate MySQL databases**.

## Features

*   **2 Databases:**
    *   `ski_auth`: Handles User authentication (table: `users`).
    *   `ski_shop`: Handles Equipment and Rentals (tables: `equipment`, `rentals`).
*   **MVC Architecture:** Separation of Models, Views, and Controllers.
*   **Persistence:** All data is stored in MySQL.
*   **Authentication:** User Login and Registration using hashed passwords (`bcryptjs`).
*   **Interactive Frontend:** Rendered using EJS templates.

## Prerequisites

*   Node.js installed.
*   MySQL installed and running on `localhost:3306`.

## Setup

1.  **Dependencies:**
    Install the required packages:
    ```bash
    npm install
    ```

2.  **Database Configuration:**
    The project uses a `.env` file for configuration. It has been pre-configured with:
    *   User: `root`
    *   Password: (empty)
    *   Host: `localhost`
    
    If your MySQL setup differs, please edit the `.env` file in the root directory.

3.  **Initialize Databases:**
    Run the setup script to create the two databases and necessary tables:
    ```bash
    node scripts/init_db.js
    ```
    *Note: If this fails, ensure your MySQL server is running and credentials in `.env` are correct.*

4.  **Run the Server:**
    ```bash
    node index.js
    ```

5.  **Access:**
    Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

## Usage

1.  **Register:** Create a new user account.
2.  **Login:** Log in with your credentials.
3.  **Dashboard:** View available ski equipment.
4.  **Rent:** Click "Rent" to book equipment (it will disappear from available list).
5.  **My Rentals:** View your rental history.

## Project Structure

*   `src/config`: Database connection pools.
*   `src/controllers`: Logic for Auth and Shop actions.
*   `src/models`: Data access layer (SQL queries).
*   `src/routes`: URL routing.
*   `src/views`: EJS HTML templates.
*   `scripts`: Database initialization utilities.
