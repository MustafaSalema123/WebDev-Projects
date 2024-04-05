-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bulky
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orderheaders`
--

DROP TABLE IF EXISTS `orderheaders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderheaders` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ApplicationUserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `OrderDate` datetime(6) NOT NULL,
  `ShippingDate` datetime(6) NOT NULL,
  `OrderTotal` double NOT NULL,
  `OrderStatus` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PaymentStatus` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `TrackingNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Carrier` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PaymentDate` datetime(6) NOT NULL,
  `PaymentDueDate` datetime(6) NOT NULL,
  `SessionId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PaymentIntentId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `StreetAddress` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `City` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `State` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PostalCode` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_OrderHeaders_ApplicationUserId` (`ApplicationUserId`),
  CONSTRAINT `FK_OrderHeaders_AspNetUsers_ApplicationUserId` FOREIGN KEY (`ApplicationUserId`) REFERENCES `aspnetusers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderheaders`
--

LOCK TABLES `orderheaders` WRITE;
/*!40000 ALTER TABLE `orderheaders` DISABLE KEYS */;
INSERT INTO `orderheaders` VALUES (20,'ceaeee5c-c788-4c92-8024-4f2d03138ac8','2024-02-22 16:39:22.483762','2024-02-22 16:42:03.220155',165,'Shippeded','Approved',NULL,NULL,'2024-02-22 16:41:00.976573','0001-01-01 00:00:00.000000','pi_3OmaAOSDqekH449w1oc93gAs',NULL,'6868686882','near mumbai','Mumbai','maharashtar','344546','Custome1'),(21,'ceaeee5c-c788-4c92-8024-4f2d03138ac8','2024-03-18 09:39:43.889899','0001-01-01 00:00:00.000000',140,'Approved','Approved',NULL,NULL,'2024-03-18 09:40:31.020741','0001-01-01 00:00:00.000000','pi_3OvXVfSDqekH449w1muCanwu',NULL,'6868686882','near goa','Mumbay','maharashtar','344546','testerCustomer');
/*!40000 ALTER TABLE `orderheaders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-05 11:13:25
