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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(1, 'mladjan', '083F1BC212F01AF4B896DFF47525F732DDE865F24A2719DF3D1A4C6B2E99A57B996288DB8363F3E4EF3C330ED9D71DB65E4D2F4CFB067532CA814F210CCA883F'),
	(2, 'test_user', '34CEF2F906994B3E6D5FA42B566519E6C461CF16BEDAC2C3776D358A35024D6F83C35B57FE5BCCADFD71F428034FD300386EF215811F15185E252754822CFA2A'),
	(5, 'pperic', '9D1B1DB471F692E6736119A0AF99BF5E20D4DB137E75A6665DDDABE58DBACB2A35A2B5A726D4D66C15F3B17B72193EB79C513CCFD377F47164C261837EC0AF87'),
	(6, 'mmarkovic', 'A8511160E54CE76E8FC85C6E71F8B8072915A73F0174AE51D1D4877FB93A387D83760D60802739150483E0938D00281341FDEACAF0FE79F3D2982270AC04467B'),
	(9, 'ppetrovic', '4604554F615AD7089B1690CEFE0205CDB7766EFB4AC3C0F635EC40725D605F43DE200ED32A622F65D81EEFC29D0F4058E71556F4A36CB79C1C74EABEE7BFF680'),
	(11, 'admin123', '7FCF4BA391C48784EDDE599889D6E3F1E47A27DB36ECC050CC92F259BFAC38AFAD2C68A1AE804D77075E8FB722503F3ECA2B2C1006EE6F6C7B7628CB45FFFD1D');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `admin_token`;
CREATE TABLE IF NOT EXISTS `admin_token` (
  `admin_token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `administrator_id` int unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_valid` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`admin_token_id`),
  KEY `fk_admin_token_administrator_id` (`administrator_id`),
  CONSTRAINT `fk_admin_token_administrator_id` FOREIGN KEY (`administrator_id`) REFERENCES `administrator` (`administrator_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `admin_token`;
/*!40000 ALTER TABLE `admin_token` DISABLE KEYS */;
INSERT INTO `admin_token` (`admin_token_id`, `administrator_id`, `created_at`, `token`, `expires_at`, `is_valid`) VALUES
	(1, 11, '2020-09-12 16:15:34', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI1OTg1MzQuNTQ1LCJpcCI6Ijo6MSIsInVhIjoiUG9zdG1hblJ1bnRpbWUvNy4yNi41IiwiaWF0IjoxNTk5OTIwMTM0fQ.PzjDsmH7xVUW10OVdYYNFAXuMgvNvC9DcF_5do4Y3xs', '2020-10-13 14:15:34', 1),
	(2, 11, '2020-09-15 15:11:50', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NTM5MTAuMDM5LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDE3NTUxMH0.nGfeIP0eEbuVuWrpk4X_WIlkSNlXj0Sh6Ed9dEq9U0Y', '2020-10-16 13:11:50', 1),
	(3, 11, '2020-09-15 16:47:47', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NTk2NjcuMjEsImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvODUuMC40MTgzLjEwMiBTYWZhcmkvNTM3LjM2IiwiaWF0IjoxNjAwMTgxMjY3fQ.fQdhYPx45RROgHULbaeRG2BsPbY0G0nX-NjiNhOBScg', '2020-10-16 14:47:47', 1),
	(4, 11, '2020-09-15 16:49:01', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NTk3NDEuMzYxLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDE4MTM0MX0.6uSIeDbNyHQ1YTdFNILlRMWMBftqr8BZJaaWt0ROybY', '2020-10-16 14:49:01', 1),
	(5, 11, '2020-09-15 16:49:17', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NTk3NTcuMTcxLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDE4MTM1N30.b7_UsgePx7zmdPShj0pQSoSdBi1CpTmcByTdQnJk7_Q', '2020-10-16 14:49:17', 1),
	(6, 11, '2020-09-15 16:55:27', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NjAxMjcuMDYxLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDE4MTcyN30.G9d12ZRmWO9L2DajvTKAiFxQAUXKZUkscqd5z02P9pg', '2020-10-16 14:55:27', 1),
	(7, 11, '2020-09-15 16:56:13', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NjAxNzMuODExLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDE4MTc3M30.FrfmA7FVKb_VctRGoUiOBmHauIafa46U6avn5cYvdC8', '2020-10-16 14:56:13', 1),
	(8, 11, '2020-09-15 16:58:20', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NjAzMDAuNzQ1LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDE4MTkwMH0.bX1l55ku7xVvRVBOrYokAQkVyPeBTLVtkdnB8ribQ38', '2020-10-16 14:58:20', 1),
	(9, 11, '2020-09-15 17:12:48', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NjExNjguMDAxLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDE4Mjc2OH0.CbWfOjrMswwldHR0SC8TJm2f1_Q34qtlxbG3_GJEfXA', '2020-10-16 15:12:48', 1),
	(10, 11, '2020-09-15 17:27:26', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NjIwNDYuMTksImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvODUuMC40MTgzLjEwMiBTYWZhcmkvNTM3LjM2IiwiaWF0IjoxNjAwMTgzNjQ2fQ.dLkq0TIFqzgypuUNo_kIB8U_flo28WYc2niP5M2ouFk', '2020-10-16 15:27:26', 1),
	(11, 11, '2020-09-15 18:37:11', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NjYyMzEuODU3LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDE4NzgzMX0.6_eYspgA7h7LB40DZy5-iH7wDAkBUklEUyu8GitRP2k', '2020-10-16 16:37:11', 1),
	(12, 11, '2020-09-15 19:53:31', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI4NzA4MTEuNjgyLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDE5MjQxMX0.CAXooBh9IGDONaOqiGy0Yjl6NnAS7JQ7a8adnoCnLrk', '2020-10-16 17:53:31', 1),
	(13, 11, '2020-09-16 12:28:24', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI5MzA1MDQuMTA0LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDI1MjEwNH0.b7cDPlcwluVWKgQFFHZKoIvNsIFls79_oDS5Bxc96cU', '2020-10-17 10:28:24', 1),
	(14, 11, '2020-09-16 17:06:03', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI5NDcxNjMuNjYsImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvODUuMC40MTgzLjEwMiBTYWZhcmkvNTM3LjM2IiwiaWF0IjoxNjAwMjY4NzYzfQ.ncB3xDmIHUHjt5XXkNE_m5i2mJOA5YH-_DqsIn_cPRA', '2020-10-17 15:06:03', 1),
	(15, 11, '2020-09-16 19:56:23', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDI5NTczODMuODc1LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDI3ODk4M30.AgqSKlNhC4EnzTRy_5339YS-C13rVbv5HZBstXSDq24', '2020-10-17 17:56:23', 1),
	(16, 11, '2020-09-17 17:54:13', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDMwMzY0NTMuMTIsImlwIjoiOjoxIiwidWEiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvODUuMC40MTgzLjEwMiBTYWZhcmkvNTM3LjM2IiwiaWF0IjoxNjAwMzU4MDUzfQ.qortFRezn0GsmBCuRLFgRHl-DbSIVgQvBuMTSQZjdqk', '2020-10-18 15:54:13', 1),
	(17, 11, '2020-09-17 18:15:18', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDMwMzc3MTguMjM2LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDM1OTMxOH0.hgcRhqXVO2zZQ14Igvu35DO_cx-CinvKXInrN21iHIE', '2020-10-18 16:15:18', 1),
	(18, 11, '2020-09-17 18:40:30', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDMwMzkyMzAuMDQ1LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDM2MDgzMH0.J9veliAhh8wE3ILQXG8qXTAaTh6RnPZbNYzpuZ8grb0', '2020-10-18 16:40:30', 1),
	(19, 11, '2020-09-17 18:59:10', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDMwNDAzNTAuNTc3LCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDM2MTk1MH0.wPAPhwBTW6U-Q80edsKbwM6CrNJOmN6WNzNEjYldZYI', '2020-10-18 16:59:10', 1),
	(20, 11, '2020-09-17 18:59:45', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImFkbWluaXN0cmF0b3JJZCI6MTEsInVzZXJuYW1lIjoiYWRtaW4xMjMiLCJleHAiOjE2MDMwNDAzODUuNzIzLCJpcCI6Ijo6MSIsInVhIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg1LjAuNDE4My4xMDIgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTYwMDM2MTk4NX0.-i3N_2RB0aVgwlc0-qcvcFuwXc2pkz4-7GiB1MM5Fns', '2020-10-18 16:59:45', 1);
/*!40000 ALTER TABLE `admin_token` ENABLE KEYS */;

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`),
  UNIQUE KEY `uq_category_image_path` (`image_path`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`category_id`, `name`, `image_path`) VALUES
	(1, 'Sneakers', 'assets/patike.jpg'),
	(2, 'Loafers', 'assets/cipele.jpg'),
	(3, 'Slippers', 'assets/papuce.jpg'),
	(5, 'Clogs', 'assets/klompe.jpg'),
	(6, 'Boots', 'assets/boots.jpg'),
	(7, 'Winter footwear', 'assets/wfootwear.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `in_stock`;
/*!40000 ALTER TABLE `in_stock` DISABLE KEYS */;
INSERT INTO `in_stock` (`in_stock_id`, `quantity`, `size`, `color`, `product_id`) VALUES
	(1, 25, 43, 'Blue', 1),
	(3, 10, 44, 'Black', 1),
	(5, 5, 45, 'Black', 1),
	(6, 6, 42, 'White', 3),
	(7, 4, 43, 'Blue', 3),
	(9, 15, 40, 'Black', 1),
	(36, 12, 39, 'Blue', 2),
	(37, 5, 41, 'Black', 2),
	(38, 15, 41, 'Black', 6),
	(40, 12, 43, 'Purple', 4),
	(41, 20, 41, 'Black', 8),
	(42, 14, 42, 'Black', 9),
	(43, 25, 40, 'Blue', 10),
	(44, 10, 43, 'Brown', 11),
	(45, 22, 41, 'Brown', 12),
	(46, 11, 41, 'Black', 13),
	(47, 15, 42, 'Brown', 13),
	(48, 24, 40, 'Black', 14),
	(50, 22, 42, 'Brown', 14),
	(51, 17, 41, 'Gray', 15),
	(52, 25, 39, 'Brown', 16),
	(53, 12, 41, 'Black', 16),
	(54, 25, 43, 'Blue', 17),
	(55, 11, 45, 'Black', 18),
	(56, 22, 42, 'Red', 18),
	(57, 27, 41, 'Blue', 19),
	(58, 12, 43, 'White', 19),
	(59, 15, 41, 'Black', 20),
	(60, 12, 40, 'Black', 21),
	(61, 28, 41, 'Black', 22),
	(62, 12, 44, 'Black', 22),
	(63, 17, 41, 'Blue', 23),
	(64, 11, 40, 'Grey', 24),
	(65, 21, 42, 'Black', 24),
	(66, 12, 41, 'Yellow', 25),
	(67, 29, 42, 'Orange', 25),
	(68, 11, 40, 'Black', 26),
	(69, 22, 42, 'Black', 27),
	(70, 12, 41, 'Blue', 28),
	(71, 17, 44, 'Brown', 29),
	(72, 13, 42, 'Black', 30),
	(73, 22, 41, 'Brown', 31),
	(74, 13, 44, 'Blue', 32),
	(75, 11, 41, 'Brown', 33),
	(76, 26, 44, 'Black', 34),
	(77, 14, 41, 'Brown', 35),
	(78, 11, 43, 'Orange', 36),
	(79, 13, 41, 'Brown', 36),
	(80, 25, 44, 'Black', 37),
	(81, 15, 41, 'Brown', 38);
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `picture`;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` (`picture_id`, `product_id`, `image_path`) VALUES
	(5, 1, '202092-9229461786-patika2.jpg'),
	(7, 4, '2020916-1722021179-image.jpg'),
	(8, 6, '2020916-7438061175-image-20010.jpg'),
	(9, 2, '2020916-5471754008-image-1.jpg'),
	(10, 3, '2020916-4846627546-image-2.jpg'),
	(11, 8, '2020917-8395712176-rebook.jpg'),
	(12, 9, '2020917-0416647361-adcloudfoam_01.jpg'),
	(13, 10, '2020917-2718912563-asics-gel-sonoma-4.jpg'),
	(14, 11, '2020917-8795951395-retroloafers.jpg'),
	(15, 12, '2020917-8152257434-tassel-loafers.jpg'),
	(16, 13, '2020917-4463563487-loafers-handmade.jpg'),
	(17, 14, '2020917-8372435422-gucci-loafers.jpg'),
	(18, 15, '2020917-2483658438-sliponloafers.jpg'),
	(19, 16, '2020917-1385613476-gucci-loafers-shoes.jpg'),
	(20, 17, '2020917-4316423019-riderbay.jpg'),
	(21, 18, '2020917-0816131274-sdmf310008a-omg_01-superdry-papuce.jpg'),
	(22, 19, '2020917-8411348944-nikejordan.jpg'),
	(23, 20, '2020917-6837779171-addidasout.jpg'),
	(24, 21, '2020917-3627884485-crocsclog.jpg'),
	(25, 22, '2020917-2651137141-xp-wp-clog.jpg'),
	(26, 23, '2020917-6661554972-danishclog.jpg'),
	(27, 24, '2020917-4297881950-habanaclogs.jpg'),
	(28, 25, '2020917-1082730991-am-toffeln-100-yellow.jpg'),
	(29, 26, '2020917-2265548749-skoll-clog.jpg'),
	(30, 27, '2020917-5128549887-countryboot.jpg'),
	(31, 28, '2020917-4784979478-cobmatboots.jpg'),
	(32, 29, '2020917-5768920516-combat-leather.jpg'),
	(33, 30, '2020917-1354137951-westernrounttoe.jpg'),
	(34, 31, '2020917-2054176623-wolverine-slip-resistant.jpg'),
	(35, 32, '2020917-7531819400-ariat-cowboy-boots.jpg'),
	(36, 33, '2020917-7688322131-timberland.jpg'),
	(37, 34, '2020917-7415646177-panamjack.jpg'),
	(38, 35, '2020917-5079502194-catfootwear.jpg'),
	(39, 36, '2020917-4168748953-columbia-outdry.jpg'),
	(40, 37, '2020917-0527578960-merrell-thermo.jpg'),
	(41, 38, '2020917-1839123207-sorel.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `product`;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`product_id`, `title`, `description`, `category_id`, `product_material_id`) VALUES
	(1, 'Nike AirMax 2', 'Neki opis1...', 1, 2),
	(2, 'Adidas COMFORT', 'Neki opis123...', 3, 1),
	(3, 'Nike LFS', 'Neki opis32...', 3, 2),
	(4, 'Puma', 'Neki opis44...', 1, 1),
	(6, 'Nike AirMax 200', 'Neki opis ovih patika,neki opis ovih patika,neki opis ovih patika ...', 1, 3),
	(8, 'Reebok classic', 'Neki Opis', 1, 2),
	(9, 'Adidas CloudFoam', 'Neki opis', 1, 3),
	(10, 'Assics', 'Opis Neki', 1, 5),
	(11, 'Retro Loafers', 'Opis', 2, 2),
	(12, 'Tassel Loafers', 'Opis', 2, 2),
	(13, 'Handmade Loafers', 'Opisss', 2, 2),
	(14, 'Gucci Loafers', 'Opisss', 2, 2),
	(15, 'Slip on Loafers', 'Opis', 2, 2),
	(16, 'Gucci Loafers Cool', 'Opis', 2, 2),
	(17, 'Rider Bay', 'Opis', 3, 5),
	(18, 'Superdry', 'Opis', 3, 1),
	(19, 'Nike Jordan', 'Opis', 3, 1),
	(20, 'Adidas OUT', 'Opis', 3, 1),
	(21, 'Crocks Clog', 'Opis', 5, 5),
	(22, 'XP WP Clog', 'Opis', 5, 2),
	(23, 'Danish Clog', 'Opis', 5, 6),
	(24, 'Habana Clog', 'Opis', 5, 2),
	(25, 'Toffeln Clog', 'Opis', 5, 6),
	(26, 'Skoll Clog', 'Opis', 5, 5),
	(27, 'Country Boots', 'Opis', 6, 2),
	(28, 'Combat Boots', 'Opis', 6, 2),
	(29, 'Combat Leather Boots', 'Opis', 6, 2),
	(30, 'Western Round Toe', 'Opis', 6, 2),
	(31, 'Wolverine Slip Resistant', 'OpisNeki', 6, 2),
	(32, 'Ariat CowBoy Boots', 'Opisss', 6, 2),
	(33, 'Timberland', 'Opis', 7, 2),
	(34, 'Panam Jack', 'Opisss', 7, 2),
	(35, 'CAT Footwear', 'Opiss', 7, 2),
	(36, 'Columbia OutDry', 'Opiss', 7, 1),
	(37, 'Merrell Thermo', 'OPIS', 7, 2),
	(38, 'Sorel', 'Opis', 7, 1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

DROP TABLE IF EXISTS `product_material`;
CREATE TABLE IF NOT EXISTS `product_material` (
  `product_material_id` int unsigned NOT NULL AUTO_INCREMENT,
  `material_name` varchar(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_material_id`),
  UNIQUE KEY `uq_product_material_material_name` (`material_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `product_material`;
/*!40000 ALTER TABLE `product_material` DISABLE KEYS */;
INSERT INTO `product_material` (`product_material_id`, `material_name`) VALUES
	(4, 'Felt'),
	(2, 'Leather'),
	(3, 'Linen'),
	(5, 'Plastic'),
	(1, 'Rubber'),
	(6, 'Wood');
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `product_price`;
/*!40000 ALTER TABLE `product_price` DISABLE KEYS */;
INSERT INTO `product_price` (`product_price_id`, `product_id`, `price`, `created_at`) VALUES
	(1, 1, 45.00, '2020-08-24 13:09:01'),
	(2, 1, 43.00, '2020-08-24 13:09:11'),
	(3, 4, 67.67, '2020-08-27 13:12:28'),
	(8, 4, 60.27, '2020-09-03 18:41:45'),
	(9, 4, 60.44, '2020-09-07 17:49:12'),
	(10, 3, 23.23, '2020-09-07 17:52:35'),
	(13, 3, 60.44, '2020-09-07 18:01:58'),
	(14, 3, 50.22, '2020-09-07 18:47:44'),
	(15, 2, 15.15, '2020-09-07 18:49:57'),
	(22, 2, 22.15, '2020-09-08 14:12:02'),
	(24, 6, 43.22, '2020-09-11 12:33:02'),
	(25, 8, 32.45, '2020-09-17 15:58:16'),
	(26, 9, 35.55, '2020-09-17 16:02:20'),
	(27, 10, 41.22, '2020-09-17 16:03:50'),
	(28, 11, 155.29, '2020-09-17 16:12:10'),
	(29, 12, 175.44, '2020-09-17 16:14:45'),
	(30, 13, 143.45, '2020-09-17 16:16:18'),
	(31, 14, 172.44, '2020-09-17 16:17:55'),
	(32, 15, 122.25, '2020-09-17 16:19:05'),
	(33, 16, 245.55, '2020-09-17 16:20:56'),
	(34, 17, 19.89, '2020-09-17 16:26:11'),
	(35, 18, 22.25, '2020-09-17 16:29:12'),
	(36, 19, 32.22, '2020-09-17 16:30:34'),
	(37, 20, 21.22, '2020-09-17 16:31:32'),
	(38, 21, 19.88, '2020-09-17 16:35:59'),
	(39, 22, 27.22, '2020-09-17 16:37:21'),
	(40, 23, 16.99, '2020-09-17 16:39:07'),
	(41, 24, 23.25, '2020-09-17 16:40:53'),
	(42, 25, 25.25, '2020-09-17 16:43:33'),
	(43, 26, 19.22, '2020-09-17 16:44:48'),
	(44, 27, 45.66, '2020-09-17 16:56:26'),
	(45, 28, 65.66, '2020-09-17 16:56:44'),
	(46, 29, 75.22, '2020-09-17 16:56:53'),
	(47, 30, 39.99, '2020-09-17 16:57:04'),
	(48, 31, 71.22, '2020-09-17 16:57:12'),
	(49, 32, 92.21, '2020-09-17 16:57:25'),
	(50, 33, 75.22, '2020-09-17 17:30:17'),
	(51, 34, 35.11, '2020-09-17 17:30:26'),
	(52, 35, 29.99, '2020-09-17 17:30:35'),
	(53, 36, 56.22, '2020-09-17 17:30:47'),
	(54, 37, 43.22, '2020-09-17 17:31:04'),
	(55, 38, 25.66, '2020-09-17 17:31:17');
/*!40000 ALTER TABLE `product_price` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
