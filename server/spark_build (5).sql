-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2025 at 11:24 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spark_build`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `created_at`) VALUES
(8, 'Foundation', '2025-01-07 12:46:11'),
(9, 'Walls and Masonry', '2025-01-07 12:46:24'),
(10, 'Roofing', '2025-01-07 12:46:32'),
(11, 'Flooring', '2025-01-07 12:46:40'),
(12, 'Plumbing', '2025-01-07 12:48:09'),
(13, 'Electrical', '2025-01-07 12:48:18'),
(14, 'Carpentry', '2025-01-07 12:49:01'),
(15, 'Paint and Finishes', '2025-01-07 12:49:10'),
(16, 'Doors and Windows', '2025-01-07 12:49:19');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `subcategory_name` varchar(255) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `image_items` varchar(255) NOT NULL,
  `unit_price_type` varchar(255) NOT NULL,
  `recommendation_description` varchar(255) NOT NULL,
  `sq_fit_range` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `subcategory_id`, `subcategory_name`, `item_name`, `description`, `unit_price`, `image_items`, `unit_price_type`, `recommendation_description`, `sq_fit_range`, `created_at`) VALUES
(15, 43, 'Cement', 'Portland Cement', 'High-strength cement', 350.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736496379323portland-cement.jpg', 'per piece', 'Best for foundations', '1200-1500', '2025-01-08 08:14:57'),
(16, 45, 'Sand', 'River Sand', 'Fine-grade sand', 8000.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736496763462river-sand.jpeg', 'per ton', 'Best for foundations', '1200-1500', '2025-01-08 08:15:57'),
(17, 46, 'Aggregates', 'Crushed Stone', 'Aggregates for concrete preparation', 750.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-173649683420415mm-crushed-stone.jpeg', 'per ton', 'Best for foundations', '1200-1500', '2025-01-08 08:16:15'),
(18, 47, 'Bricks', 'Red Bricks', 'Standard-sized bricks for masonry', 10.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736496883012logo-printed-building-brick.jpg', 'per piece', 'Best for foundations', '1200-1500', '2025-01-08 08:16:33'),
(19, 48, 'Blocks', 'Concrete Blocks\r\n', 'Solid or hollow blocks for walls', 25.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736497580820main_1_2048x.jpg', 'per piece', '', '', '2025-01-08 08:21:08'),
(20, 49, 'Concrete', 'RCC Mix', 'Ready-mix concrete for roofing', 5000.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736497651100reinforced-ready-mix-concrete-500x500.webp', 'per m³', '', '', '2025-01-08 08:17:21'),
(21, 50, 'Tiles', 'Ceramic Tiles', 'Cost-effective tiles for flooring', 40.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736497784370Ceramic-tiles-Properties-types-advantages-disadvantages-and-uses-f.jpg', 'per m²', '', '', '2025-01-08 08:17:51'),
(22, 51, 'Pipes', 'PVC Pipes', 'Lightweight pipes for water supply', 680.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736497828161product-jpeg-500x500.webp', 'per piece', '', '', '2025-01-08 08:18:18'),
(23, 52, 'Wiring', 'Copper Wires', 'Electrical wiring for circuits', 835.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736497899513copper-wires-500x500.webp', 'per kg', '', '', '2025-01-08 08:19:11'),
(24, 53, 'Wood', 'Wooden Planks', 'Hardwood planks for furniture or flooring', 300.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736497958128timber-wooden-plank.jpg', 'per ft³', '', '', '2025-01-08 08:19:39'),
(25, 55, 'Interior Paint', 'Emulsion Paint', 'Matte finish paints for interiors', 500.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736498092519shutterstock_151976957-900x600-1-1-1.webp', 'per L', '', '', '2025-01-08 08:20:16'),
(26, 56, 'Doors', 'Wooden Doors', 'High-quality wooden doors', 5000.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-173649814981471D0WzlLzQL.jpg', 'per piece', '', '', '2025-01-08 08:21:08'),
(29, 43, 'Cement', 'Birla Cement ', 'Medium-quality cement', 300.00, 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736508275191birla002.png', 'per piece', 'Best cement  for foundations', '800-10000', '2025-01-10 11:24:35');

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
(0, 'umerqureshidoaguru@gmail.com', 332411, NULL, '2025-01-03 11:13:22.214841');

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
(58, 'Umer Doaguru', 'umerqureshidoaguru@gmail.com', '$2b$10$sdTwRzZOijMZCL7PAgp5v.gSRDUSgCJclKFMTEBLyqDSKw8U6X22m', 'User', '6260550661', '2024-12-26 07:56:35');

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
(43, 8, 'Foundation', 'Cement', '2025-01-08 08:05:51'),
(45, 8, 'Foundation', 'Sand', '2025-01-08 08:08:21'),
(46, 8, 'Foundation', 'Aggregates', '2025-01-08 08:08:32'),
(47, 9, 'Walls and Masonry', 'Bricks', '2025-01-08 08:08:51'),
(48, 9, 'Walls and Masonry', 'Blocks', '2025-01-08 08:09:09'),
(49, 10, 'Roofing', 'Concrete', '2025-01-08 08:09:34'),
(50, 11, 'Flooring', 'Tiles', '2025-01-08 08:09:49'),
(51, 12, 'Plumbing', 'Pipes', '2025-01-08 08:10:07'),
(52, 13, 'Electrical', 'Wiring', '2025-01-08 08:10:23'),
(53, 14, 'Carpentry', 'Wood', '2025-01-08 08:10:39'),
(55, 15, 'Paint and Finishes', 'Interior Paint', '2025-01-08 08:11:52'),
(56, 16, 'Doors and Windows', 'Doors', '2025-01-08 08:14:28');

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
(1, 'Umer Doaguru', 'umerqureshidoaguru@gmail.com', '$2b$10$GiIqDh9qTd5UTw.RM/7v4eBh67zJHRJGW1aaVj0WN/JnHitWdOgVS', 'User', '6260550661', '2025-01-03 11:13:52');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `user_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `plot_size` varchar(255) NOT NULL,
  `project_type` varchar(255) NOT NULL,
  `budgest` int(255) NOT NULL,
  `per_sq_fit` varchar(255) NOT NULL,
  `after_selection_amount` int(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `user_id`, `name`, `email`, `plot_size`, `project_type`, `budgest`, `per_sq_fit`, `after_selection_amount`, `created_date`) VALUES
(12, 1, 'Umer Doaguru', 'umerqureshidoaguru@gmail.com', '1000 sq fit ', 'Commercial', 1000000, '1000', 21280, '2025-01-18 08:34:32');

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
  `quantity` int(11) NOT NULL,
  `total_price` int(22) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_selections`
--

INSERT INTO `user_selections` (`selection_id`, `user_id`, `item_id`, `category_name`, `subcategory_name`, `item_name`, `description`, `image_items`, `quantity`, `total_price`, `created_at`) VALUES
(35, 1, 18, 'Walls and Masonry', 'Bricks', 'Red Bricks', '', 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736496883012logo-printed-building-brick.jpg', 1, 10, '2025-01-13 12:08:05'),
(38, 1, 21, 'Flooring', 'Tiles', 'Ceramic Tiles', '', 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736497784370Ceramic-tiles-Properties-types-advantages-disadvantages-and-uses-f.jpg', 3, 120, '2025-01-13 12:58:17'),
(39, 1, 20, 'Roofing', 'Concrete', 'RCC Mix', '', 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736497651100reinforced-ready-mix-concrete-500x500.webp', 3, 15000, '2025-01-13 13:25:41'),
(41, 1, 25, 'Paint and Finishes', 'Interior Paint', 'Emulsion Paint', '', 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736498092519shutterstock_151976957-900x600-1-1-1.webp', 1, 500, '2025-01-13 13:37:59'),
(42, 1, 24, 'Carpentry', 'Wood', 'Wooden Planks', '', 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736497958128timber-wooden-plank.jpg', 1, 300, '2025-01-13 13:38:11'),
(45, 1, 26, 'Doors and Windows', 'Doors', 'Wooden Doors', '', 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-173649814981471D0WzlLzQL.jpg', 1, 5000, '2025-01-14 08:19:26'),
(49, 1, 15, 'Foundation', 'Cement', 'Portland Cement', 'High-strength cement', 'https://estimate-project.vimubds5.a2hosted.com/uploads/image_items-1736496379323portland-cement.jpg', 1, 350, '2025-01-16 11:47:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_selections`
--
ALTER TABLE `user_selections`
  ADD PRIMARY KEY (`selection_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `registered_data`
--
ALTER TABLE `registered_data`
  MODIFY `user_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `user_enroll`
--
ALTER TABLE `user_enroll`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_selections`
--
ALTER TABLE `user_selections`
  MODIFY `selection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `user_selections`
--
ALTER TABLE `user_selections`
  ADD CONSTRAINT `user_selections_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
