-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 15.165.132.219
-- 생성 시간: 24-05-28 03:11
-- 서버 버전: 10.3.39-MariaDB-0ubuntu0.20.04.2
-- PHP 버전: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `taikowiki`
--
CREATE DATABASE IF NOT EXISTS `taikowikiwiki` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `taikowikiwiki`;

-- --------------------------------------------------------

--
-- 테이블 구조 `diffchart`
--

CREATE TABLE `diffchart` (
  `order` int(11) NOT NULL,
  `name` text NOT NULL,
  `level` tinyint(4) DEFAULT NULL,
  `type` tinytext DEFAULT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `song`
--

CREATE TABLE `song` (
  `songNo` tinytext NOT NULL,
  `order` int(11) NOT NULL,
  `title` text NOT NULL,
  `titleKo` text DEFAULT NULL,
  `aliasKo` text DEFAULT NULL,
  `titleEn` text DEFAULT NULL,
  `aliasEn` text DEFAULT NULL,
  `bpm` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `bpmShiver` tinyint(1) NOT NULL,
  `version` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isAsiaBanned` tinyint(1) NOT NULL,
  `isKrBanned` tinyint(1) NOT NULL,
  `genre` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `artists` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `addedDate` bigint(20) NOT NULL,
  `courses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `user/basic_data`
--

CREATE TABLE `user/basic_data` (
  `order` int(11) NOT NULL,
  `provider` text NOT NULL,
  `providerId` text NOT NULL,
  `registerTime` bigint(20) NOT NULL,
  `grade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `user/data`
--

CREATE TABLE `user/data` (
  `order` int(11) NOT NULL,
  `provider` text NOT NULL,
  `providerId` text NOT NULL,
  `nickname` tinytext NOT NULL,
  `UUID` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `diffchart`
--
ALTER TABLE `diffchart`
  ADD PRIMARY KEY (`order`);

--
-- 테이블의 인덱스 `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`order`);

--
-- 테이블의 인덱스 `user/basic_data`
--
ALTER TABLE `user/basic_data`
  ADD PRIMARY KEY (`order`);

--
-- 테이블의 인덱스 `user/data`
--
ALTER TABLE `user/data`
  ADD PRIMARY KEY (`order`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `diffchart`
--
ALTER TABLE `diffchart`
  MODIFY `order` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `song`
--
ALTER TABLE `song`
  MODIFY `order` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `user/basic_data`
--
ALTER TABLE `user/basic_data`
  MODIFY `order` int(11) NOT NULL AUTO_INCREMENT;

--
-- 테이블의 AUTO_INCREMENT `user/data`
--
ALTER TABLE `user/data`
  MODIFY `order` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
