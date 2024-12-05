const express = require("express");
const bodyParser = require("body-parser");
const { insertData, insertOrUpdateReading } = require("./database");
const { readModbusCoils } = require("./modbus-client");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3001; // Le port sur lequel ton serveur backend écoute

// Connexion à la base de données
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "database", // Remplacer par votre nom de base de données
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err.stack);
    return;
  }
  console.log("Connecté à la base de données avec l'ID :", connection.threadId);
});

// Middleware pour CORS
const corsOptions = {
  origin: "*", // Accepter toutes les origines pendant le développement
  methods: "GET,POST",
  allowedHeaders: "Content-Type",
};

// Appliquer CORS à toutes les routes
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Endpoint pour récupérer toutes les variables
app.get("/get-variables", async (req, res) => {
  try {
    const query = `
      SELECT v.id, v.name, v.ip_address, v.register, v.frequency, v.unit, r.value AS last_reading
      FROM variables v
      LEFT JOIN readings r ON v.id = r.variable_id
      WHERE r.timestamp = (
        SELECT MAX(timestamp) FROM readings WHERE variable_id = v.id
      )
    `;
    const [rows] = await connection.promise().execute(query);

    console.log("Variables récupérées avec la dernière lecture :", rows); // Affiche les variables et la dernière lecture

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des variables :", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// Endpoint pour recevoir les données et interagir avec l'automate
app.post("/fetch-data", async (req, res) => {
  const { ipAddress, registerAddress, dataLength } = req.body;

  try {
    // Lire les données de l'automate Modbus
    const data = await readModbusCoils(
      ipAddress,
      1,
      registerAddress,
      dataLength
    );

    if (!data) {
      return res.status(500).json({
        message: "Erreur lors de la lecture des données de l'automate.",
      });
    }

    // Insérer les données dans la base de données
    const variableId = await insertData(
      "Variable Modbus",
      ipAddress,
      registerAddress,
      10, // Fréquence (à ajuster si nécessaire)
      "unit" // Unité (à ajuster si nécessaire)
    );

    // Insérer ou mettre à jour la lecture dans la table readings
    const datetime = new Date().toISOString(); // Date et heure actuelles
    await insertOrUpdateReading(variableId, data[0], datetime); // Ajuste la structure de data en fonction de ton automatisme

    // Répondre avec succès
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Erreur dans fetch-data:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
