CREATE DATABASE IF NOT EXISTS monitoring_db;

USE monitoring_db;

CREATE TABLE IF NOT EXISTS Automates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(255) NOT NULL,
    variable_name VARCHAR(255) NOT NULL,
    frequency INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Donnees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    automate_id INT,
    variable_value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (automate_id) REFERENCES Automates(id)
);
