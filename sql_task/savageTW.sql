CREATE DATABASE  IF NOT EXISTS `twitter` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `twitter`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: twitter
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `photo_link` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `likes` int unsigned DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (1,'Test post 1 hello','2020-05-10 20:57:00','www.png.png',123,1);
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (2,'Test post 2 hello','2020-05-10 22:20:00',NULL,321,1);
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (3,'Tester is writing','2010-10-10 10:10:10',NULL,2,6);
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (4,'Happy Birthday','2000-08-09 11:15:00','child.png',999,10);
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (5,'One two three hello','2001-02-03 05:57:00',NULL,64,9);
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (6,'Youth','2009-03-01 23:00:00',NULL,32,5);
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (7,'xxx hello','2013-12-12 15:27:00','xwx',654333,4);
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (8,'OLd post','2016-06-13 17:28:00','test.jpg',567,3);
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (9,'Stavki na sport','2020-05-10 22:20:00','1xbet.png',245,1);
INSERT INTO `post` (`post_id`, `description`, `created_at`, `photo_link`, `likes`, `user_id`) VALUES (10,'Bystrie vyplati','2020-05-10 22:20:00','post.gg',988,1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `name`) VALUES (1,'Alex Semenenko');
INSERT INTO `user` (`user_id`, `name`) VALUES (2,'Sisha Alexandrovich');
INSERT INTO `user` (`user_id`, `name`) VALUES (3,'Artem Viking');
INSERT INTO `user` (`user_id`, `name`) VALUES (4,'Urec Pomoika');
INSERT INTO `user` (`user_id`, `name`) VALUES (5,'Denchik Flomasterov');
INSERT INTO `user` (`user_id`, `name`) VALUES (6,'Nikita CokCok');
INSERT INTO `user` (`user_id`, `name`) VALUES (7,'Zritel Ilya');
INSERT INTO `user` (`user_id`, `name`) VALUES (8,'Brat Artem');
INSERT INTO `user` (`user_id`, `name`) VALUES (9,'American Boy');
INSERT INTO `user` (`user_id`, `name`) VALUES (10,'Tester Stepan');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-10 23:06:15
