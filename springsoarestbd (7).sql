-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2024 at 01:41 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `springsoarestbd`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `id` bigint(20) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `libelle` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`id`, `code`, `libelle`) VALUES
(1, 'ELECT', 'Electronics'),
(2, 'CLOTH', 'Clothing'),
(3, 'HOME', 'Home and Garden'),
(4, 'ahla', '7med prod');

-- --------------------------------------------------------

--
-- Table structure for table `categorie_seq`
--

CREATE TABLE `categorie_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorie_seq`
--

INSERT INTO `categorie_seq` (`next_val`) VALUES
(151);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` bigint(20) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `adresse`, `nom`, `numero`, `prenom`) VALUES
(1, '123 Main St', 'John', '123456789', 'Doe'),
(2, '456 Oak St', 'Jane', '987654321', 'Smith');

-- --------------------------------------------------------

--
-- Table structure for table `client_seq`
--

CREATE TABLE `client_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_seq`
--

INSERT INTO `client_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `favorie`
--

CREATE TABLE `favorie` (
  `id` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `produit_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorie`
--

INSERT INTO `favorie` (`id`, `date`, `client_id`, `produit_id`) VALUES
(1, '2023-12-01', 1, 1),
(2, '2023-10-02', 1, 2),
(3, '2023-11-03', 2, 3),
(4, '2023-12-04', 2, 1),
(5, '2022-12-05', 1, 5),
(6, '2022-12-06', 2, 1),
(7, '2022-04-01', 2, 5),
(8, '2022-04-02', 1, 1),
(9, '2022-04-03', 2, 2),
(10, '2022-05-01', 1, 3),
(11, '2022-05-02', 2, 4),
(12, '2022-05-03', 1, 5),
(13, '2022-06-01', 2, 1),
(14, '2022-06-02', 1, 2),
(15, '2022-06-03', 2, 3),
(16, '2022-07-01', 1, 4),
(17, '2022-07-02', 2, 5),
(18, '2022-07-03', 1, 1),
(19, '2022-08-01', 2, 2),
(20, '2022-08-02', 1, 3),
(21, '2022-08-03', 2, 4),
(22, '2022-09-01', 1, 5),
(23, '2022-09-02', 2, 1),
(24, '2022-09-03', 1, 2),
(25, '2022-10-01', 2, 3),
(26, '2022-10-02', 1, 4),
(27, '2022-10-03', 2, 5),
(28, '2022-11-01', 1, 1),
(29, '2022-11-02', 2, 2),
(30, '2022-11-03', 1, 3),
(31, '2022-12-01', 2, 4),
(32, '2022-12-02', 1, 5),
(33, '2022-12-03', 2, 1),
(34, '2023-12-01', 1, 21),
(35, '2023-10-02', 1, 22),
(36, '2023-11-03', 2, 23),
(37, '2023-12-04', 2, 24),
(38, '2022-12-05', 1, 25),
(39, '2022-12-06', 2, 26),
(40, '2022-04-01', 2, 27),
(41, '2022-04-02', 1, 28),
(42, '2022-04-03', 2, 29),
(43, '2022-05-01', 1, 30),
(44, '2022-05-02', 2, 21),
(45, '2022-05-03', 1, 22),
(46, '2022-06-01', 2, 23),
(47, '2022-06-02', 1, 24),
(48, '2022-06-03', 2, 25),
(49, '2022-07-01', 1, 26),
(50, '2022-07-02', 2, 27),
(51, '2022-07-03', 1, 28),
(52, '2022-08-01', 2, 29),
(53, '2022-08-02', 1, 30),
(54, '2022-08-03', 2, 21),
(55, '2022-09-01', 1, 22),
(56, '2022-09-02', 2, 23),
(57, '2022-09-03', 1, 24),
(58, '2022-10-01', 2, 25),
(59, '2022-10-02', 1, 26),
(60, '2022-10-03', 2, 27),
(61, '2022-11-01', 1, 28),
(62, '2022-11-02', 2, 29),
(63, '2022-11-03', 1, 30);

-- --------------------------------------------------------

--
-- Table structure for table `produit`
--

CREATE TABLE `produit` (
  `date_achat` date DEFAULT NULL,
  `prix` double NOT NULL,
  `quantite` int(11) NOT NULL,
  `categorie_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produit`
--

INSERT INTO `produit` (`date_achat`, `prix`, `quantite`, `categorie_id`, `id`, `code`, `designation`, `image_path`) VALUES
('2023-12-16', 12, 0, 1, 1, 'ELECT', 'hoddie', NULL),
('2023-12-17', 3, 0, 2, 2, 'CLOTH', 'iphone 14', NULL),
('2020-12-09', 1250, 30, 3, 3, 'P008', 'asus tuf gaming a15', NULL),
('2023-12-15', 12, 20, 1, 4, 'P005', 'dell g300', NULL),
('2023-12-05', 90, 15, 2, 5, 'P005', 'Jeans', NULL),
('2023-11-28', 65, 0, 1, 6, 'P006', 'Headphones', NULL),
('2023-11-29', 85, 10, 2, 7, 'P007', 'Dress', NULL),
('2023-11-30', 110, 6, 3, 8, 'P008', 'Kitchen Appliances', NULL),
('2023-11-27', 95, 8, 1, 9, 'P009', 'Tablet', NULL),
('2023-11-26', 80, 14, 2, 10, 'P010', 'Sweater', NULL),
('2022-12-16', 50, 10, 1, 11, 'ELECT', 'Smartwatch', NULL),
('2022-12-17', 1200, 15, 2, 12, 'CLOTH', 'Samsung Galaxy S22', NULL),
('2019-12-09', 1500, 25, 3, 13, 'P011', 'Sony 4K TV', NULL),
('2022-12-15', 30, 40, 1, 14, 'P012', 'Bluetooth Speaker', NULL),
('2023-01-05', 75, 20, 2, 15, 'P013', 'Leather Jacket', NULL),
('2021-11-28', 100, 5, 1, 16, 'P014', 'Wireless Earbuds', NULL),
('2023-11-29', 120, 8, 2, 17, 'P015', 'Party Dress', NULL),
('2020-11-30', 80, 12, 3, 18, 'P016', 'Coffee Maker', NULL),
('2023-11-27', 300, 4, 1, 19, 'P017', 'Laptop', NULL),
('2021-11-26', 50, 10, 2, 20, 'P018', 'Winter Hat', NULL),
('2022-12-16', 50, 10, 1, 21, 'ELECT', 'Smartwatch', NULL),
('2022-12-17', 1200, 15, 2, 22, 'CLOTH', 'Samsung Galaxy S22', NULL),
('2019-12-09', 1500, 25, 3, 23, 'P011', 'Sony 4K TV', NULL),
('2022-12-15', 30, 40, 1, 24, 'P012', 'Bluetooth Speaker', NULL),
('2023-01-05', 75, 20, 2, 25, 'P013', 'Leather Jacket', NULL),
('2021-11-28', 100, 5, 1, 26, 'P014', 'Wireless Earbuds', NULL),
('2023-11-29', 120, 8, 2, 27, 'P015', 'Party Dress', NULL),
('2020-11-30', 80, 12, 3, 28, 'P016', 'Coffee Maker', NULL),
('2023-11-27', 300, 4, 1, 29, 'P017', 'Laptop', NULL),
('2021-11-26', 50, 10, 2, 30, 'P018', 'Winter Hat', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `produit_seq`
--

CREATE TABLE `produit_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produit_seq`
--

INSERT INTO `produit_seq` (`next_val`) VALUES
(51);

-- --------------------------------------------------------

--
-- Table structure for table `vente`
--

CREATE TABLE `vente` (
  `quantite` int(11) NOT NULL,
  `date_vente` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `produit_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vente`
--

INSERT INTO `vente` (`quantite`, `date_vente`, `id`, `produit_id`) VALUES
(4, '2023-12-08 00:00:00.000000', 5, 5),
(6, '2022-11-30 00:00:00.000000', 6, 6),
(10, '2022-12-01 00:00:00.000000', 7, 7),
(3, '2022-12-03 00:00:00.000000', 8, 8),
(7, '2022-12-05 00:00:00.000000', 9, 9),
(4, '2022-12-07 00:00:00.000000', 10, 10),
(8, '2018-03-10 00:00:00.000000', 13, 5),
(6, '2018-04-15 00:00:00.000000', 14, 5),
(8, '2020-03-10 00:00:00.000000', 17, 5),
(6, '2020-04-15 00:00:00.000000', 18, 5),
(5, '2019-01-10 12:30:00.000000', 38, 5),
(8, '2019-02-15 14:45:00.000000', 39, 6),
(12, '2019-03-01 10:00:00.000000', 40, 7),
(4, '2020-01-10 09:30:00.000000', 41, 8),
(7, '2020-02-15 16:20:00.000000', 42, 9),
(5, '2020-03-10 11:15:00.000000', 43, 10),
(5, '2019-01-10 12:30:00.000000', 47, 5),
(8, '2019-02-15 14:45:00.000000', 48, 6),
(12, '2019-03-01 10:00:00.000000', 49, 7),
(4, '2020-01-10 09:30:00.000000', 50, 8),
(7, '2020-02-15 16:20:00.000000', 51, 9),
(5, '2020-03-10 11:15:00.000000', 52, 10),
(5, '2023-12-08 00:00:00.000000', 56, 21),
(8, '2022-11-30 00:00:00.000000', 57, 22),
(12, '2022-12-01 00:00:00.000000', 58, 23),
(3, '2022-12-03 00:00:00.000000', 59, 24),
(7, '2022-12-05 00:00:00.000000', 60, 25),
(4, '2022-12-07 00:00:00.000000', 61, 26),
(8, '2018-03-10 00:00:00.000000', 62, 21),
(6, '2018-04-15 00:00:00.000000', 63, 21),
(8, '2020-03-10 00:00:00.000000', 64, 21),
(6, '2020-04-15 00:00:00.000000', 65, 21),
(5, '2019-01-10 12:30:00.000000', 66, 21),
(8, '2019-02-15 14:45:00.000000', 67, 22),
(12, '2019-03-01 10:00:00.000000', 68, 23),
(4, '2020-01-10 09:30:00.000000', 69, 24),
(7, '2020-02-15 16:20:00.000000', 70, 25),
(5, '2020-03-10 11:15:00.000000', 71, 26),
(5, '2019-01-10 12:30:00.000000', 72, 21),
(8, '2019-02-15 14:45:00.000000', 73, 22),
(12, '2019-03-01 10:00:00.000000', 74, 23),
(4, '2020-01-10 09:30:00.000000', 75, 24),
(7, '2020-02-15 16:20:00.000000', 76, 25),
(5, '2020-03-10 11:15:00.000000', 77, 26),
(5, '2024-01-10 14:30:00.000000', 78, 20),
(8, '2024-02-15 18:45:00.000000', 79, 25),
(6, '2024-03-10 13:00:00.000000', 80, 21);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorie`
--
ALTER TABLE `favorie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKf54356bc7laxh5g0kdyjssqlw` (`client_id`),
  ADD KEY `FK84xpb5rter47mitpjfkp0nrwn` (`produit_id`);

--
-- Indexes for table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK52xhp55kbbl6u4rbluxm3g9hw` (`categorie_id`);

--
-- Indexes for table `vente`
--
ALTER TABLE `vente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK20qc4m0gxnmbxoarbjr4x0514` (`produit_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorie`
--
ALTER TABLE `favorie`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `produit`
--
ALTER TABLE `produit`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `vente`
--
ALTER TABLE `vente`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorie`
--
ALTER TABLE `favorie`
  ADD CONSTRAINT `FK84xpb5rter47mitpjfkp0nrwn` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`),
  ADD CONSTRAINT `FKf54356bc7laxh5g0kdyjssqlw` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`);

--
-- Constraints for table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `FK52xhp55kbbl6u4rbluxm3g9hw` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`);

--
-- Constraints for table `vente`
--
ALTER TABLE `vente`
  ADD CONSTRAINT `FK20qc4m0gxnmbxoarbjr4x0514` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
