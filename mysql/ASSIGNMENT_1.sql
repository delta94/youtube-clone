-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: assignment
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `a_likes_c`
--

DROP TABLE IF EXISTS `a_likes_c`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `a_likes_c` (
  `account_name` varchar(30) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `dtime` datetime DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`account_name`,`comment_id`),
  KEY `cmt_id_like_idx` (`comment_id`),
  CONSTRAINT `a_acc_name_like` FOREIGN KEY (`account_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cmt_id_like` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a_likes_c`
--

LOCK TABLES `a_likes_c` WRITE;
/*!40000 ALTER TABLE `a_likes_c` DISABLE KEYS */;
/*!40000 ALTER TABLE `a_likes_c` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `a_likes_r`
--

DROP TABLE IF EXISTS `a_likes_r`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `a_likes_r` (
  `account_name` varchar(30) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `dtime` datetime DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`account_name`,`comment_id`),
  KEY `a_cmt_id_like_r_idx` (`comment_id`),
  CONSTRAINT `a_acc_name_like_r` FOREIGN KEY (`account_name`) REFERENCES `account` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `a_cmt_id_like_r` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a_likes_r`
--

LOCK TABLES `a_likes_r` WRITE;
/*!40000 ALTER TABLE `a_likes_r` DISABLE KEYS */;
/*!40000 ALTER TABLE `a_likes_r` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `a_likes_v`
--

DROP TABLE IF EXISTS `a_likes_v`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `a_likes_v` (
  `account_name` varchar(30) NOT NULL,
  `video_id` int(11) NOT NULL,
  `dtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `liked` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`account_name`,`video_id`),
  KEY `vid_id_like_idx` (`video_id`),
  CONSTRAINT `acc_name_like` FOREIGN KEY (`account_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vid_id_like` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a_likes_v`
--

LOCK TABLES `a_likes_v` WRITE;
/*!40000 ALTER TABLE `a_likes_v` DISABLE KEYS */;
/*!40000 ALTER TABLE `a_likes_v` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `a_provides_t`
--

DROP TABLE IF EXISTS `a_provides_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `a_provides_t` (
  `provider` varchar(30) NOT NULL,
  `transcript_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  PRIMARY KEY (`provider`,`transcript_id`,`video_id`),
  KEY `trans_id_idx` (`transcript_id`),
  KEY `video_id_idx` (`video_id`),
  CONSTRAINT `provider` FOREIGN KEY (`provider`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `trans_id` FOREIGN KEY (`transcript_id`) REFERENCES `transcript` (`transcript_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `video_id` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a_provides_t`
--

LOCK TABLES `a_provides_t` WRITE;
/*!40000 ALTER TABLE `a_provides_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `a_provides_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `a_views_v`
--

DROP TABLE IF EXISTS `a_views_v`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `a_views_v` (
  `account_name` varchar(30) NOT NULL,
  `video_id` int(11) NOT NULL,
  `dtime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_name`,`video_id`),
  KEY `vid_id_idx` (`video_id`),
  CONSTRAINT `acc_name_view` FOREIGN KEY (`account_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vid_id` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a_views_v`
--

LOCK TABLES `a_views_v` WRITE;
/*!40000 ALTER TABLE `a_views_v` DISABLE KEYS */;
/*!40000 ALTER TABLE `a_views_v` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `a_watch_later_v`
--

DROP TABLE IF EXISTS `a_watch_later_v`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `a_watch_later_v` (
  `account_name` varchar(30) NOT NULL,
  `video_id` int(11) NOT NULL,
  PRIMARY KEY (`account_name`,`video_id`),
  KEY `vid_id_watch_idx` (`video_id`),
  CONSTRAINT `acc_name_watch` FOREIGN KEY (`account_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vid_id_watch` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a_watch_later_v`
--

LOCK TABLES `a_watch_later_v` WRITE;
/*!40000 ALTER TABLE `a_watch_later_v` DISABLE KEYS */;
/*!40000 ALTER TABLE `a_watch_later_v` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `username` varchar(30) NOT NULL,
  `usertype` tinyint(1) DEFAULT '0',
  `password` char(32) NOT NULL,
  `profile_img` varchar(32) DEFAULT 'default.img',
  `description` text,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='THIS IS THE ACCOUNT TABLE';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `dtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `account_name` varchar(30) NOT NULL,
  `video_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  PRIMARY KEY (`account_name`,`video_id`,`comment_id`),
  KEY `video_id_cmt_idx` (`video_id`),
  CONSTRAINT `acc_name_cmt` FOREIGN KEY (`account_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `video_id_cmt` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `dtime` datetime DEFAULT NULL,
  `content` text,
  `title` varchar(45) DEFAULT NULL,
  `account_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `acc_name_idx` (`account_name`),
  CONSTRAINT `acc_name` FOREIGN KEY (`account_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre` (
  `genre_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `p_contains_v`
--

DROP TABLE IF EXISTS `p_contains_v`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `p_contains_v` (
  `playlist_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  PRIMARY KEY (`playlist_id`,`video_id`),
  KEY `comment_id_idx` (`video_id`),
  CONSTRAINT `comment_id` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `playlist_id` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`playlist_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `p_contains_v`
--

LOCK TABLES `p_contains_v` WRITE;
/*!40000 ALTER TABLE `p_contains_v` DISABLE KEYS */;
/*!40000 ALTER TABLE `p_contains_v` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlist` (
  `playlist_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  `public` tinyint(1) DEFAULT NULL,
  `dtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `owner` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `owner_playlist` (`owner`),
  CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `account` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `owner_playlist` FOREIGN KEY (`owner`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `replies` (
  `account_name` varchar(30) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `reply_id` int(11) NOT NULL,
  PRIMARY KEY (`account_name`,`comment_id`,`reply_id`),
  KEY `cmt_id_rep_idx` (`comment_id`),
  KEY `rep_id_rep_idx` (`reply_id`),
  CONSTRAINT `acc_name_rep` FOREIGN KEY (`account_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cmt_id_rep` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rep_id_rep` FOREIGN KEY (`reply_id`) REFERENCES `reply` (`reply_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reply` (
  `reply_id` int(11) NOT NULL AUTO_INCREMENT,
  `dtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reply_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `video_id` int(11) NOT NULL,
  `account_name` varchar(30) NOT NULL,
  `dtime` datetime DEFAULT NULL,
  `content` longtext,
  `title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`video_id`,`account_name`),
  KEY `acc_name_idx` (`account_name`),
  CONSTRAINT `acc_name_report` FOREIGN KEY (`account_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `video_id_report` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribes`
--

DROP TABLE IF EXISTS `subscribes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscribes` (
  `channel_name` varchar(30) NOT NULL,
  `subscriber_name` varchar(30) NOT NULL,
  PRIMARY KEY (`channel_name`,`subscriber_name`),
  KEY `scb_name_subscribe_idx` (`subscriber_name`),
  CONSTRAINT `chl_name_subscribe` FOREIGN KEY (`channel_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `scb_name_subscribe` FOREIGN KEY (`subscriber_name`) REFERENCES `account` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribes`
--

LOCK TABLES `subscribes` WRITE;
/*!40000 ALTER TABLE `subscribes` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscribes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transcript`
--

DROP TABLE IF EXISTS `transcript`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transcript` (
  `transcript_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `length` int(11) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  `dtime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transcript_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transcript`
--

LOCK TABLES `transcript` WRITE;
/*!40000 ALTER TABLE `transcript` DISABLE KEYS */;
/*!40000 ALTER TABLE `transcript` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v_belongs_to_g`
--

DROP TABLE IF EXISTS `v_belongs_to_g`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `v_belongs_to_g` (
  `video_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  PRIMARY KEY (`video_id`,`genre_id`),
  KEY `gnr_id_idx` (`genre_id`),
  CONSTRAINT `gnr_id_belongs` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vid_id_belongs` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v_belongs_to_g`
--

LOCK TABLES `v_belongs_to_g` WRITE;
/*!40000 ALTER TABLE `v_belongs_to_g` DISABLE KEYS */;
/*!40000 ALTER TABLE `v_belongs_to_g` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `description` text,
  `status` tinyint(4) DEFAULT '0',
  `license` varchar(45) DEFAULT NULL,
  `published_dtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `upload_account` varchar(30) DEFAULT NULL,
  `dtime_upload` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `upload_account` (`upload_account`),
  CONSTRAINT `video_ibfk_1` FOREIGN KEY (`upload_account`) REFERENCES `account` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This is video table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-22 21:20:11
