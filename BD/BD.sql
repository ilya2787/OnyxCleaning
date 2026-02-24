-- MySQL dump 10.13  Distrib 8.0.45, for macos15 (arm64)
--
-- Host: localhost    Database: onyxcleaning
-- ------------------------------------------------------
-- Server version	9.6.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '0533b87a-0105-11f1-bfa5-0bcad6d1936c:1-200';

--
-- Table structure for table `base`
--

DROP TABLE IF EXISTS `base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `base` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Name_cleaning` varchar(45) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `OrderQuantity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base`
--

LOCK TABLES `base` WRITE;
/*!40000 ALTER TABLE `base` DISABLE KEYS */;
INSERT INTO `base` VALUES (2,'Вася','+7 (857) 698-57-69','CleaningApartment','2026-02-11',1),(4,'Илья','+7 (921) 007-07-08','CleaningWindows','2026-02-18',7),(5,'Игнат','+7 (940) 249-32-84','CleaningApartment','2026-02-11',1);
/*!40000 ALTER TABLE `base` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Table structure for table `Contact`
--

DROP TABLE IF EXISTS `Contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contact`
--

LOCK TABLES `Contact` WRITE;
/*!40000 ALTER TABLE `Contact` DISABLE KEYS */;
INSERT INTO `Contact` VALUES (1,'Telephone','+7 (993) 773-00-11'),(2,'Telegram','/#'),(3,'Max','/#');
/*!40000 ALTER TABLE `Contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Degree_cleaning`
--

DROP TABLE IF EXISTS `Degree_cleaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Degree_cleaning` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Price` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Degree_cleaning`
--

LOCK TABLES `Degree_cleaning` WRITE;
/*!40000 ALTER TABLE `Degree_cleaning` DISABLE KEYS */;
INSERT INTO `Degree_cleaning` VALUES (1,'Low_price','1000'),(2,'Average_price','2500'),(3,'Hard_price','5000');
/*!40000 ALTER TABLE `Degree_cleaning` ENABLE KEYS */;
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
INSERT INTO `dopservicesoffices` VALUES (1,'Генеральная уборка офиса (с перемещением мебели)',300,'м²'),(2,'Очистка после ремонта',490,'м²'),(4,'Чистка жалюзи',490,'окно');
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
-- Table structure for table `General_parameters`
--

DROP TABLE IF EXISTS `General_parameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `General_parameters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Value` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `General_parameters`
--

LOCK TABLES `General_parameters` WRITE;
/*!40000 ALTER TABLE `General_parameters` DISABLE KEYS */;
INSERT INTO `General_parameters` VALUES (1,'InitialQuadrature',20),(2,'DistancePrice',25);
/*!40000 ALTER TABLE `General_parameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_cleaning`
--

DROP TABLE IF EXISTS `list_cleaning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_cleaning` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name_cleaning` varchar(45) DEFAULT NULL,
  `Name_Room` varchar(45) DEFAULT NULL,
  `Text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_cleaning`
--

LOCK TABLES `list_cleaning` WRITE;
/*!40000 ALTER TABLE `list_cleaning` DISABLE KEYS */;
INSERT INTO `list_cleaning` VALUES (2,'Basic','AllRoom','Очищаем зеркала и стеклянные поверхности'),(3,'Basic','AllRoom','Аккуратно складываем вещи'),(4,'Basic','AllRoom','Пылесосим и моем пол, плинтусы'),(5,'Basic','AllRoom','Проведем сухую чистку ковровых покрытий'),(6,'Basic','Food','Протираем пыль со всех доступных поверхностей'),(7,'Basic','Food','Очищаем зеркала и стеклянные поверхности'),(8,'Basic','Food','Аккуратно складываем вещи'),(9,'Basic','Food','Пылесосим и моем пол, плинтусы'),(10,'Basic','Food','Проведем сухую чистку ковровых покрытий'),(11,'Basic','WC','Протираем пыль со всех доступных поверхностей'),(12,'Basic','WC','Очищаем зеркала и стеклянные поверхности'),(13,'Basic','WC','Аккуратно складываем вещи'),(14,'Basic','WC','Пылесосим и моем пол, плинтусы'),(15,'Basic','WC','Проведем сухую чистку ковровых покрытий'),(16,'General','AllRoom','Обеспыливаем стены и потолки во всех комнатах'),(17,'General','AllRoom','Протираем пыль со всех поверхностей и предметов'),(18,'General','AllRoom','Очищаем зеркала и стеклянные поверхности'),(19,'General','AllRoom','Протираем торшеры и настенные бра'),(20,'General','AllRoom','Моем розетки и выключатели'),(21,'General','AllRoom','Моем шкафы и тумбы внутри при условии, что они пустые'),(22,'General','AllRoom','Моем шкафы сверху'),(23,'General','AllRoom','Моем дверные ручки'),(24,'General','AllRoom','Моем межкомнатные двери'),(25,'General','AllRoom','Моем радиаторы отопления'),(26,'General','AllRoom','Меняем постельное белье, заправляем кровать'),(27,'General','AllRoom','Отодвигаем мебель при мытье пола (которую возможно)'),(28,'General','AllRoom','Пылесосим и моем пол, тщательно чистим плинтусы'),(29,'General','AllRoom','Моем входную дверь'),(30,'General','AllRoom','Пылесосим мебель'),(31,'General','AllRoom','Аккуратно складываем вещи'),(32,'General','AllRoom','Развешиваем верхнюю одежду'),(33,'General','AllRoom','Расставляем обувь'),(34,'General','Food','Моем раковину'),(35,'General','Food','Моем снаружи плиту, холодильник и вытяжку'),(36,'General','Food','Моем столешницу'),(37,'General','Food','Моем духовку снаружи'),(38,'General','Food','Моем СВЧ снаружи'),(39,'General','Food','Моем вытяжку снаружи'),(40,'General','Food','Удаляем сложные жировые загрязнения'),(41,'General','Food','Полностью очищаем кухонный фартук'),(42,'General','Food','Протираем пыль со всех поверхностей и предметов'),(43,'General','Food','Протираем шкафы сверху'),(44,'General','Food','Протираем фасады шкафов'),(45,'General','Food','Чистим розетки и выключатели'),(46,'General','Food','Отодвигаем мебель при мытье пола'),(47,'General','Food','Пылесосим и моем пол, тщательно чистим плинтусы'),(48,'General','Food','Собираем и выносим мусор, меняем мешки'),(49,'General','Food','Моем и дезинфицируем мусорное ведро'),(50,'General','WC','Моем ванну, душевую кабину и раковину'),(51,'General','WC','Чистим краны и душевые лейки'),(52,'General','WC','Моем и дезинфицируем унитаз, биде'),(53,'General','WC','Чистим настенный кафель'),(54,'General','WC','Моем дверные ручки'),(55,'General','WC','Моем двери'),(56,'General','WC','Моем розетки и выключатели'),(57,'General','WC','Моем шкафы сверху'),(58,'General','WC','Моем шкафы внутри при условии, что они пустые'),(59,'General','WC','Протираем пыль со всех поверхностей и предметов'),(60,'General','WC','Очищаем зеркала и стеклянные поверхности'),(61,'General','WC','Пылесосим и моем пол, тщательно чистим плинтусы'),(62,'General','WC','Собираем мусор, меняем мешки'),(63,'Repair','AllRoom','Очищаем зеркала и стеклянные поверхности'),(64,'Repair','AllRoom','Пылесосим и моем пол, тщательно чистим плинтусы'),(65,'Repair','AllRoom','Снимаем защитную пленку и чехлы с мебели'),(66,'Repair','AllRoom','Очищаем мебель от строительной пыли'),(67,'Repair','AllRoom','Снимаем защитную пленку с окон'),(68,'Repair','AllRoom','Снимаем скотч'),(69,'Repair','AllRoom','Протираем пыль со всех поверхностей и предметов'),(70,'Repair','AllRoom','Чистим от строительной пыли стены, пол и потолок (кроме натяжного и потолка армстронг)'),(71,'Repair','AllRoom','Протираем торшеры и настенные бра'),(72,'Repair','AllRoom','Моем шкафы сверху'),(73,'Repair','AllRoom','Моем шкафы и тумбы внутри при условии, что они пустые'),(74,'Repair','AllRoom','Моем розетки и выключатели'),(75,'Repair','AllRoom','Моем дверные ручки'),(76,'Repair','AllRoom','Моем межкомнатные двери'),(77,'Repair','AllRoom','Моем радиаторы отопления'),(78,'Repair','AllRoom','Моем входную дверь'),(79,'Repair','AllRoom','Пылесосим мебель'),(80,'Repair','AllRoom','Меняем постельное белье, заправляем кровать'),(81,'Repair','AllRoom','Отодвигаем мебель при мытье пола'),(82,'Repair','AllRoom','Оттираем следы и капли краски, штукатурки, затирки, клея (не более 2 см диаметром)'),(83,'Repair','AllRoom','Собираем и выносим мусор, меняем мешки'),(84,'Repair','AllRoom','Аккуратно складываем вещи'),(85,'Repair','AllRoom','Развешиваем верхнюю одежду, расставляем обувь'),(86,'Repair','Food','Моем раковину'),(87,'Repair','Food','Моем снаружи плиту, холодильник и вытяжку'),(88,'Repair','Food','Моем СВЧ снаружи'),(89,'Repair','Food','Моем духовку снаружи'),(90,'Repair','Food','Моем вытяжку снаружи'),(91,'Repair','Food','Моем столешницу'),(92,'Repair','Food','Полностью очищаем кухонный фартук'),(93,'Repair','Food','Удаляем сложные жировые загрязнения'),(94,'Repair','Food','Протираем пыль со всех поверхностей и предметов'),(95,'Repair','Food','Протираем шкафы сверху'),(96,'Repair','Food','Протираем фасады шкафов'),(97,'Repair','Food','Моем все шкафы и ящики внутри при условии, что они пустые'),(98,'Repair','Food','Моем розетки и выключатели'),(99,'Repair','Food','Отодвигаем мебель при мытье пола'),(100,'Repair','Food','Пылесосим и моем пол, тщательно чистим плинтусы'),(101,'Repair','Food','Собираем мусор, меняем мешки'),(102,'Repair','Food','Моем и дезинфицируем мусорное ведро'),(103,'Repair','WC','Моем ванну, душевую кабину и раковину'),(104,'Repair','WC','Чистим краны и душевые лейки'),(105,'Repair','WC','Моем и дезинфицируем унитаз, биде'),(106,'Repair','WC','Чистим настенный кафель'),(107,'Repair','WC','Моем дверные ручки'),(108,'Repair','WC','Моем двери'),(109,'Repair','WC','Моем розетки и выключатели'),(110,'Repair','WC','Моем шкафы сверху'),(111,'Repair','WC','Моем шкафы внутри при условии, что они пустые'),(112,'Repair','WC','Протираем пыль со всех поверхностей и предметов'),(113,'Repair','WC','Очищаем зеркала и стеклянные поверхности'),(114,'Repair','WC','Пылесосим и моем пол, тщательно чистим плинтусы'),(115,'Repair','WC','Собираем мусор, меняем мешки'),(116,'Office',NULL,'Удаление пыли со стен, потолка, лепнины и молдингов'),(117,'Office',NULL,'Мойка дверей, наличников, стеклянных и зеркальных вставок'),(118,'Office',NULL,'Полная обработка офисной мебели (включая антисептик)'),(119,'Office',NULL,'Протирка оргтехники и экранов спец. салфетками'),(120,'Office',NULL,'Удаление налёта, отпечатков, грязи с поверхностей'),(121,'Office',NULL,'Протирка вентиляционных решёток, жалюзи'),(122,'Office',NULL,'Чистка мягкой мебели (внешняя + пылесос)'),(123,'Office',NULL,'Уход за полами с учётом типа покрытия (ламинат/паркет/кафель/ковролин)'),(124,'Office',NULL,'Ароматизация пространства'),(125,'Office',NULL,'Влажная уборка всей площади'),(126,'Office',NULL,'мена пакетов, вынос мусора'),(127,'Office',NULL,'Наведение порядка на столах (по согласованию)'),(128,'Office',NULL,'Чистка стеклянных перегородок, витрин'),(129,'Windows',NULL,'Мойка окон с двух сторон (включая рамы и фурнитуру)'),(130,'Windows',NULL,'Чистка стеклопакета по технологии “антиразвод”'),(131,'Windows',NULL,'Протирка стеклянных перегородок, витрин'),(132,'Windows',NULL,'Очищение откосов, подоконников, москитных сеток'),(133,'Windows',NULL,'Обработка антистатиком (по желанию)'),(135,'Basic','AllRoom','Протираем пыль со всех доступных поверхностей');
/*!40000 ALTER TABLE `list_cleaning` ENABLE KEYS */;
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
INSERT INTO `price` VALUES (2,'CleaningOffice',NULL,5000),(3,'OfficeQuadrature',270,NULL),(4,'CleaningWindows',NULL,3990),(5,'Door',490,NULL),(6,'Basic',170,3500),(7,'General',250,5000),(8,'Repair',270,5000),(9,'CleaningApartment',NULL,3500);
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `QuantityStar` int DEFAULT NULL,
  `Text` varchar(300) DEFAULT NULL,
  `Link` varchar(100) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `LinkName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Управляющея компания',5,'Вызвала ребя убрать заводские пленки с окон на лоджии (стояли на солнце несколько лет). Приехали в заначенное время, были максимально вежливы, работали вместо 1 часа - 6 часов, так как пленки тяжело убирались. Работой давольна на все 100%    ','#','2025-09-15','Яндекс отзывы'),(2,'Людмила',5,'Цена соответствует рыночной, Стоймость была сказана еще в стадии обсуждения. качество работы очень хорошо. Приехали в то время что договорились, без опозданий. Работают быстро. буду еще обращаться','#','2025-09-06','Яндекс отзывы'),(3,'Константин',4,'Все понравилось, отличные специалисты, спасибо за качественную уборку','#','2025-11-10','Авито отзывы'),(4,'Екатерина',3,'Ну все неплохо но могло быть и лучше, спасибо за уборку ','# ','2025-12-01','Авито отзывы');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-22 21:59:49
