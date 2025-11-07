-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2025 at 07:33 PM
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
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'draft',
  `scheduled_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `author` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `short_title`, `full_title`, `topic_tags`, `description`, `image`, `status`, `scheduled_at`, `created_at`, `updated_at`, `author`) VALUES
('2bc0948c-b990-11f0-b748-c018509200f9', 'jfjhwbjfe', 'jbwjbw', 'jbjhbe', '<p>jfbjebfjwefjhfe</p>', '1762268913014-777763467.webp', 'published', NULL, '2025-11-04 23:08:33', '2025-11-04 23:08:33', 12),
('5649a7dc-b997-11f0-b748-c018509200f9', 'jfjhweb', 'jbwejfeb', 'jbjeh', '<p>bfhebfewf</p>', '1762271990847-429750890.webp', 'published', NULL, '2025-11-04 23:59:50', '2025-11-04 23:59:50', 12),
('a7bd5fcb-b98f-11f0-b748-c018509200f9', 'jndje', 'jhbfjqehbf', 'jbfjbef', '<p>jfjhefwe</p>', '1762268691532-524275736.webp', 'published', NULL, '2025-11-04 23:04:51', '2025-11-04 23:04:51', 1),
('d361c0ac-b99e-11f0-b748-c018509200f9', 'dbqjhbdj', 'jhbejfbj', 'jbjhbw', '<p>jfbejhwef</p>', '1762275207204-65518573.webp', 'published', NULL, '2025-11-05 00:53:27', '2025-11-05 00:53:27', 12),
('f7c6d85e-b98e-11f0-b748-c018509200f9', 'jndjedj', 'bfjwe', 'jbfjhwe', '<p>enfjnefef</p>', '1762268396313-221346.webp', 'published', NULL, '2025-11-04 22:59:56', '2025-11-04 22:59:56', 1);

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
  `status` enum('draft','posted','trash') NOT NULL DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image` varchar(255) DEFAULT NULL,
  `author` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events_careers`
--

INSERT INTO `events_careers` (`id`, `post_type`, `short_title`, `full_title`, `tags`, `description`, `status`, `created_at`, `updated_at`, `image`, `author`) VALUES
(1, 'event', 'jehfbjwh', 'jbfjhwe', 'jbfjhwe', '<p>fbwjefhbjwhfebjhwfe</p>', 'posted', '2025-11-03 17:57:43', '2025-11-03 17:57:43', NULL, NULL),
(2, 'career', 'kjndjqwn', 'jejfjbe', 'jwbfjwhbe', '<p>fjbejhbffe</p>', 'draft', '2025-11-03 17:58:08', '2025-11-03 17:58:08', NULL, NULL),
(3, 'event', 'jnjnjewf', 'hfbjwfe', 'jbfwje', '<p>fjwehjef</p>', 'posted', '2025-11-03 18:04:30', '2025-11-03 18:04:30', NULL, NULL),
(4, 'career', 'kemekemeke e', 'kemekemekeka', 'kemekeekeme', '<p>jdenjwdhjeb</p>', 'posted', '2025-11-04 14:47:35', '2025-11-04 14:47:35', '1762267655492.gif', NULL),
(5, 'event', 'jebfjhbe', 'kjwwjbfq', 'kjbjbdqw', '<p>jbfjhwef</p>', 'posted', '2025-11-04 15:23:12', '2025-11-04 15:23:12', '1762269792847.webp', 12);

-- --------------------------------------------------------

--
-- Table structure for table `health_tips`
--

CREATE TABLE `health_tips` (
  `id` int(11) NOT NULL,
  `short_title` varchar(255) NOT NULL,
  `full_title` varchar(255) NOT NULL,
  `topic_tags` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `status` enum('draft','published','trash') DEFAULT 'draft',
  `author` varchar(100) DEFAULT 'admin',
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `health_tips`
--

INSERT INTO `health_tips` (`id`, `short_title`, `full_title`, `topic_tags`, `description`, `status`, `author`, `image`, `created_at`) VALUES
(1, 'knjjkddsnfj', 'jbjfjewjfhb', 'fefefweff', '<p>wkjfebjhef</p>', 'published', '12', '1762273362290-416039652.png', '2025-11-04 16:22:42'),
(2, 'fnwef', 'kjwebjhwe', 'jbjfjwfhb', '<p>nrjjr4h44t</p>', 'draft', '12', '1762273385851-834789004.png', '2025-11-04 16:23:05'),
(3, 'fbjfb', 'jhbfjeb', 'jbefjbwe', '<p>jbfjhwfe</p>', 'published', '12', '1762273586258-482025715.webp', '2025-11-04 16:26:26'),
(4, 'fejwe', 'nefjhb', 'kbjhbef', '<p>fkjnwejf</p>', 'draft', '12', NULL, '2025-11-04 16:26:39'),
(5, 'bjehfjhqe', 'kjbjbfej', 'kjbjhbfe', '<p>jwfjhbef</p>', 'trash', '12', '1762275325006-808796661.jpg', '2025-11-04 16:55:25');

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
  `image` varchar(255) DEFAULT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `author` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `short_title`, `full_title`, `topic_tags`, `description`, `status`, `image`, `scheduled_at`, `created_at`, `updated_at`, `author`) VALUES
('1bbf2721-b99b-11f0-b748-c018509200f9', 'mn fwbje ', 'jjebfj', 'jbjhebf', '<p>jfbjhbfwe</p>', 'draft', NULL, NULL, '2025-11-05 00:26:50', '2025-11-05 00:26:50', 12),
('1f254804-b996-11f0-b748-c018509200f9', 'hjbjheb', 'jbfjbjweb', 'jbefjbwe', '<p>jbfjwhfebwef</p>', 'posted', '00de2686-c72b-4515-bb46-1b1d1bd3adef.webp', NULL, '2025-11-04 23:51:08', '2025-11-04 23:51:08', 12),
('3457a777-b996-11f0-b748-c018509200f9', 'dvfhwvefh', 'kbfjebj', 'jbfjwbe', '<p>bdjhjbdqw</p>', 'draft', NULL, NULL, '2025-11-04 23:51:44', '2025-11-04 23:51:44', 12),
('5e3c2a48-b997-11f0-b748-c018509200f9', 'jbfjwbfj', 'jhbfjbej', 'jhhbjefhb', '<p>wbdhwbdjwd</p>', 'posted', NULL, NULL, '2025-11-05 00:00:04', '2025-11-05 00:00:04', 12),
('60822222-b995-11f0-b748-c018509200f9', 'bfjhewfj', 'jhbfejwe', 'jbfjhwe', '<p>jfbjwvef</p>', 'posted', '03be2231-bd50-4c12-96d6-19a245f3904f.webp', NULL, '2025-11-04 23:45:49', '2025-11-04 23:45:49', 12),
('99ef8bc9-b9ae-11f0-b748-c018509200f9', 'wnmqdbqjw', 'jhbjfb', 'jhbjf', '<p>fejwejhbwfe</p>', 'posted', NULL, NULL, '2025-11-05 02:46:22', '2025-11-05 02:46:22', 12),
('a07b21c5-b996-11f0-b748-c018509200f9', 'mbfjwhebf', 'kjjfbwjeb', 'kjbjbfe', '<p>jbfjhwef</p>', 'posted', 'd1fb21d9-8525-4cf7-8ac6-8ef1dee824ef.gif', NULL, '2025-11-04 23:54:45', '2025-11-04 23:54:45', 12),
('b332d70a-b995-11f0-b748-c018509200f9', 'bfjhewfj', 'jhbfejwe', 'jbfjhwe', '<p>jfbjwvef</p>', 'posted', 'd28dffe7-3b06-4adc-bbc1-7ba3aa1e3e49.webp', NULL, '2025-11-04 23:48:07', '2025-11-04 23:48:07', 12),
('c38afae1-b996-11f0-b748-c018509200f9', 'kjfbjhebj', 'kjbjefbwefb', 'kjbqbf', '<p>jfbjwfeb</p>', 'posted', 'c9853452-a0db-45d1-97e3-60b4240ecd74.webp', NULL, '2025-11-04 23:55:44', '2025-11-04 23:55:44', 12),
('dae6dc1f-b99e-11f0-b748-c018509200f9', 'fmwbejb', 'kjnjwfe', 'jbfjhbe', '<p>fbwjehbfwe</p>', 'trash', NULL, NULL, '2025-11-05 00:53:39', '2025-11-05 01:44:23', 12),
('e0b4921a-b996-11f0-b748-c018509200f9', 'd qjbdjw', 'kjbjbfej', 'jbjfehw', '<p><br></p>', 'posted', NULL, NULL, '2025-11-04 23:56:33', '2025-11-04 23:56:33', 12),
('eb30e588-b996-11f0-b748-c018509200f9', 'ebfjbwe', 'kbjfehb', 'jbfjhwe', '<p>jbfjhew</p>', 'draft', NULL, NULL, '2025-11-04 23:56:51', '2025-11-04 23:56:51', 12);

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
  `last_login` datetime DEFAULT NULL,
  `reset_code` varchar(100) DEFAULT NULL,
  `code_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `created_at`, `role`, `last_login`, `reset_code`, `code_expiry`) VALUES
(8, 'Lynn', 'lynnzylameczdo@gmail.com', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-17 21:31:06', 'hr_administrator', '2025-11-08 02:03:38', '514594', '2025-10-25 10:41:31'),
(11, 'Lynn Czyla Alpuerto', 'alpuerto_lynnczyla@plpasig.edu.ph', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-18 03:32:20', 'content_administrator', NULL, NULL, NULL),
(12, 'James', 'flavierlaurence01@gmail.com', '$2b$10$ADe2OQ01nBT9Udz1/wJZaOc2XXdJ.OyPChMfN/PSD8x3Z2wzHkyOq', '2025-10-18 03:40:35', 'super_administrator', '2025-11-08 02:04:09', NULL, NULL);

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
-- Indexes for table `health_tips`
--
ALTER TABLE `health_tips`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `health_tips`
--
ALTER TABLE `health_tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
