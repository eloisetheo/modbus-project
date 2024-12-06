-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           11.5.2-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour database
CREATE DATABASE IF NOT EXISTS `database` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `database`;

-- Listage de la structure de la table database. logs
CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) DEFAULT NULL,
  `actions` int(11) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table database.logs : ~0 rows (environ)

-- Listage de la structure de la table database. readings
CREATE TABLE IF NOT EXISTS `readings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `variable_id` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage de la structure de la table database. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) DEFAULT NULL,
  `username` int(11) DEFAULT NULL,
  `password` int(11) DEFAULT NULL,
  `email` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table database.users : ~0 rows (environ)

-- Listage de la structure de la table database. variables
CREATE TABLE IF NOT EXISTS `variables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ip_address` varchar(15) NOT NULL,
  `register` int(11) NOT NULL,
  `frequency` int(11) NOT NULL,
  `unit` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=318 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
