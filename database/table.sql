CREATE DATABASE /*!32312 IF NOT EXISTS*/`pizzahut` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `pizzahut`;

/*Table structure for table `ingredients` */

DROP TABLE IF EXISTS `ingredients`;

CREATE TABLE `ingredients` (
  `ingredientId` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `pizzaId` int(30) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`ingredientId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `order_items` */

DROP TABLE IF EXISTS `order_items`;

CREATE TABLE `order_items` (
  `orderItemId` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `orderId` int(50) NOT NULL,
  `pizzaId` int(50) NOT NULL,
  `quantity` int(50) NOT NULL,
  PRIMARY KEY (`orderItemId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `orderId` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `orderedBy` varchar(250) DEFAULT NULL,
  `orderedDateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `pizzas` */

DROP TABLE IF EXISTS `pizzas`;

CREATE TABLE `pizzas` (
  `pizzaId` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  PRIMARY KEY (`pizzaId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

