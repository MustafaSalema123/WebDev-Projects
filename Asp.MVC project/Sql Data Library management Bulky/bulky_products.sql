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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ISBN` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Author` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ListPrice` double NOT NULL,
  `Price` double NOT NULL,
  `Price50` double NOT NULL,
  `Price100` double NOT NULL,
  `CategoryId` int NOT NULL DEFAULT '0',
  `ImageUrl` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_products_CategoryId` (`CategoryId`),
  CONSTRAINT `FK_products_Categories_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Fortune of Time','Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ','SWD9999001','Billy Spark',99,90,85,80,1,'\\images\\product\\e7fa056a-95c6-4f21-9932-3c1165d1f7ac.jpg'),(2,'Dark Skies','Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ','CAW777777701','Nancy Hoover',40,30,25,20,1,'\\images\\product\\08efed32-f109-410c-a83a-c8775df369f6.jpg'),(3,'Vanish in the Sunset','Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ','RITO5555501','Julian Button',55,50,40,35,2,'\\images\\product\\f5287bf5-a39f-4610-869e-ae50ed2e2123.jpg'),(5,'Rock in the Ocean','Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ','SOTJ1111111101','Ron Parker',30,27,25,20,2,'\\images\\product\\a141207c-f854-44c8-8298-dce03185e9de.jpg'),(6,'Leaves and Wonders','Praesent vitae sodales libero. Praesent molestie orci augue, vitae euismod velit sollicitudin ac. Praesent vestibulum facilisis nibh ut ultricies.\r\n\r\nNunc malesuada viverra ipsum sit amet tincidunt. ','FOT000000001','Laura Phantom',25,23,22,20,3,'\\images\\product\\97a2e203-115b-4232-8605-962a297fe6a8.jpg'),(14,'wings of fire','APJ Abdul Kalam\'s autobiography, Wings of Fire, covers his early life as well as his role in Indian space research and missile programmes. It tells the narrative of a young boy from a poor family who rose through the ranks of Indian space research and missile programmes to become the country\'s president.','FOT000000002','APJ Abdul Kalam',100,45,70,190,2,'\\images\\product\\90c42072-e058-43dc-b362-561e1253d74c.jpg'),(15,'Asp.net book','The complete, pragmatic guide to building high-value solutions with ASP. Net Core programming ASP. Net Core is the definitive guide to practical web-based application development with Microsoft\'s new ASP. Net Core framework. Microsoft MVP dino Esposito introduces proven techniques and well-crafted example code for solving real problems with ASP. Net Core. Step by step, he guides you through using all key ASP. Net Core technologies, including MVC for HTML generation,.','978-9388028431','Dino Esposito',800,25,95,500,5,'\\images\\product\\c0ebbd01-52ea-4226-b1d5-b687c5b4aafa.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
