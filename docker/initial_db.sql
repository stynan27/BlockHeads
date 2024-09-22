-- MySQL dump 10.13  Distrib 8.4.2, for Linux (x86_64)
--
-- Host: 0.0.0.0    Database: blockheads-database
-- ------------------------------------------------------
-- Server version	8.4.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lego_set`
--

DROP TABLE IF EXISTS `lego_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lego_set` (
  `id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `identifying_number` int DEFAULT NULL,
  `instructions` mediumblob,
  `name` varchar(255) DEFAULT NULL,
  `number_of_pieces` int DEFAULT NULL,
  `price` float NOT NULL,
  `user_account_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtmf0wg7yuueomxtw74mwynlg2` (`user_account_id`),
  CONSTRAINT `FKtmf0wg7yuueomxtw74mwynlg2` FOREIGN KEY (`user_account_id`) REFERENCES `user_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lego_set`
--

LOCK TABLES `lego_set` WRITE;
/*!40000 ALTER TABLE `lego_set` DISABLE KEYS */;
INSERT INTO `lego_set` VALUES (1,NULL,NULL,NULL,'Rex Helmet',NULL,10,1),(2,'Faithful recreation of Venator-class Star Destroyer.',75367,NULL,'Venator',5374,649.99,1),(3,'LAAT gunship with Coruscant guard flair.',75354,NULL,'Coruscant Guard Gunship',1083,139.99,1),(4,'Brick Headz figurine of clone commander Cody.',40675,NULL,'Brick Headz Cody',147,9.99,2),(5,'Ultimate Collector Series AT-AT walker.',75313,NULL,'AT-AT',6785,849.99,2),(6,'N-1 starfighter with the Mandalorian and Grogu.',75363,NULL,'Mandalorian N-1 ',88,15.99,2);
/*!40000 ALTER TABLE `lego_set` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lego_set_seq`
--

DROP TABLE IF EXISTS `lego_set_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lego_set_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lego_set_seq`
--

LOCK TABLES `lego_set_seq` WRITE;
/*!40000 ALTER TABLE `lego_set_seq` DISABLE KEYS */;
INSERT INTO `lego_set_seq` VALUES (101);
/*!40000 ALTER TABLE `lego_set_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_account` (
  `id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES (1,NULL,'$2a$15$MEQcfyQF1hrOZEO0k93R9ecZGJHZVtYLBJYRbtJLllkqyAPJo8W.K','stynan'),(2,NULL,'$2a$15$BycbVHrDgNZftUubj3Bo2u9jUZrLe4QkcZM/yw1b2mWuj4coGbcte','jtangelo98');
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account_seq`
--

DROP TABLE IF EXISTS `user_account_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_account_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account_seq`
--

LOCK TABLES `user_account_seq` WRITE;
/*!40000 ALTER TABLE `user_account_seq` DISABLE KEYS */;
INSERT INTO `user_account_seq` VALUES (101);
/*!40000 ALTER TABLE `user_account_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-21 21:17:47
