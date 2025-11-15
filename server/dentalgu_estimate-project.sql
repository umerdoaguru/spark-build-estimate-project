-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 15, 2025 at 03:37 PM
-- Server version: 10.6.19-MariaDB-cll-lve
-- PHP Version: 8.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dentalgu_estimate-project`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `icon`, `created_at`) VALUES
(25, 'STRUCTURE', 'https://estimate-project.dentalguru.software/uploads/icon-1762326495821structurelogo.png', '2025-10-10 10:00:00'),
(26, 'DOOR FRAMES', 'https://estimate-project.dentalguru.software/uploads/icon-1762326392420DOOR FRAMES.webp', '2025-10-10 10:00:08'),
(27, 'WINDOWS AND VENTILATORS', 'https://estimate-project.dentalguru.software/uploads/icon-1762326400407WINDOWS AND VENTILATORS.webp', '2025-10-10 10:00:42'),
(28, 'FLOOR TILES AND WALL TILES', 'https://estimate-project.dentalguru.software/uploads/icon-1762326408206FLOOR TILES AND WALL TILES.jpg', '2025-10-10 10:01:13'),
(29, 'STONE WORK', 'https://estimate-project.dentalguru.software/uploads/icon-1762326418441STONE WORK.webp', '2025-10-10 10:01:32'),
(30, 'FALL CEILING', 'https://estimate-project.dentalguru.software/uploads/icon-1762326428592FALL CEILING.png', '2025-10-10 10:01:42'),
(31, 'PUTTY,PAINT AND POLISH', 'https://estimate-project.dentalguru.software/uploads/icon-1762326437622PUTTY,PAINT AND POLISH.webp', '2025-10-10 10:01:52'),
(32, 'DOOR KITS AND HARDWARE', 'https://estimate-project.dentalguru.software/uploads/icon-1762326446436DOOR KITS AND HARDWARE.webp', '2025-10-10 10:29:14'),
(34, 'DOORS', 'https://estimate-project.dentalguru.software/uploads/icon-1762326474509DOORS.jpg', '2025-10-10 10:31:09'),
(36, 'Test', 'https://estimate-project.dentalguru.software/uploads/icon-1762408982140test.png', '2025-11-06 06:03:02'),
(37, 'Dummy', 'https://estimate-project.dentalguru.software/uploads/icon-1762936674835dummy.png', '2025-11-12 08:37:54'),
(38, 'Engineering ', 'https://estimate-project.dentalguru.software/uploads/icon-1763019130136Apple 250.png', '2025-11-13 07:32:10'),
(39, 'The OpenAI API provides a simple interface to state-of-the-art AI models for text generation, natura', 'https://estimate-project.dentalguru.software/uploads/icon-1763019213625Apple 250.png', '2025-11-13 07:33:33');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL DEFAULT 'pending',
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `name`, `question`, `answer`, `created_date`) VALUES
(2, 10, 'you', 'PLEASE SHARE THE RATE OF 500SQ', 'WORKINGH', '2025-11-13 09:00:31'),
(3, 10, 'you', 'USER TEST', 'pending', '2025-11-13 09:01:16'),
(4, 9, 'umer ', 'i want to say', 'yes', '2025-11-13 13:21:23');

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `id` int(255) NOT NULL,
  `value` int(255) NOT NULL,
  `conditions` varchar(255) NOT NULL,
  `offer` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`id`, `value`, `conditions`, `offer`, `created_date`) VALUES
(2, 15000, '10000 Add on Budget', 'AC Free', '2025-01-28 11:11:37'),
(3, 1600000, '50000 Add on Budget', 'Service Free', '2025-01-28 07:50:44'),
(6, 10000, 'Above price 10000 AC free', 'Diwali Offer', '2025-10-08 08:20:08'),
(7, 11000, 'Above price 11000 AC free', 'Diwali Offer', '2025-11-03 07:28:21');

-- --------------------------------------------------------

--
-- Table structure for table `headline`
--

CREATE TABLE `headline` (
  `id` int(255) NOT NULL,
  `hl_text` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `headline`
--

INSERT INTO `headline` (`id`, `hl_text`, `created_date`) VALUES
(1, 'Welcome to Spark Build Estimate Project Estimate Your Dream Construction Budget..', '2025-11-11 11:48:19'),
(3, 'hiiii', '2025-11-10 11:05:04');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `subcategory_name` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `qty` int(255) NOT NULL DEFAULT 0,
  `amount_for_1000_sqft` int(255) NOT NULL DEFAULT 0,
  `unit_price` decimal(10,2) NOT NULL,
  `image_items` varchar(255) NOT NULL,
  `unit_price_type` varchar(255) NOT NULL,
  `rate_per_sqft` int(255) NOT NULL DEFAULT 0,
  `recommendation_description` varchar(255) NOT NULL,
  `sq_fit_range` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `subcategory_id`, `subcategory_name`, `item_name`, `description`, `qty`, `amount_for_1000_sqft`, `unit_price`, `image_items`, `unit_price_type`, `rate_per_sqft`, `recommendation_description`, `sq_fit_range`, `created_at`) VALUES
(36, 70, 'CEMENT', 'ULTRATECH', 'High-strength cement', 400, 134000, 335.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760160988892ultratech.webp', 'per bag', 134, 'Best cement  for foundations', '800-1500', '2025-10-11 05:36:28'),
(37, 70, 'CEMENT', 'PERFECT PLUS', 'Hign-quality cement', 400, 140000, 350.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760161315140perfect-plus-cement.jpg', 'per bag', 140, 'Best for foundations', '200-1500', '2025-10-11 05:41:55'),
(38, 70, 'CEMENT', 'ACC', 'High-strength cement', 400, 134000, 335.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760163752486ACC Cement.png', 'per bag', 134, 'Best for foundations', '200-1500', '2025-10-11 06:22:32'),
(39, 70, 'CEMENT', 'JK SUPER', 'Medium-quality cement', 400, 134000, 335.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760163985064jk-super-cement.jpg', 'per bag', 134, 'Best for foundations', '200-1500', '2025-10-11 06:26:25'),
(40, 70, 'CEMENT', 'MYCEM', 'Medium-quality cement', 400, 134000, 335.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760164046043mycem-cement.jpg', 'per bag', 134, 'Best for foundations', '1200-1500', '2025-10-11 06:27:26'),
(41, 70, 'CEMENT', 'DOUBLE BULL', 'High-strength cement', 400, 134000, 335.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760164578272DOUBLE BULL.png', 'per bag', 134, 'Best for foundations', '200-1500', '2025-10-11 06:36:18'),
(42, 70, 'CEMENT', 'DURAGUARD', 'Medium-quality cement', 400, 134000, 335.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760164726990DURAGUARD Cement.jpg', 'per bag', 134, 'Best for foundations', '800-1500', '2025-10-11 06:38:46'),
(43, 71, 'M SAND', 'M SAND (APPROX. 50% OF TOTAL SAND REQUIRED)', 'High-strength Sand', 5, 87500, 17500.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760165173019M SAND.webp', 'Tipper 500cft', 88, 'Best for foundations', '200-1500', '2025-10-11 06:46:13'),
(44, 71, 'M SAND', 'RIVER SAND (APPROX. 50% OF TOTAL SAND REQUIRED)', 'Medium-quality Sand', 5, 137500, 27500.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760165324640RIVER SAND.jpeg', 'Tipper 500cft', 138, 'Best for foundations', '1200-1500', '2025-10-11 06:48:44'),
(45, 72, 'BRICKS/ MASONERY', 'AAC BLOCKS', 'High-strength  Brick', 39, 128700, 3300.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760167025463AAC BLOCKS.webp', 'cbm', 129, 'Best  for foundations', '1000-1500', '2025-10-11 07:17:05'),
(46, 72, 'BRICKS/ MASONERY', 'RED BRICKS', 'High-strength cement', 18000, 111600, 6.20, 'https://estimate-project.dentalguru.software/uploads/image_items-1760167163989RED BRICKS.png', 'nos', 112, 'Best for foundations', '800-10000', '2025-10-11 07:19:23'),
(47, 72, 'BRICKS/ MASONERY', 'FLY ASH BRICKS', 'Medium-quality Bricks', 18000, 106200, 5.90, 'https://estimate-project.dentalguru.software/uploads/image_items-1760168353816flyash-bricks.jpg', 'nos', 106, 'Best for foundation', '1200-1500', '2025-10-11 07:39:13'),
(48, 73, 'TMT STEEL BARS', 'SHOURYA', 'Medium-quality Steel', 4400, 268400, 61.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760170328562SHOURYA.webp', 'per kg', 268, 'Best for foundation', '200-1500', '2025-10-11 08:12:08'),
(49, 73, 'TMT STEEL BARS', 'KAMDHENU', 'Medium-quality Steel', 4400, 275000, 62.50, 'https://estimate-project.dentalguru.software/uploads/image_items-1760176591858KAMDHENU.webp', 'per kg', 275, 'Best for foundation', '1200-1500', '2025-10-11 09:56:31'),
(50, 73, 'TMT STEEL BARS', 'FORTUNE', 'High-strength cement', 4400, 268400, 61.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760176820020fortune-tmt-bar.jpg', 'per kg', 268, 'Best for foundationssss', '1200-1500', '2025-10-11 10:00:20'),
(51, 73, 'TMT STEEL BARS', 'GOEL', 'High-strength cement', 4400, 290400, 66.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760176934989GOEL.jpg', 'per kg', 290, 'Best for foundation', '200-1500', '2025-10-11 10:02:14'),
(52, 73, 'TMT STEEL BARS', 'TATA', 'High-strength cement', 4400, 347600, 79.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760177771507TATA.webp', 'per kg', 348, 'Best for foundation', '1200-1500', '2025-10-11 10:16:11'),
(53, 73, 'TMT STEEL BARS', 'JINDEL', 'Medium-quality Steel', 4400, 330000, 75.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760178084529JINDEL.jpg', 'per kg', 330, 'Best for foundation', '1200-1500', '2025-10-11 10:21:24'),
(54, 73, 'TMT STEEL BARS', 'NIRMAN', 'Medium-quality Steel', 4400, 264000, 60.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760178271046NIRMAN.webp', 'per kg', 264, 'Best for foundation', '800-10000', '2025-10-11 10:24:31'),
(55, 73, 'TMT STEEL BARS', 'BHUMIJA', 'Medium-quality Steel', 4400, 264000, 60.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760178414685BHUMIJA.jpg', 'per kg', 264, 'Best for foundation', '1200-1500', '2025-10-11 10:26:54'),
(56, 73, 'TMT STEEL BARS', 'BHUMIJA', 'Medium-quality Steel', 4400, 264000, 60.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760178662970BHUMIJA.jpg', 'per kg', 264, 'Best for foundation', '1200-1500', '2025-10-11 10:31:02'),
(57, 73, 'TMT STEEL BARS', 'ANY ISI TMT', 'High-strength cement', 4400, 1161600, 264.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760701204959ANY ISI TMT.jpg', 'per kg', 1162, 'Best for foundation', '800-10000', '2025-10-17 11:40:05'),
(58, 74, 'PLINTH FILLING MATERIAL(upto 3 feet height from natural ground level)', 'HARD MURUM', 'Medium-quality MURUM', 8, 60000, 7500.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760703081437HARD MURUM.jpg', 'Tipper', 60, 'Best for foundation', '200-1500', '2025-10-17 12:11:21'),
(59, 74, 'PLINTH FILLING MATERIAL(upto 3 feet height from natural ground level)', 'MALBA OR BUILDING SCRAP', 'Medium-quality Scrap', 8, 52000, 6500.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1760703341342MALBA OR BUILDING SCRAP.jpg', 'Tipper', 52, 'Best for foundations', '1200-1500', '2025-10-17 12:15:41'),
(60, 72, 'BRICKS/ MASONERY', 'Portland Cement', 'High-strength cement', 4, 70000, 17500.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1761377667632SIGLE CHOICE.webp', 'per roll', 70, 'Best for foundations', '1200-1500000', '2025-10-25 07:34:27'),
(62, 71, 'M SAND', 'River Sand', 'Fine-grade sand', 5, 40000, 8000.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1762173495782image_items-1760165173019M SAND.webp', 'per kg', 40, 'Best Sand', '300-1500', '2025-11-03 12:38:15'),
(64, 105, 'Test Sub', 'Cement', 'DOUBLE BULL', 400, 134000, 335.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1762409598714image_items-1760164578272DOUBLE BULL.png', 'per ft³', 134, 'Best for foundations this cement', '200-1500', '2025-11-06 06:13:18'),
(66, 84, 'MAIN WINDOWS(UPTO 20SQFT)', 'ALUMINIUM WHITE 3 TRACKS', 'ALUMINIUM WHITE 3 TRACKS', 100, 35000, 350.00, 'https://estimate-project.dentalguru.software/uploads/image_items-1762430525266track.jpg', 'per piece', 35, 'Nice Track', '800-1500', '2025-11-06 12:02:05');

-- --------------------------------------------------------

--
-- Table structure for table `otpcollections`
--

CREATE TABLE `otpcollections` (
  `otp_id` int(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `code` int(10) DEFAULT NULL,
  `expiresIn` int(20) DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `otpcollections`
--

INSERT INTO `otpcollections` (`otp_id`, `email`, `code`, `expiresIn`, `createdAt`) VALUES
(1, 'kuldeepdoauruinfosystems@gmail.com', 224603, NULL, '2024-08-13 06:59:36.777227'),
(2, 'mohitsahu1993@gmail.com', 254910, NULL, '2024-08-22 07:31:13.481316'),
(3, 'shadab@gmail.com', 617412, NULL, '2024-09-02 07:06:14.109336'),
(4, 'kuldeepdoauruinfosystems@gmail.com', 694511, NULL, '2024-10-28 06:46:34.286922'),
(5, 'umer@gmail.com', 141174, NULL, '2024-10-28 09:38:09.772837'),
(6, 'umerqureshidoaguru@gmail.com', 284783, NULL, '2024-10-28 09:40:56.211954'),
(7, 'umerqureshi786786@gmail.com', 438900, NULL, '2024-10-28 10:06:47.009743'),
(8, 'umerqureshi786786@gmail.com', 766856, NULL, '2024-10-28 10:36:44.825756'),
(9, 'umerqureshi786786@gmail.com', 91347, NULL, '2024-10-28 10:42:44.327534'),
(10, 'umerqureshidoaguru@gmail.com', 965997, NULL, '2024-10-28 11:01:44.891003'),
(11, 'umerqureshi786786@gmail.com', 214866, NULL, '2024-10-28 11:06:44.496840'),
(12, 'umerqureshidoaguru@gmail.com', 595652, NULL, '2024-10-28 11:10:16.926784'),
(13, 'umerqureshi786786@gmail.com', 916447, NULL, '2024-10-28 11:48:37.518558'),
(14, 'umerqureshidoaguru@gmail.com', 164218, NULL, '2024-11-02 08:29:38.226751'),
(15, 'umerqureshi786786@gmail.com', 384225, NULL, '2024-11-02 08:32:31.049691'),
(16, 'umerqureshi786786@gmail.com', 49893, NULL, '2024-11-02 08:33:44.304847'),
(17, 'umerqureshi786786@gmail.com', 29892, NULL, '2024-11-02 08:43:57.239706'),
(18, 'umerqureshi786786@gmail.com', 132098, NULL, '2024-11-02 08:46:17.708877'),
(19, 'vinaydhariya21@gmail.com', 197511, NULL, '2024-11-02 10:01:02.463107'),
(20, 'shubhsoni1996th@gmail.com', 649018, NULL, '2024-11-02 12:21:31.975979'),
(21, 'vinaydhariya21@gmail.com', 52445, NULL, '2024-11-02 13:02:07.761740'),
(0, 'umerqureshi786786@gmail.com', 15577, NULL, '2024-12-25 12:09:50.640215'),
(0, 'umerqureshi786786@gmail.com', 305802, NULL, '2024-12-25 12:12:41.995921'),
(0, 'umerqureshi786786@gmail.com', 441528, NULL, '2024-12-25 12:17:33.904795'),
(0, 'umerqureshi786786@gmail.com', 969002, NULL, '2024-12-25 12:24:39.557547'),
(0, 'umerqureshi786786@gmail.com', 78049, NULL, '2024-12-25 12:28:49.622981'),
(0, 'umerqureshidoaguru@gmail.com', 922773, NULL, '2024-12-26 07:44:46.860702'),
(0, 'umerqureshidoaguru@gmail.com', 132076, NULL, '2024-12-26 07:54:38.571203'),
(0, 'umerqureshidoaguru@gmail.com', 380494, NULL, '2024-12-26 07:55:58.223044'),
(0, 'umerqureshidoaguru@gmail.com', 489279, NULL, '2025-01-02 13:55:14.473995'),
(0, 'umerqureshi786786@gmail.com', 846728, NULL, '2025-01-03 11:11:28.978719'),
(0, 'umerqureshidoaguru@gmail.com', 332411, NULL, '2025-01-03 11:13:22.214841'),
(0, 'umerqureshi786786@gmail.com', 747328, NULL, '2025-01-27 11:16:21.507521'),
(0, 'shubhamsonidoaguru@gmail.com', 739821, NULL, '2025-01-30 12:52:36.435637'),
(0, 'deepanshu123.doaguru@gmail.com', 475508, NULL, '2025-10-08 08:21:19.547045'),
(0, 'umerqureshidoaguru@gmail.com', 709870, NULL, '2025-10-30 12:19:07.596281'),
(0, 'ds19880706@gmail.com', 721408, NULL, '2025-11-03 07:29:17.411729'),
(0, 'deepanshushukla088@gmail.com', 417355, NULL, '2025-11-03 07:48:35.118525'),
(0, 'umerqureshidoaguru@gmail.com', 811627, NULL, '2025-11-07 10:44:57.790503'),
(0, 'deepanshu123.doaguru@gmail.com', 528139, NULL, '2025-11-07 10:55:13.028275'),
(0, 'deepanshu123.doaguru@gmail.com', 71521, NULL, '2025-11-07 11:10:17.086764'),
(0, 'himanshu2010kvproduct@gmail.com', 821757, NULL, '2025-11-12 08:09:33.943778'),
(0, 'umerqureshidoaguru@gmail.com', 108462, NULL, '2025-11-12 12:48:26.310845'),
(0, 'umerqureshidoaguru@gmail.com', 941593, NULL, '2025-11-12 12:56:34.105809'),
(0, 'umerqureshidoaguru@gmail.com', 79030, NULL, '2025-11-12 13:13:05.200271'),
(0, 'doaguruinfosystems@gmail.com', 431220, NULL, '2025-11-13 08:35:33.144426');

-- --------------------------------------------------------

--
-- Table structure for table `registered_data`
--

CREATE TABLE `registered_data` (
  `user_id` int(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roles` varchar(255) NOT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registered_data`
--

INSERT INTO `registered_data` (`user_id`, `user_name`, `email`, `password`, `roles`, `phone_no`, `created_date`) VALUES
(57, 'umer', 'umerqureshi786786@gmail.com', '$2b$10$5qsWhxus3IK/PkWK3pXQyepQ7DoV/YpmVgkrNXR33gCTuJ0zaer4W', 'Admin', 'NULL', '2025-01-03 11:11:53'),
(58, 'Umer Doaguru', 'umerqureshidoaguru@gmail.com', '$2b$10$sdTwRzZOijMZCL7PAgp5v.gSRDUSgCJclKFMTEBLyqDSKw8U6X22m', 'User', '6260550661', '2024-12-26 07:56:35'),
(60, 'umer qureshi ', 'user@gmail.com', '$2b$10$JzLfWMgMtpBbZy/Z7HU7o.FdA30VmIVfJD1RtWE/2L40/wlwOudRy', 'User', '6260550661', '2025-11-14 05:18:32'),
(61, 'Mr Pankaj Sen', 'pankajsen345@gmail.com', '$2b$10$9aW3gx8BW0q9.1bu8mhiPeAJ6qCUJ/1KrFmJZkpPb6aSRJP/tm2IG', 'Admin', 'NULL', '2025-11-14 05:22:31');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `subcategory_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `subcategory_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`subcategory_id`, `category_id`, `category_name`, `subcategory_name`, `created_at`) VALUES
(70, 25, 'STRUCTURE', 'CEMENT', '2025-10-10 10:04:20'),
(71, 25, 'STRUCTURE', 'M SAND', '2025-10-10 10:04:50'),
(72, 25, 'STRUCTURE', 'BRICKS/ MASONERY', '2025-10-10 10:05:08'),
(73, 25, 'STRUCTURE', 'TMT STEEL BARS', '2025-10-10 10:05:40'),
(74, 25, 'STRUCTURE', 'PLINTH FILLING MATERIAL(upto 3 feet height from natural ground level)', '2025-10-10 10:05:50'),
(75, 25, 'STRUCTURE', 'AGGRIGATE (GITTI)10MM&20MM', '2025-10-10 10:06:02'),
(78, 26, 'DOOR FRAMES', 'MAIN DOOR (4\'X7\')', '2025-10-10 10:28:37'),
(79, 26, 'DOOR FRAMES', 'BEDROOM AND OTHER INTERIOR DOORS', '2025-10-10 10:28:46'),
(80, 26, 'DOOR FRAMES', 'WASHROOM DOORS', '2025-10-10 10:28:54'),
(81, 34, 'DOORS', 'MAIN DOOR', '2025-10-10 10:31:35'),
(82, 34, 'DOORS', 'BEDROOM AND OTHER INTERIOR DOORS', '2025-10-10 10:31:46'),
(83, 34, 'DOORS', 'WASHROOM DOORS', '2025-10-10 10:31:55'),
(84, 27, 'WINDOWS AND VENTILATORS', 'MAIN WINDOWS(UPTO 20SQFT)', '2025-10-10 10:32:44'),
(85, 27, 'WINDOWS AND VENTILATORS', 'VENTILATORS', '2025-10-10 10:32:57'),
(86, 28, 'FLOOR TILES AND WALL TILES', 'FOR ALL INTERIOR FLOOR', '2025-10-10 10:33:11'),
(87, 28, 'FLOOR TILES AND WALL TILES', 'FOR ALL WASHROOMS', '2025-10-10 10:33:20'),
(88, 28, 'FLOOR TILES AND WALL TILES', 'FOR KITCHEN WALL 24 INCH FROM PLATEFORM TOP', '2025-10-10 10:33:33'),
(89, 28, 'FLOOR TILES AND WALL TILES', 'FOR ALL OPEN AREAS LIKE PORCH/PARKING/BALCONY/OTS/COURTYARD', '2025-10-10 10:33:42'),
(90, 29, 'STONE WORK', 'FOR KITCHEN STRUCTURE WILL BE MADE WITH KADAPPA STONE DP STONE SELECT FOR TOP FINISH', '2025-10-10 10:34:05'),
(91, 29, 'STONE WORK', 'FOR STAIRS', '2025-10-10 10:34:14'),
(92, 29, 'STONE WORK', 'FOR ALL THRESHOLD', '2025-10-10 10:34:23'),
(93, 29, 'STONE WORK', 'FOR ALL TABLETOP WASHBASIN', '2025-10-10 10:34:31'),
(94, 29, 'STONE WORK', 'FOR ANY ALMIRA OR STONE SHEVES', '2025-10-10 10:34:41'),
(95, 29, 'STONE WORK', 'FOR ENTRY RAMP AND STEPS', '2025-10-10 10:34:50'),
(96, 29, 'STONE WORK', 'FOR ENTRY GATE COLUMNS', '2025-10-10 10:34:57'),
(97, 30, 'FALL CEILING', 'FOR INTERIOR( HALL,BEDROOMS,KITCHEN,WAHROOMS) WORK UPTO WIRING EXCLUEDED LIGHTS (NORMAL)', '2025-10-10 10:35:12'),
(98, 30, 'FALL CEILING', 'FOR INTERIOR( HALL,BEDROOMS,KITCHEN,WAHROOMS) WORK UPTO WIRING EXCLUEDED LIGHTS (PREMIUM)', '2025-10-10 10:35:57'),
(99, 31, 'PUTTY,PAINT AND POLISH', 'INTERIOR WALL PUTTY DOUBLE COAT', '2025-10-10 11:26:42'),
(100, 31, 'PUTTY,PAINT AND POLISH', 'ELEVATION WALL PUTTY WATER REPELANT', '2025-10-10 11:27:22'),
(101, 31, 'PUTTY,PAINT AND POLISH', 'INTERIOR WALL PAINT', '2025-10-10 11:27:32'),
(102, 31, 'PUTTY,PAINT AND POLISH', 'EXTERIOR WALL PAINT', '2025-10-10 11:27:47'),
(103, 31, 'PUTTY,PAINT AND POLISH', 'PAINT ON MS WORK', '2025-10-10 11:27:57'),
(105, 36, 'Test', 'Test Sub', '2025-11-06 06:03:22'),
(106, 37, 'Dummy', 'Dummy Sub category', '2025-11-12 08:39:27'),
(107, 37, 'Dummy', 'Create Categori', '2025-11-13 07:35:48');

-- --------------------------------------------------------

--
-- Table structure for table `user_enroll`
--

CREATE TABLE `user_enroll` (
  `id` int(100) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_enroll`
--

INSERT INTO `user_enroll` (`id`, `user_name`, `email`, `password`, `roles`, `phone_no`, `created_date`) VALUES
(9, 'umer ', 'umerqureshidoaguru@gmail.com', '$2b$10$ddsudJd8wFW3qL2b64Vsh.fk9YpjE35wWOrcrGKP5Qr1nu8.72Ndy', 'User', '6260050661', '2025-11-12 13:13:30'),
(10, 'you', 'doaguruinfosystems@gmail.com', '$2b$10$qYmAYDBGvbi3hC/xml0iuOxn5fTrBwQ1PP4uD/qanxK.L2FATlwde', 'User', '9399044852', '2025-11-13 08:36:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `user_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `plot_area` varchar(255) NOT NULL,
  `project_type` varchar(255) NOT NULL,
  `construction_area` int(255) DEFAULT 0,
  `no_floor` int(100) DEFAULT 0,
  `total_construction_area` int(11) DEFAULT 0,
  `budgest` int(255) NOT NULL DEFAULT 0,
  `per_sq_fit` varchar(255) DEFAULT '0',
  `after_selection_amount` int(255) NOT NULL DEFAULT 0,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `user_id`, `name`, `email`, `plot_area`, `project_type`, `construction_area`, `no_floor`, `total_construction_area`, `budgest`, `per_sq_fit`, `after_selection_amount`, `created_date`) VALUES
(8, 10, 'you', 'doaguruinfosystems@gmail.com', '1000', 'Residential', 950, 2, 1900, 5000000, '2631', 3288750, '2025-11-13 09:06:01'),
(11, 9, 'umer ', 'umerqureshidoaguru@gmail.com', '1000', 'Commercial', 1000, 2, 2000, 15000000, '7500', 0, '2025-11-14 12:52:03');

-- --------------------------------------------------------

--
-- Table structure for table `user_selections`
--

CREATE TABLE `user_selections` (
  `selection_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `subcategory_name` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image_items` varchar(255) NOT NULL,
  `total_price` int(22) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_selections`
--

INSERT INTO `user_selections` (`selection_id`, `user_id`, `item_id`, `category_name`, `subcategory_name`, `item_name`, `description`, `image_items`, `total_price`, `created_at`) VALUES
(7, 10, 43, 'STRUCTURE', 'M SAND', 'M SAND (APPROX. 50% OF TOTAL SAND REQUIRED)', 'High-strength Sand', 'https://estimate-project.dentalguru.software/uploads/image_items-1760165173019M SAND.webp', 231528, '2025-11-13 08:53:58'),
(8, 10, 57, 'STRUCTURE', 'TMT STEEL BARS', 'ANY ISI TMT', 'High-strength cement', 'https://estimate-project.dentalguru.software/uploads/image_items-1760701204959ANY ISI TMT.jpg', 3057222, '2025-11-13 08:54:51'),
(27, 9, 36, 'STRUCTURE', 'CEMENT', 'ULTRATECH', 'High-strength cement', 'https://estimate-project.dentalguru.software/uploads/image_items-1760160988892ultratech.webp', 1005000, '2025-11-14 12:54:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comment_ibfk_1` (`user_id`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `subcategory_id` (`subcategory_id`);

--
-- Indexes for table `registered_data`
--
ALTER TABLE `registered_data`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`subcategory_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `user_enroll`
--
ALTER TABLE `user_enroll`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_ibfk_1` (`user_id`);

--
-- Indexes for table `user_selections`
--
ALTER TABLE `user_selections`
  ADD PRIMARY KEY (`selection_id`),
  ADD KEY `user_selections_ibfk_3` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `registered_data`
--
ALTER TABLE `registered_data`
  MODIFY `user_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `user_enroll`
--
ALTER TABLE `user_enroll`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_selections`
--
ALTER TABLE `user_selections`
  MODIFY `selection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_enroll` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`subcategory_id`) ON DELETE CASCADE;

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_enroll` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_selections`
--
ALTER TABLE `user_selections`
  ADD CONSTRAINT `user_selections_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user_enroll` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
