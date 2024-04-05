-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blogdata
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
-- Table structure for table `blogimages`
--

DROP TABLE IF EXISTS `blogimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogimages` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `FileName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `FileExtension` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `DateCreated` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogimages`
--

LOCK TABLES `blogimages` WRITE;
/*!40000 ALTER TABLE `blogimages` DISABLE KEYS */;
INSERT INTO `blogimages` VALUES ('08dc36ba-8019-4e0f-87d4-4e4f6ffd45da',NULL,'.png',NULL,'http://localhost:5222/Images/.png','2024-02-26 16:33:02.053858'),('08dc36ba-900b-44e5-873c-db178b89422e',NULL,'.png',NULL,'http://localhost:5222/Images/.png','2024-02-26 16:33:28.819786'),('08dc36ba-c6f3-4205-8799-71b13677e1d8','AspFileName','.png','Asp My name','http://localhost:5222/Images/AspFileName.png','2024-02-26 16:35:00.939183'),('08dc36bc-2fcb-4992-8140-f5038b3e8a8c','sigma face','.jpg','Sigma good face','http://localhost:5222/Images/sigma face.jpg','2024-02-26 16:45:06.318496'),('08dc36bc-a9ef-476f-81b3-6a0a90d0edf3','New sigma','.jpg','my sigam','http://localhost:5222/Images/New sigma.jpg','2024-02-26 16:48:31.251761'),('08dc3743-3bc9-4abe-87b1-f5697b789f4b','Unity Photo','.jpg','Images','http://localhost:5222/Images/Unity Photo.jpg','2024-02-27 08:51:48.499880'),('08dc3764-d989-4eda-8f62-bc44580f13f8','unreal ','.png','unreal post','http://localhost:5222/Images/unreal .png','2024-02-27 12:52:26.552456');
/*!40000 ALTER TABLE `blogimages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-05 11:17:17
