const ModbusRTU = require("modbus-serial");

async function readModbusCoils(ipAddress, unitId, address, count) {
  const client = new ModbusRTU();

  try {
    // Connexion à l'automate Modbus
    await client.connectTCP(ipAddress, { port: 502 });

    // Configuration de l'ID de l'unité Modbus
    client.setID(unitId);

    // Lire les bobines depuis l'adresse spécifiée
    console.log(`Lecture de ${count} bobine(s) à l'adresse ${address}...`);
    const data = await client.readCoils(address, count);

    // Affichez les données brutes lues (les valeurs 0 ou 1)
    console.log("Réponse brute des bobines :", data.data);

    // Vérifier si la réponse contient uniquement des valeurs 0 (OFF) ou 1 (ON)
    if (data.data.every((val) => val === 0 || val === 1)) {
      console.log("Données lues depuis Modbus :", data.data);
    } else {
      console.error(
        "Aucune donnée valide reçue, vérifier les paramètres de l'automate et les registres."
      );
    }

    return data.data;
  } catch (err) {
    console.error("Erreur lors de la lecture Modbus :", err);
    return null;
  } finally {
    client.close();
  }
}

module.exports = { readModbusCoils };
