const { readModbusCoils } = require("./modbus-client");
const { insertData, insertReading } = require("./database");

// Fonction principale pour lire les données Modbus et les insérer dans la base de données
async function fetchAndStoreData() {
  const ip_address = "172.16.1.24"; // Remplacer par l'IP de votre automate
  const unit_id = 1; // ID de l'unité Modbus
  const address = 602; // Adresse de la bobine à lire
  const count = 1; // Lire une seule bobine
  const frequency = 10; // Fréquence de lecture, ajustez en fonction de vos besoins
  const name = "Variable Modbus 1"; // Nom de la variable, à ajuster selon votre besoin
  const unit = 1; // ID de l'unité (par exemple, 1 pour l'unité Modbus)

  try {
    // Lire les données de l'automate Modbus
    const data = await readModbusCoils(ip_address, unit_id, address, count);

    if (data) {
      console.log("Données reçues depuis Modbus :", data);

      // Insérer les données dans la table variables et obtenir l'ID de la variable
      insertData(
        name,
        ip_address,
        address,
        frequency,
        unit,
        (err, variableId) => {
          if (err) {
            console.error("Erreur lors de l'insertion de la variable :", err);
            return;
          }

          // Insérer la valeur de la variable dans la table readings
          const timestamp = Math.floor(Date.now() / 1000); // Timestamp actuel (en secondes)
          insertReading(variableId, data[0], timestamp); // Utiliser l'ID de la variable insérée pour readings
        }
      );
    }
  } catch (error) {
    console.error("Erreur dans fetchAndStoreData :", error);
  }
}

// Appeler la fonction principale
fetchAndStoreData();
