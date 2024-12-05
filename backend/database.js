const mysql = require("mysql2");

// Connexion à la base de données MariaDB
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "database", // Remplacer par votre nom de base de données
});

// Fonction pour insérer les données dans la table `variables` et renvoyer l'ID de la variable insérée
function insertData(name, ipAddress, register, frequency, unit, callback) {
  const query =
    "INSERT INTO variables (name, ip_address, register, frequency, unit) VALUES (?, ?, ?, ?, ?)";

  connection.execute(
    query,
    [name, ipAddress, register, frequency, unit],
    (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de l'insertion des données dans variables :",
          err
        );
        return callback(err, null);
      }
      const variableId = results.insertId; // Récupérer l'ID de la variable insérée
      console.log("Variable insérée avec succès, ID :", variableId);
      callback(null, variableId); // Retourner l'ID à la fonction de rappel
    }
  );
}

// Fonction pour insérer les valeurs dans la table `readings`
function insertReading(variableId, value) {
  const query = "INSERT INTO readings (variable_id, value) VALUES (?, ?)";

  connection.execute(query, [variableId, value], (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de l'insertion des données dans readings :",
        err
      );
      return;
    }
    console.log("Données insérées avec succès dans readings :", results);
  });
}

module.exports = { insertData, insertReading };
