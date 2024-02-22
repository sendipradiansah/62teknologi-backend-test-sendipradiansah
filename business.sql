-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2024 at 05:30 PM
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
-- Database: `business`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_business`
--

CREATE TABLE `tbl_business` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `is_closed` tinyint(1) NOT NULL,
  `categories` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `price` varchar(5) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_business`
--

INSERT INTO `tbl_business` (`id`, `name`, `is_closed`, `categories`, `location`, `latitude`, `longitude`, `price`, `phone`, `rating`) VALUES
('1e68811d-90ce-4c6d-addc-54e14ccf108d', 'NYC Buffet', 0, 'buffets', '4108 International Blvd And 42nd Ave', 37.773283, -122.216347, '$$', '+14157810894', 2.4),
('5eda221f-3686-4047-b1ba-d7708ee516ad', 'La Fusión', 1, 'latin', '475 Pine St', 37.7916357455614, -122.403691572642, '$$', '+14157810894', 4.4),
('d3e92192-41d2-4611-afe8-1016bc20e7e0', 'The Natural Mixologist', 0, 'bartenders', 'San Francisco', 37.78891, -122.39297, '', '+14242721331', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_business`
--
ALTER TABLE `tbl_business`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
