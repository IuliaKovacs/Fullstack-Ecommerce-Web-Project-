-- -----------------------------------------------------
-- Schema full-stack-ecommerce
-- -----------------------------------------------------

USE `full-stack-ecommerce`;

--
-- Prep work
--
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS=1;

--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email_address` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

