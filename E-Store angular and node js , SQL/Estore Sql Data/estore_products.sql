-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: estore
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
  `id` int NOT NULL,
  `product_name` varchar(45) DEFAULT NULL,
  `product_description` varchar(100) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `ratings` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `product_img` varchar(45) DEFAULT NULL,
  `keywords` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Products_Categories_id` (`category_id`),
  CONSTRAINT `FK_Products_Categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Jacket','Jacket description goes here',8000,5,5,'shop-1.jpg','jacket,woolen,black'),(2,'Purse','Very nice purse',2000,3,7,'shop-2.jpg','bag,purse,black,leather'),(3,'Dress','Nice Party Dress',3600,4,5,'shop-3.jpg','dress,party,flock'),(4,'Denim Jeans','Denim Jeans',4000,4,4,'shop-4.jpg','denim,jeans,casual,pant'),(5,'Laced Boots','Premium leather boots',5200,4,6,'shop-5.jpg','boots,laced,yellow'),(6,'Back pack','Spacious back pack',1600,5,7,'shop-6.jpg','bag,leather,black'),(7,'Ear rings','Beautiful ear rings',800,4,7,'shop-7.jpg','ear,rings,blue,golden'),(8,'Scarf','Matching scarf',2400,4,7,'shop-8.jpg','scarf,chocolate,party'),(9,'Boots','Black leather boots',5600,4,6,'shop-9.jpg','leather,boots,black'),(10,'Casual Shirt','Casual Shirt sample product',1000,4,4,'Shirt.jpg','cotton,shirt,cheks'),(11,'Blue Shirt','dec',1000,4,4,'blue.jpg','Blue,Shirt');
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

-- Dump completed on 2024-04-05 11:16:33
