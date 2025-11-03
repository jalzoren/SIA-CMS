-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2025 at 07:20 PM
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
-- Database: `cms`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `short_title` text DEFAULT NULL,
  `full_title` text DEFAULT NULL,
  `topic_tags` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'draft',
  `scheduled_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `author` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events_careers`
--

CREATE TABLE `events_careers` (
  `id` int(11) NOT NULL,
  `post_type` enum('event','career') NOT NULL DEFAULT 'event',
  `short_title` varchar(255) NOT NULL,
  `full_title` varchar(500) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('draft','posted') NOT NULL DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events_careers`
--

INSERT INTO `events_careers` (`id`, `post_type`, `short_title`, `full_title`, `tags`, `description`, `status`, `created_at`, `updated_at`, `image`) VALUES
(1, 'event', 'jehfbjwh', 'jbfjhwe', 'jbfjhwe', '<p>fbwjefhbjwhfebjhwfe</p>', 'posted', '2025-11-03 17:57:43', '2025-11-03 17:57:43', NULL),
(2, 'career', 'kjndjqwn', 'jejfjbe', 'jwbfjwhbe', '<p>fjbejhbffe</p>', 'draft', '2025-11-03 17:58:08', '2025-11-03 17:58:08', NULL),
(3, 'event', 'jnjnjewf', 'hfbjwfe', 'jbfwje', '<p>fjwehjef</p>', 'posted', '2025-11-03 18:04:30', '2025-11-03 18:04:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `short_title` text DEFAULT NULL,
  `full_title` text DEFAULT NULL,
  `topic_tags` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'draft',
  `scheduled_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `author` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(8, 'Lynn', 'lynnzylameczdo@gmail.com', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-17 21:31:06', 'hr_administrator', '514594', '2025-10-25 10:41:31'),
(11, 'Lynn Czyla Alpuerto', 'alpuerto_lynnczyla@plpasig.edu.ph', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-18 03:32:20', 'content_administrator', NULL, NULL),
(12, 'James', 'flavierlaurence01@gmail.com', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-18 03:40:35', 'super_administrator', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events_careers`
--
ALTER TABLE `events_careers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `events_careers`
--
ALTER TABLE `events_careers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
