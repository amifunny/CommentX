-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2020 at 08:01 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `commentx`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment_table`
--

CREATE TABLE `comment_table` (
  `c_id` int(11) NOT NULL,
  `c_text` varchar(1000) NOT NULL,
  `c_username` varchar(500) NOT NULL,
  `c_url` varchar(4000) NOT NULL,
  `c_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `c_vote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notif_table`
--

CREATE TABLE `notif_table` (
  `m_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  `m_type` tinyint(4) NOT NULL,
  `m_user` varchar(500) NOT NULL,
  `m_votes` int(11) NOT NULL DEFAULT '0',
  `m_read` tinyint(1) NOT NULL DEFAULT '0',
  `m_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment_table`
--
ALTER TABLE `comment_table`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `notif_table`
--
ALTER TABLE `notif_table`
  ADD PRIMARY KEY (`m_id`),
  ADD UNIQUE KEY `c_id_2` (`c_id`,`m_type`,`m_user`),
  ADD UNIQUE KEY `comb_index` (`c_id`,`m_type`,`m_user`),
  ADD KEY `c_id_3` (`c_id`),
  ADD KEY `m_user` (`m_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment_table`
--
ALTER TABLE `comment_table`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `notif_table`
--
ALTER TABLE `notif_table`
  MODIFY `m_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
