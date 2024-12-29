-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2024 at 10:16 AM
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
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `roles` varchar(255) NOT NULL DEFAULT 'Admin',
  `createdTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `name`, `email`, `password`, `position`, `phone`, `roles`, `createdTime`) VALUES
(34, 'umer', 'umerqureshi786786@gmail.com', 'mohit', 'Admin', '6260550661', 'Admin', '2024-12-25 12:13:13'),
(36, 'Hemlata Mahatma', 'hemlatamahatma1989@gmail.com', 'hemlata@onerealty', 'Admin', '9098300280', 'Admin', '2024-11-04 07:19:44');

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
(1, 'Materials', '2024-12-27 08:10:58'),
(2, 'Labor', '2024-12-27 08:10:58'),
(3, 'Equipment', '2024-12-27 08:10:58'),
(5, 'testdd', '2024-12-27 08:10:58');

-- --------------------------------------------------------

--
-- Table structure for table `company_profile`
--

CREATE TABLE `company_profile` (
  `id` int(11) NOT NULL,
  `header_img` varchar(255) NOT NULL,
  `footer_img` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `company_name_account_name` varchar(255) NOT NULL,
  `company_name_account_ifsc` varchar(255) NOT NULL,
  `company_name_account_number` varchar(255) NOT NULL,
  `bank` varchar(255) NOT NULL,
  `company_address` varchar(255) NOT NULL,
  `moblie_no` varchar(255) NOT NULL,
  `gst_no` varchar(255) DEFAULT NULL,
  `pan_no` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `digital_sign` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_profile`
--

INSERT INTO `company_profile` (`id`, `header_img`, `footer_img`, `company_name`, `company_name_account_name`, `company_name_account_ifsc`, `company_name_account_number`, `bank`, `company_address`, `moblie_no`, `gst_no`, `pan_no`, `email_id`, `logo`, `digital_sign`, `created_date`) VALUES
(5, 'https://crmdemo.vimubds5.a2hosted.com/uploads/header_img-17268272035332.png', 'https://crmdemo.vimubds5.a2hosted.com/uploads/footer_img-1726827203538last.png', 'Doaguru Infosystems', ' DOAGuru InfoSystems', 'SBIN0004677', ' 38666325192', 'SBI Bank , Jabalpur', '1815 Wright Town, Jabalpur, Madhya pradesh INDIA 482002', '+91-7477253424', ' 23AGLPP2890G1Z7 sdsd', '', 'info@doaguru.com', 'https://crmdemo.vimubds5.a2hosted.com/uploads/logo-1726827203543infosysytems-removebg-preview.png', 'https://crmdemo.vimubds5.a2hosted.com/uploads/digital_sign-1726827203545DOAGURU Infosystyem.png', '2024-10-01 10:12:57'),
(19, 'https://crmdemo.vimubds5.a2hosted.com/uploads/header_img-1727437172123YAG-capsulotomy.jpg', 'https://crmdemo.vimubds5.a2hosted.com/uploads/footer_img-1727437172124YAG-capsulotomy.jpg', 'dhariya enterprices\'s', '454466456', 'dsdsfd3234', 'efsdsfsd', '334332', 'gupta colony ', '831886469164646464', '465454646645', '', 'Vinaydhariya21@gmail.com', 'https://crmdemo.vimubds5.a2hosted.com/uploads/logo-1727437172126Understanding Retinal Detachment Symptoms.jpg', 'https://crmdemo.vimubds5.a2hosted.com/uploads/digital_sign-1727437172128Understanding Retinal Detachment Symptoms.jpg', '2024-09-27 11:39:32');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employeeId` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `createdTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employeeId`, `name`, `email`, `password`, `phone`, `createdTime`) VALUES
(33, 'Raveena Shivhare', 'yadavraveena668@gmail.com', 'raveena@onerealty', '9340338374', '2024-11-04 07:21:11'),
(34, 'test', 'test@gmail.com', 'test', '6260550661', '2024-11-04 07:21:32');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `subcategory_id`, `item_name`, `description`, `unit_price`, `created_at`) VALUES
(1, 1, 'Portland Cement', 'High-quality cement', 350.00, '2024-12-27 08:12:00'),
(2, 2, 'Wall Paint', 'White acrylic paint', 200.00, '2024-12-27 08:12:00'),
(3, 3, 'Brick Mason', 'Hourly rate for mason', 500.00, '2024-12-27 08:12:00'),
(4, 4, 'Hammer', 'Durable claw hammer', 150.00, '2024-12-27 08:12:00');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `lead_id` int(11) NOT NULL,
  `lead_no` varchar(50) NOT NULL,
  `assignedTo` varchar(100) NOT NULL,
  `employeeId` int(255) NOT NULL,
  `createdTime` varchar(255) NOT NULL,
  `actual_date` varchar(255) NOT NULL,
  `assignedBy` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `leadSource` varchar(100) NOT NULL,
  `remark_status` varchar(255) NOT NULL DEFAULT 'pending',
  `answer_remark` varchar(255) NOT NULL DEFAULT 'pending',
  `remark_id` int(255) DEFAULT NULL,
  `meeting_status` varchar(255) NOT NULL DEFAULT 'pending',
  `lead_status` varchar(255) NOT NULL DEFAULT 'pending',
  `subject` varchar(255) NOT NULL,
  `booking_amount` varchar(255) NOT NULL DEFAULT 'pending',
  `payment_mode` varchar(255) NOT NULL DEFAULT 'pending',
  `registry` varchar(255) NOT NULL DEFAULT 'pending',
  `address` varchar(255) NOT NULL,
  `quotation` varchar(255) NOT NULL DEFAULT 'not created',
  `quotation_status` varchar(255) NOT NULL DEFAULT 'not approved',
  `visit` varchar(255) NOT NULL DEFAULT 'pending ',
  `deal_status` varchar(255) NOT NULL DEFAULT 'pending',
  `d_closeDate` varchar(255) NOT NULL DEFAULT 'pending',
  `reason` varchar(255) NOT NULL DEFAULT 'pending',
  `follow_up_status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`lead_id`, `lead_no`, `assignedTo`, `employeeId`, `createdTime`, `actual_date`, `assignedBy`, `name`, `phone`, `leadSource`, `remark_status`, `answer_remark`, `remark_id`, `meeting_status`, `lead_status`, `subject`, `booking_amount`, `payment_mode`, `registry`, `address`, `quotation`, `quotation_status`, `visit`, `deal_status`, `d_closeDate`, `reason`, `follow_up_status`) VALUES
(124, '211', 'umer', 29, '2024-10-31', '2024-10-29', 'Admin', 'Satyam Mishra', '+91-8770422546', '99 Acres', 'pending', 'pending', NULL, 'pending', 'completed', 'Nirvana Homes', '1000', 'cash', 'done', 'Jabalpur', 'created', 'not approved', 'fresh', 'close', '2024-11-01', 'pending', 'pending'),
(129, '1218599669443593', 'vinay', 25, '2024-11-22', '2024-10-31', 'Admin', 'Binod kumar Swarnkar', '+919993454635', 'Facebook Campaign', 'pending', 'pending', NULL, 'pending', 'pending', 'nirvana home leads 14/10', 'pending', 'pending', 'pending', 'Plot A-67,  jasuja city phase 3', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(130, '1601177500780293', 'sofia', 31, '2024-11-10', '2024-10-31', 'Admin', 'M.P. Singh', '9425015136', 'Facebook Campaign', 'pending', 'pending', NULL, 'pending', 'pending', 'nirvana home leads 14/10', 'pending', 'pending', 'pending', '????????', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(131, '215', 'vinay', 25, '2024-11-30', '2024-10-31', 'Admin', 'Dr Umesh Kumar Kori', '+91-7000275146', '99 Acres', 'pending', 'pending', NULL, 'pending', 'pending', 'Nirvana Homes', 'pending', 'pending', 'pending', 'Jabalpur', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(132, '24', 'umer', 29, '2024-11-17', '2024-10-23', 'Admin', 'Test Email Integration  ', '9696969696', 'One Realty Website', 'pending', 'pending', NULL, 'pending', 'pending', 'Nirvana Homes', 'pending', 'pending', 'pending', 'indore', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(133, '220', 'umer', 29, '2024-11-02', '2024-11-02', 'Admin', 'Mohit Verma', '+91-8269973198', '99 Acres', 'pending', 'pending', NULL, 'pending', 'in progress', 'Nirvana Homes', 'pending', 'pending', 'pending', 'Jabalpur', 'not created', 'not approved', 'fresh', 'pending', 'pending', 'pending', 'in progress'),
(134, '136', 'vinay', 25, '2024-11-16', '2024-11-16', 'Admin', 'Baiche', '7584838488', 'Paid Advertising', 'pending', 'pending', NULL, 'pending', 'pending', 'Jfchvheh', 'pending', 'pending', 'pending', '2hchw', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(135, '9198900449', 'vinay', 25, '2024-11-03', '2024-11-03', 'Admin', 'ayush jaiswal', '8318864691', 'just for testing purpose ', 'pending', 'pending', NULL, 'pending', 'pending', 'just for testing purpose ', 'pending', 'pending', 'pending', 'Gorakhpur', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(136, '9198900449', 'vinay', 25, '2024-11-03', '2024-11-03', 'Admin', 'ayush jaiswal', '8318864691', 'just for testing purpose ', 'pending', 'pending', NULL, 'pending', 'pending', 'just for testing purpose ', 'pending', 'pending', 'pending', 'Gorakhpur', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(137, '9198900449', 'vinay', 25, '2024-11-07', '2024-11-07', 'Admin', 'ayush jaiswal', '8318864691', 'just for testing purpose ', 'pending', 'pending', NULL, 'pending', 'pending', 'just for testing purpose ', 'pending', 'pending', 'pending', 'Gorakhpur', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(138, '9198900449', 'test', 34, '2024-11-07', '2024-11-07', 'Admin', 'ayush jaiswal', '8318864691', 'just for testing purpose ', 'pending', 'pending', NULL, 'pending', 'in progress', 'just for testing purpose ', '500', 'cash', 'done', 'Gorakhpur', 'created', 'not approved', 'fresh', 'close', '2024-11-03', 'pending', 'in progress'),
(139, '901808688556391', 'vinay', 25, '2024-11-07', '2024-11-07', 'Admin', 'Gourav Vishwakarma', '8823020013', 'Facebook Campaign', 'pending', 'pending', NULL, 'pending', 'pending', 'nirvana home leads 14/10', 'pending', 'pending', 'pending', 'Adhartal', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(140, '519643124275656', 'test', 34, '2024-11-07', '2024-11-07', 'Admin', 'Jyoti Rohit', '8492828523', 'Facebook Campaign', 'pending', 'pending', NULL, 'pending', 'in progress', 'nirvana home leads 14/10', 'pending', 'pending', 'pending', 'Dhanwantari nagar.', 'created', 'not approved', 'fresh', 'pending', 'pending', 'pending', 'done'),
(141, '899446881796547', 'test', 34, '2024-11-07', '2024-11-07', 'Admin', 'Deepak Patwa', '9329512080', 'Facebook Campaign', 'pending', 'pending', NULL, 'pending', 'pending', 'nirvana home leads 14/10', 'pending', 'pending', 'pending', 'trimurti nager', 'not created', 'not approved', 'self', 'pending', 'pending', 'pending', 'pending'),
(142, '33', 'test', 34, '2024-11-07', '2024-11-07', 'Admin', 'test for crm ', '8888888888', 'One Realty Website', 'pending', 'pending', NULL, 'pending', 'pending', 'Query', 'pending', 'pending', 'pending', 'Jabalpur', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(143, '235', 'test', 34, '2024-11-07', '2024-11-07', 'Admin', 'Abhishek shahi', '7987826723', '99 Acres', 'pending', 'pending', NULL, 'pending', 'pending', 'Nirvana Homes', 'pending', 'pending', 'pending', 'Jabalpur', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(144, '4545234', 'test', 34, '2024-11-07', '2024-11-07', 'Admin', 'umer', '6260550661', 'Cold Calling', 'pending', 'pending', NULL, 'pending', 'pending', '2BHK  plots', 'pending', 'pending', 'pending', 'Jabalpur', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(145, '4545234', 'Raveena Shivhare', 33, '2024-11-07', '2024-11-07', 'Admin', 'umer', '6260550661', 'Online Directories', 'pending', 'pending', NULL, 'pending', 'pending', '1BHK PlotS', 'pending', 'pending', 'pending', '2bhk', 'not created', 'not approved', 'self', 'pending', 'pending', 'pending', 'pending'),
(146, '4545', 'Raveena Shivhare', 33, '2024-11-07', '2024-11-07', 'Admin', 'umer', '6260550661', 'Online Directories', 'pending', 'pending', NULL, 'pending', 'pending', '1BHK PlotS', 'pending', 'pending', 'pending', 'jbp', 'not created', 'not approved', 'self', 'pending', 'pending', 'pending', 'pending'),
(147, '1262813061705939', 'test', 34, '2024-11-07', '2024-11-07', 'Admin', 'Sumit Kasture', '+918965850379', 'Facebook Campaign', 'pending', 'pending', NULL, 'pending', 'pending', 'nirvana home leads 14/10', 'pending', 'pending', 'pending', '1441, Ganga Nagar, Garha, JBP', 'not created', 'not approved', 'pending ', 'pending', 'pending', 'pending', 'pending'),
(148, '1336161474460078', 'test', 34, '2024-11-08', '2024-11-06', 'Admin', 'Sanjay Shukla', '+919098575700', 'Facebook Campaign', 'mohit sahu ji said that he will purchase plots', 'ok i will talk you', 19, 'done by manager', 'completed', 'nirvana home leads 14/10', 'pending', 'pending', 'pending', 'Kundqm', 'not created', 'not approved', 're-visit', 'pending', 'pending', 'df', 'in progress');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `quotation_id` int(11) DEFAULT NULL,
  `note_text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `quotation_id`, `note_text`) VALUES
(71, 129, 'SMM Ad Budget :-\nAds budget will be decided by client, suggested ad budget 15000/-'),
(72, 129, 'Payment/plan can be stopped/changed by informing one month in advance if not satisfied with the services.'),
(73, 129, 'Payment/plan can be stopped/changed by informing one month in advance if not satisfied with the services.'),
(74, 129, 'Estimated time for keywords ranking on the first page : -\n\n\n\n\n\nLow-competition keywords take 2-3 months,\nMedium competition Keywords take 3-5 months,\nHigh-competition Keywords take 6-9 months.\n'),
(75, 129, 'Required details like credentials and other details are needed to share timely.'),
(76, 129, 'Estimated time for keywords ranking on the first page : -\n\n\n\n\n\nLow-competition keywords take 2-3 months,\nMedium competition Keywords take 3-5 months,\nHigh-competition Keywords take 6-9 months.\n'),
(77, 129, 'Required details like credentials and other details are needed to share timely.'),
(81, 135, 'One dedicated SPOC (single point of contact) is required from the client side to approve the posts/contents/videos/website changes, etc.'),
(82, 135, 'dfdffd'),
(83, 135, '3r3'),
(84, 135, 'rere'),
(85, 140, 'Payment/plan can be stopped/changed by informing one month in advance if not satisfied with the services.'),
(86, 140, 'GSTtt'),
(87, 141, 'SMM Ad Budget :-\nAds budget will be decided by client, suggested ad budget 15000/-'),
(89, 143, 'Payment will be 100% in advance and is expected till 3rd of every month.'),
(90, 143, 'ws'),
(91, 145, 'Payment will be 100% in advance and is expected till 3rd of every month.'),
(92, 145, 'One dedicated SPOC (single point of contact) is required from the client side to approve the posts/contents/videos/website changes, etc.'),
(93, 145, 'Estimated time for keywords ranking on the first page : -\n\n\n\n\n\nLow-competition keywords take 2-3 months,\nMedium competition Keywords take 3-5 months,\nHigh-competition Keywords take 6-9 months.\n'),
(94, 145, 'Suggested Ad Amount 20,000/-'),
(97, 194, 'Payment/plan can be stopped/changed by informing one month in advance if not satisfied with the services.'),
(98, 194, 'Required details like credentials and other details are needed to share timely.'),
(99, 194, 'One dedicated SPOC (single point of contact) is required from the client side to approve the posts/contents/videos/website changes, etc.'),
(126, 194, 'chai'),
(160, 230, 'Payment will be 100% in advance and is expected till 3rd of every month.'),
(161, 230, 'One dedicated SPOC (single point of contact) is required from the client side to approve the posts/contents/videos/website changes, etc.'),
(162, 230, 'Estimated time for keywords ranking on the first page : -\n\n\n\n\n\nLow-competition keywords take 2-3 months,\nMedium competition Keywords take 3-5 months,\nHigh-competition Keywords take 6-9 months.\n'),
(163, 230, 'Suggested Ad Amount 20,000/-'),
(164, 231, 'Payment will be 100% in advance and is expected till 3rdsdd of every month.'),
(165, 231, 'sadOne dedicated SPOC (single point of contact) is required from the client side to approve the posts/contents/videos/website changes, etc.'),
(166, 231, 'sdsdEstimated time for keywords ranking on the first page : -\n\n\n\nLow-competition keywords take 2-3 months,\nMedium competition Keywords take 3-5 months,\nHigh-competition Keywords take 6-9 months.\n'),
(167, 231, 'Susdggested Ad Amount 20,000/-\njhjdff'),
(168, 232, 'Payment/plan can be stopped/changed by informing one month in advance if not satisfied with the services.'),
(169, 232, 'GST'),
(170, 243, 'Payment will be 100% in advance and is expected till 3rd of every month./'),
(171, 244, 'Payment will be 100% in advance and is expected till 3rd of every month./');

-- --------------------------------------------------------

--
-- Table structure for table `notes_data`
--

CREATE TABLE `notes_data` (
  `notes_id` int(200) NOT NULL,
  `notes_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(0, 'umerqureshidoaguru@gmail.com', 380494, NULL, '2024-12-26 07:55:58.223044');

-- --------------------------------------------------------

--
-- Table structure for table `quotations_data`
--

CREATE TABLE `quotations_data` (
  `quotation_id` int(11) NOT NULL,
  `quotation_name` varchar(255) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `employeeId` int(255) NOT NULL,
  `lead_id` int(11) NOT NULL,
  `employee_name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quotations_information`
--

CREATE TABLE `quotations_information` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `alternate_number` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `adhaar_number` varchar(12) DEFAULT NULL,
  `pan_number` varchar(10) DEFAULT NULL,
  `project_name` varchar(255) DEFAULT NULL,
  `unit_number` varchar(50) DEFAULT NULL,
  `dimension` varchar(50) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `variant` varchar(255) DEFAULT NULL,
  `total_deal` decimal(10,2) DEFAULT NULL,
  `booking_amount` decimal(10,2) DEFAULT NULL,
  `booking_amount_words` text DEFAULT NULL,
  `payment_mode` varchar(255) DEFAULT NULL,
  `finance_bank` varchar(255) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `balance_amount` decimal(10,2) DEFAULT NULL,
  `balance_amount_words` text DEFAULT NULL,
  `payment_due_date1` date DEFAULT NULL,
  `payment_due_date2` date DEFAULT NULL,
  `payment_due_date3` date DEFAULT NULL,
  `payment_due_date4` date DEFAULT NULL,
  `registry_charges` decimal(10,2) DEFAULT NULL,
  `p1p2_charges` decimal(10,2) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `employeeId` int(11) NOT NULL,
  `employee_name` varchar(255) NOT NULL,
  `lead_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(57, 'umer', 'umerqureshi786786@gmail.com', '$2b$10$Piho5XntAHKy9M3pKE0w5.UxJ3vldodzclf4kh9yJe6CBNk0U8fKq', 'Admin', 'NULL', '2024-12-26 07:37:55'),
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
(1, 1, '', 'Cement', '2024-12-27 08:11:28'),
(2, 1, '', 'Paints', '2024-12-27 08:11:28'),
(3, 2, '', 'Masonry', '2024-12-27 08:11:28'),
(4, 3, '', 'Tools', '2024-12-27 08:11:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_selections`
--

CREATE TABLE `user_selections` (
  `selection_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_selections`
--

INSERT INTO `user_selections` (`selection_id`, `user_id`, `item_id`, `quantity`, `total_price`, `created_at`) VALUES
(5, 58, 1, 10, 0.00, '2024-12-27 09:57:13'),
(6, 58, 4, 2, 0.00, '2024-12-27 09:57:13');

--
-- Triggers `user_selections`
--
DELIMITER $$
CREATE TRIGGER `calculate_total_price_before_insert` BEFORE INSERT ON `user_selections` FOR EACH ROW BEGIN
    DECLARE unit_price DECIMAL(10, 2);
    -- Fetch the unit price of the item being selected
    SELECT unit_price INTO unit_price FROM items WHERE item_id = NEW.item_id;
    -- Calculate the total price
    SET NEW.total_price = NEW.quantity * unit_price;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `calculate_total_price_before_update` BEFORE UPDATE ON `user_selections` FOR EACH ROW BEGIN
    DECLARE unit_price DECIMAL(10, 2);
    -- Fetch the updated unit price of the item
    SELECT unit_price INTO unit_price FROM items WHERE item_id = NEW.item_id;
    -- Recalculate the total price
    SET NEW.total_price = NEW.quantity * unit_price;
END
$$
DELIMITER ;

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
-- Indexes for table `user_selections`
--
ALTER TABLE `user_selections`
  ADD PRIMARY KEY (`selection_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `registered_data`
--
ALTER TABLE `registered_data`
  MODIFY `user_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `subcategory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_selections`
--
ALTER TABLE `user_selections`
  MODIFY `selection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  ADD CONSTRAINT `user_selections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `registered_data` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_selections_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
