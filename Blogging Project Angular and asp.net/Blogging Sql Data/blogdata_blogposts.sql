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
-- Table structure for table `blogposts`
--

DROP TABLE IF EXISTS `blogposts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogposts` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ShortDiscription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `FeaturedImgUrl` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UrlHandle` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PublishedDate` datetime(6) NOT NULL,
  `Author` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `IsVisible` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogposts`
--

LOCK TABLES `blogposts` WRITE;
/*!40000 ALTER TABLE `blogposts` DISABLE KEYS */;
INSERT INTO `blogposts` VALUES ('08dc369c-1d92-4a7b-8aa5-3aae882b7f74','C++','C++ is  most powerfull and efficence programming language','C++ (or “C-plus-plus”) is a generic programming language for building software. It\'s an object-oriented language. In other words, it emphasizes using data fields with unique attributes (a.k.a. objects) rather than logic or functions. A common example of an object is a user account on a','http://localhost:5222/Images/AspFileName.png','C++ post','2024-02-03 00:00:00.000000','Mustafa',1),('08dc36a9-9126-4bf2-89b8-b7d29f3e2189','Codind','Google Code-in was a contest that introduced pre-university students (ages 13-17) to open source software development. The contest was held for 10 years starting in November 2010 and wrapping up the final contest in January 2020.','Google Code-in was a contest that introduced pre-university students (ages 13-17) to open source software development. The contest was held for 10 years starting in November 2010 and wrapping up the final contest in January 2020.\n\nGoogle Code-in grew out of GHOP (The Google Highly Open Participation contest) which first took place back in 2007. The contest was reborn as Google Code-in during late 2010','','https://codein.withgoogle.com/archive/','2024-02-26 09:01:03.152000','',1),('08dc3743-42d8-4368-888d-2fa5dc991c6e','Start building spatial apps for Apple Vision Pro with Unity','Following months of collaboration with developers in our visionOS beta program, we’re excited to share that official support for visionOS is now available to all Unity Pro, Enterprise, and Industry subscribers. You can now leverage Unity’s familiar authoring workflows, robust XR tools, and cross-platform compatibility to create immersive spatial experiences for a whole new ecosystem on Apple Vision Pro. Official support channels and success plans are also available to help you get started.','Thousands of developers around the world participated in our beta program, collaborating closely with our engineering teams and generously sharing knowledge to build a community primed for a new era of spatial computing. The program attracted a broad range of developers, many of whom are building spatial experiences for the first time.\n\nUnity’s support for visionOS enables you to create three main types of spatial experiences:\n\nImmersive mixed reality experiences that blend digital content with the real world and can run alongside other apps in the Shared Space, made possible by Unity’s newly developed PolySpatial technology \nPorts of existing virtual reality games or new, fully immersive experiences that replace a player’s surroundings with another environment\nFor Light Brick Studio, the imaginative minds behind the atmospheric geometric puzzle game LEGO® Builder’s Journey, Unity’s support for visionOS opens up the opportunity to create spatial experiences that leverage the powerful features of Apple Vision Pro.\n\n“Making LEGO® Builder’s Journey for Apple Vision Pro has been an incredible experience, working with a completely new type of interaction and rendering paradigm,” says Mikkel Fredborg, technical lead on LEGO® Builder’s Journey. “Unity has been very supportive in bringing their well-known workflow to a completely new type of system. Thanks to the support for visionOS, we have been able to tap into many of the features that make Apple Vision Pro such a unique platform. You really have to try it to understand how it shifts everything.”\nContent that runs in a 2D window and can be resized and repositioned by the user in the Shared Space\nWe know you want to see some of these new experiences that will be possible on Apple Vision Pro. Let’s explore the innovative creations from developers who were part of Unity\'s visionOS beta program.','http://localhost:5222/Images/Unity Photo.jpg','spatial-apps-for-apple-vision-pro','2024-02-27 00:00:00.000000','Mustafa',1),('08dc3765-4c4c-41bb-8445-72b04c0055d1','Cartoon Stylized Valley Environment | LIZI Studio',' This PBR cartoon environment asset package will have you feeling like a kid on Saturday morning again. With 65 unique meshes, 83 hand-painted textures, and seven Niagara effects, it includes high-quality cartoon plants, rocks, sky, water, and bridges. It even features real-time interactions with the plants.','\n<b>From low-poly American towns and Art Deco interiors to photorealistic spruce forests and cartoon valleys, February’s Marketplace sale can take you into many different worlds at a great discount. And when it comes to populating them, you’re spoiled for choice, with a highly detailed female protagonist, an extremely versatile character customizer, a huge pack of high-octane action animations, and much more.\n</b> \n\n<strong>And that’s just for starters. Choose from over 2,000 Marketplace products for a massive 50% off, including environments, plugins, props, characters, sounds, music, Blueprints, and more. \n\n</strong>\n<i>\nDon’t miss this chance to grab some great goodies at a bargain price!</i>','http://localhost:5222/Images/unreal .png','unreal -post','2024-02-27 00:00:00.000000','Unreal',1);
/*!40000 ALTER TABLE `blogposts` ENABLE KEYS */;
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
