-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2025 at 03:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cms_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(100) DEFAULT NULL,
  `reset_code` varchar(100) DEFAULT NULL,
  `code_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `created_at`, `role`, `reset_code`, `code_expiry`) VALUES
(8, 'Lynn', 'lynnzylameczdo@gmail.com', '$2y$10$DI4OaNNnAetr2lw/PPGZ8.8QDcIb6xeYSNaO6BfCJ2jdBs642eIae', '2025-10-17 21:31:06', NULL, '514594', '2025-10-25 10:41:31'),
(11, 'Lynn Czyla Alpuerto', 'alpuerto_lynnczyla@plpasig.edu.ph', '$2y$10$rKij1uYdqQp2heCev49fluN2UF1d.WPDAKTU/lMPVner3OZAua/pm', '2025-10-18 03:32:20', NULL, NULL, NULL),
(12, 'James', 'flavierlaurence01@gmail.com', '$2y$10$cneYX5gDEIYKsYU9P/XME.8aRXDAZe.FCTGqPkd8OdNZovvPxdiNS', '2025-10-18 03:40:35', NULL, NULL, NULL),
(15, 'Jerimiah Bitancor', 'bitancor_jerimiah@plpasig.edu.ph', '$2y$10$xHouGMXLgcp9d3Ja6YtT1uCzRjoKU2zyXOFUw/hlVuP1Xr67SLjiS', '2025-10-18 03:43:04', NULL, NULL, NULL),
(16, 'Jerimiah Bitancor', 'jerimiahbitancor27@gmail.com', '$2y$10$3gHPraY/JFb2ACg4lWbMGOPUMP.u8gvoG.hQ/EKmmJYyBKnX9F9ua', '2025-10-18 04:19:37', NULL, NULL, NULL),
(23, 'BIANCA RAIN CAGURUNGAN CASTILLON', 'bianca.cagurungan03@gmail.com', '$2y$10$TS7mUoct68ZVm3EfTw2tVuOAuwU6RFfeC1PAgQVQBXDKyfUIAFLru', '2025-10-25 00:24:30', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;