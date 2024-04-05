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
-- Table structure for table `blogpostcategory`
--

DROP TABLE IF EXISTS `blogpostcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogpostcategory` (
  `BlogPostsId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `categoriesId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  PRIMARY KEY (`BlogPostsId`,`categoriesId`),
  KEY `IX_BlogPostCategory_categoriesId` (`categoriesId`),
  CONSTRAINT `FK_BlogPostCategory_BlogPosts_BlogPostsId` FOREIGN KEY (`BlogPostsId`) REFERENCES `blogposts` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_BlogPostCategory_Categories_categoriesId` FOREIGN KEY (`categoriesId`) REFERENCES `categories` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogpostcategory`
--

LOCK TABLES `blogpostcategory` WRITE;
/*!40000 ALTER TABLE `blogpostcategory` DISABLE KEYS */;
INSERT INTO `blogpostcategory` VALUES ('08dc369c-1d92-4a7b-8aa5-3aae882b7f74','08dc367b-c00c-4ed1-801a-ba47c7d8973d'),('08dc36a9-9126-4bf2-89b8-b7d29f3e2189','08dc367b-c00c-4ed1-801a-ba47c7d8973d'),('08dc36a9-9126-4bf2-89b8-b7d29f3e2189','08dc3689-4be0-48eb-8aeb-67a68f3d6d5d'),('08dc36a9-9126-4bf2-89b8-b7d29f3e2189','08dc368b-1f98-4d8b-8a57-bfa30b9732f8'),('08dc3743-42d8-4368-888d-2fa5dc991c6e','08dc368b-1f98-4d8b-8a57-bfa30b9732f8'),('08dc3743-42d8-4368-888d-2fa5dc991c6e','08dc3761-97fb-4094-8b29-1953c0ff5617'),('08dc3765-4c4c-41bb-8445-72b04c0055d1','08dc3761-97fb-4094-8b29-1953c0ff5617'),('08dc3765-4c4c-41bb-8445-72b04c0055d1','08dc3765-66b2-4869-85df-d175afa1590d');
/*!40000 ALTER TABLE `blogpostcategory` ENABLE KEYS */;
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
