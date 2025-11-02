-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: onyxcleaning
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Name_EN` varchar(100) DEFAULT NULL,
  `Distance` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Балтийск','Baltiysk',54),(2,'Правдинск','Pravdinsk',25),(3,'Ладушкин','Ladushkin',36),(4,'Гвардейск','Gvardeysk',40),(5,'Гурьевск','Gurievsk',42),(6,'Полесск','Polessk',61),(7,'Зеленоградск','Zelenogradsk',63),(8,'Светлогорск','Svetlogorsk',68),(9,'Пионерский','Pionersky',68),(10,'Черняховск','Chernyakhovsk',81),(11,'Гусев','Gusev',103),(12,'Советск','Sovetsk',111),(13,'Озёрск','Ozersk',89),(14,'Мамоново','Mamonovo',46),(15,'Неман','Neman',115),(16,'Светлый','Light',46),(17,'Славск','Slavsk',99),(18,'Калининград','Kaliningrad',0);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dopservicesapartment`
--

DROP TABLE IF EXISTS `dopservicesapartment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dopservicesapartment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `NameCatCleaning` varchar(45) DEFAULT NULL,
  `NameCatRooms` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dopservicesapartment`
--

LOCK TABLES `dopservicesapartment` WRITE;
/*!40000 ALTER TABLE `dopservicesapartment` DISABLE KEYS */;
INSERT INTO `dopservicesapartment` VALUES (1,'Меняем постельное белье, заправляем кровать',999,'Basic','Команты'),(2,'Развешиваем верхнюю одежду',990,'Basic','Комнаты'),(3,'Помоем лоток питомца',150,'Basic','Комнаты'),(4,'Расставляем обувь',890,'Basic','Комнаты'),(5,'Протрем корпусную мебель внутри (пустую) ',999,'Basic','Комнаты'),(6,'Моем посуду',250,'Basic','Кухня'),(7,'Помоем кухонные шкафы внутри (освобожденные от посуды) ',990,'Basic','Кухня'),(8,'Помоем кухонные шкафы внутри (с изъятием всех принадлежностей) ',1250,'Basic','Кухня'),(9,'Помоем микроволновую печь (свч) внутри',990,'Basic','Кухня'),(10,'Помоем духовой шкаф внутри',250,'Basic','Кухня'),(11,'Помоем холодильник внутри',990,'Basic','Кухня'),(12,'Помоем вытяжку ',250,'Basic','Кухня'),(13,'Собираем и выносим мусор, меняем мешки',990,'Basic','Кухня'),(14,'Помоем стиральную машину внутри (отсек для порошка, резинку барабана) ',990,'Basic','Санузел'),(15,'Помоем лоток питомца',990,'General','Команты'),(16,'Изъятие вещей и предметов из шкафов',850,'General','Комнаты'),(17,'Помоем кухонные шкафы внутри (освобожденные от посуды)',120,'General','Кухня'),(18,'Помоем лоток питомца',1250,'Repair','Комнаты');
/*!40000 ALTER TABLE `dopservicesapartment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dopservicesoffices`
--

DROP TABLE IF EXISTS `dopservicesoffices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dopservicesoffices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dopservicesoffices`
--

LOCK TABLES `dopservicesoffices` WRITE;
/*!40000 ALTER TABLE `dopservicesoffices` DISABLE KEYS */;
INSERT INTO `dopservicesoffices` VALUES (1,'Генеральная уборка офиса (с перемещением мебели)',150,'м²'),(2,'Очистка после ремонта',170,'м²'),(4,'Чистка жалюзи',350,'окно');
/*!40000 ALTER TABLE `dopservicesoffices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dopserviceswindows`
--

DROP TABLE IF EXISTS `dopserviceswindows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dopserviceswindows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dopserviceswindows`
--

LOCK TABLES `dopserviceswindows` WRITE;
/*!40000 ALTER TABLE `dopserviceswindows` DISABLE KEYS */;
INSERT INTO `dopserviceswindows` VALUES (1,'Высотная мойка (лестница/штанга)',450,'створка'),(2,'Мойка балконного блока',600,NULL),(3,'Раздвижные конструкции, панорамные окна',550,'элемент'),(4,'Мойка зеркал, стеклянных столов, фасадов',150,'элемент'),(5,'Очистка от клейкой ленты, скотча, налета',150,'элемент'),(6,'Удаление строительных загрязнений',NULL,'от степени');
/*!40000 ALTER TABLE `dopserviceswindows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `MinPrice` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
INSERT INTO `price` VALUES (2,'CleaningOffice',NULL,3500),(3,'OfficeQuadrature',120,NULL),(4,'CleaningWindows',NULL,2500),(5,'Door',350,NULL),(6,'Basic',350,NULL),(7,'General',450,NULL),(8,'Repair',500,NULL),(9,'CleaningApartment',NULL,3500);
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-30  8:34:35
