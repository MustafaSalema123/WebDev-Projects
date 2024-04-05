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
-- Table structure for table `aspnetusers`
--

DROP TABLE IF EXISTS `aspnetusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aspnetusers` (
  `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedUserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedEmail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `SecurityStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int NOT NULL,
  `City` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Discriminator` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PostalCode` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `State` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `StreetAddress` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CompanyId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  KEY `EmailIndex` (`NormalizedEmail`),
  KEY `IX_AspNetUsers_CompanyId` (`CompanyId`),
  CONSTRAINT `FK_AspNetUsers_Companies_CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `companies` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetusers`
--

LOCK TABLES `aspnetusers` WRITE;
/*!40000 ALTER TABLE `aspnetusers` DISABLE KEYS */;
INSERT INTO `aspnetusers` VALUES ('27b6b554-f042-4178-a0a5-046c69bc5aed','test@gmail.com','TEST@GMAIL.COM','test@gmail.com','TEST@GMAIL.COM',0,'AQAAAAEAACcQAAAAEMZ/0KnknPzOSP7PxA4C0YfjpoelY+nUUsvD6ymQ1jArn9KRT0pGGa6KYuBZVzPrLQ==','MT4RNT2ZQTIAMINPTEYE5MZDRCR5OS64','c432a346-738c-4095-890b-330bed84deae',NULL,0,0,NULL,1,0,NULL,'IdentityUser',NULL,NULL,NULL,NULL,NULL),('3f4ea3bb-8159-4de7-8f0d-ce89012a9d07','TestCustNew@gmail.cm','TESTCUSTNEW@GMAIL.CM','TestCustNew@gmail.cm','TESTCUSTNEW@GMAIL.CM',0,'AQAAAAEAACcQAAAAEDoligbPxGD//5xL4T7J0vSisIgjqhZuOol5WfyOpXIfgRxV5ZbYNWPDxLJ86HUQ/A==','RDSARHOYIIT7VYTOJFKV2PTN44JDAGUN','5216419a-7397-4e4e-b8cf-6db74c51c2e0','9797979797',0,0,NULL,1,0,'mumbai','ApplicationUser','test Custer New','2323232','maharashtar','near jb nagar chakala',NULL),('7b61723c-54ef-43b8-93c9-d7ebe3b3606a','test123@gmail.com','TEST123@GMAIL.COM','test123@gmail.com','TEST123@GMAIL.COM',0,'AQAAAAEAACcQAAAAEFIEYr21SSAUVK3TXSfENBi1uH0OFt9985Dy7EjKT3P3lHe+Jf83buH5dlmt2J27eg==','LAY6WSE54Q3DODKSEKPECCJLYTY5HHTC','2842c844-83fa-448d-9932-de7081fc67e3','6868686882',0,0,NULL,1,0,NULL,'ApplicationUser','tester213','csvs','maha','dfsfdv',4),('a922a1ef-69c8-4eb2-a7ff-ab77a629bd00','testadmin@gmail.com','TESTADMIN@GMAIL.COM','testadmin@gmail.com','TESTADMIN@GMAIL.COM',0,'AQAAAAEAACcQAAAAEMR0Qin4Ay/J+PM3/wyWj8RiAwEKN5JRfzzoBPvoS6evNcRzdLG1s5YKXzsD5eBWCA==','XGNTH3FC24IKKK4NZ53N2AAKE5F7NYMO','faad341f-65e2-480c-9bea-4d0f9444a00c',NULL,0,0,NULL,1,0,NULL,'IdentityUser',NULL,NULL,NULL,NULL,NULL),('ceaeee5c-c788-4c92-8024-4f2d03138ac8','testCustomer@gmail.com','TESTCUSTOMER@GMAIL.COM','testCustomer@gmail.com','TESTCUSTOMER@GMAIL.COM',0,'AQAAAAEAACcQAAAAEJil279K208D/SIpHQOA83JdExivDp1AwdPUliLPTZHGTnAnTnMJ2tH8tNSmDIPCcw==','BP4WPZEQTIS64LWWJFXUS4NZJAYCVEHN','a39a41d0-9b69-463d-9651-ebf169f2809a','6868686882',0,0,NULL,1,0,'Mumbay','ApplicationUser','testerCustomer','344546','maharashtar','near shatan gali',NULL);
/*!40000 ALTER TABLE `aspnetusers` ENABLE KEYS */;
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
