/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

DROP DATABASE IF EXISTS `aplikacijapiivt`;
CREATE DATABASE IF NOT EXISTS `aplikacijapiivt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacijapiivt`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(1, 'mladjan', '083F1BC212F01AF4B896DFF47525F732DDE865F24A2719DF3D1A4C6B2E99A57B996288DB8363F3E4EF3C330ED9D71DB65E4D2F4CFB067532CA814F210CCA883F'),
	(2, 'test_user', '919012ahdakjd190823h131231'),
	(5, 'pperic', '9D1B1DB471F692E6736119A0AF99BF5E20D4DB137E75A6665DDDABE58DBACB2A35A2B5A726D4D66C15F3B17B72193EB79C513CCFD377F47164C261837EC0AF87'),
	(6, 'mmarkovic', 'A8511160E54CE76E8FC85C6E71F8B8072915A73F0174AE51D1D4877FB93A387D83760D60802739150483E0938D00281341FDEACAF0FE79F3D2982270AC04467B'),
	(8, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`),
  UNIQUE KEY `uq_category_image_path` (`image_path`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`, `image_path`) VALUES
	(1, 'Sneakers', 'assets/patike.jpg'),
	(2, 'Shoes', 'assets/cipele.jpg'),
	(3, 'Slippers', 'assets/papuce.jpg'),
	(5, 'Clogs', 'assets/klompe.jpg'),
	(6, 'Boots', 'assets/boots.jpg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

DROP TABLE IF EXISTS `in_stock`;
CREATE TABLE IF NOT EXISTS `in_stock` (
  `in_stock_id` int unsigned NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL DEFAULT '0',
  `size` smallint unsigned NOT NULL DEFAULT '0',
  `color` varchar(50) NOT NULL DEFAULT '0',
  `product_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`in_stock_id`),
  UNIQUE KEY `uq_in_stock_size_color_product_id` (`size`,`color`,`product_id`),
  KEY `fk_in_stock_priduct_id` (`product_id`),
  CONSTRAINT `fk_in_stock_priduct_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `in_stock`;
/*!40000 ALTER TABLE `in_stock` DISABLE KEYS */;
INSERT INTO `in_stock` (`in_stock_id`, `quantity`, `size`, `color`, `product_id`) VALUES
	(1, 25, 43, 'Blue', 1),
	(3, 10, 44, 'Black', 1),
	(5, 5, 45, 'Black', 1),
	(6, 6, 42, 'White', 3),
	(7, 4, 43, 'Blue', 3),
	(9, 20, 40, 'Black', 1),
	(20, 222, 0, '0', 4);
/*!40000 ALTER TABLE `in_stock` ENABLE KEYS */;

DROP TABLE IF EXISTS `picture`;
CREATE TABLE IF NOT EXISTS `picture` (
  `picture_id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `image_path` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`picture_id`),
  UNIQUE KEY `uq_picture_image_path` (`image_path`),
  KEY `fk_picture_product_id` (`product_id`),
  CONSTRAINT `fk_picture_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `picture`;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` (`picture_id`, `product_id`, `image_path`) VALUES
	(5, 1, '202092-9229461786-patika2.jpg');
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category_id` int unsigned NOT NULL,
  `product_material_id` int unsigned NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `uq_product_title` (`title`),
  KEY `fk_product_category_id` (`category_id`),
  KEY `fk_product_product_material_id` (`product_material_id`),
  CONSTRAINT `fk_product_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_product_product_material_id` FOREIGN KEY (`product_material_id`) REFERENCES `product_material` (`product_material_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `product`;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`product_id`, `title`, `description`, `category_id`, `product_material_id`) VALUES
	(1, 'Airmax2', 'Neki opis1...', 1, 2),
	(2, 'Papuce', 'Neki opis2...', 3, 1),
	(3, 'Klompe', 'Neki opis3...', 5, 5),
	(4, 'Airmax12', 'Neki opis132...', 1, 2);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

DROP TABLE IF EXISTS `product_material`;
CREATE TABLE IF NOT EXISTS `product_material` (
  `product_material_id` int unsigned NOT NULL AUTO_INCREMENT,
  `material_name` varchar(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_material_id`),
  UNIQUE KEY `uq_product_material_material_name` (`material_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `product_material`;
/*!40000 ALTER TABLE `product_material` DISABLE KEYS */;
INSERT INTO `product_material` (`product_material_id`, `material_name`) VALUES
	(4, 'Felt'),
	(2, 'Leather'),
	(3, 'Linen'),
	(5, 'Plastic'),
	(1, 'Rubber');
/*!40000 ALTER TABLE `product_material` ENABLE KEYS */;

DROP TABLE IF EXISTS `product_price`;
CREATE TABLE IF NOT EXISTS `product_price` (
  `product_price_id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL DEFAULT '0',
  `price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_price_id`),
  KEY `fk_product_price_product_id` (`product_id`),
  CONSTRAINT `fk_product_price_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `product_price`;
/*!40000 ALTER TABLE `product_price` DISABLE KEYS */;
INSERT INTO `product_price` (`product_price_id`, `product_id`, `price`, `created_at`) VALUES
	(1, 1, 45.00, '2020-08-24 13:09:01'),
	(2, 1, 43.00, '2020-08-24 13:09:11'),
	(3, 4, 67.67, '2020-08-27 13:12:28'),
	(8, 4, 60.27, '2020-09-03 18:41:45');
/*!40000 ALTER TABLE `product_price` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
