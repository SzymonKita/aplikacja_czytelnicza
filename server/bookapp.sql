-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sty 15, 2025 at 09:31 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookapp`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `achievement`
--

CREATE TABLE `achievement` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `author`
--

CREATE TABLE `author` (
  `ID` int(11) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`ID`, `FirstName`, `LastName`) VALUES
(1, 'George', 'Orwell'),
(2, 'J.K.', 'Rowling'),
(3, 'Isaac', 'Asimov'),
(4, 'Jane', 'Austen'),
(5, 'Stephen', 'King'),
(6, 'Agatha', 'Christie'),
(7, 'J.R.R.', 'Tolkien'),
(8, 'F. Scott', 'Fitzgerald'),
(9, 'Mark', 'Twain'),
(10, 'Arthur', 'Conan Doyle'),
(19, 'test', 'test'),
(22, 'kot', 'kot');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `book`
--

CREATE TABLE `book` (
  `ID` int(11) NOT NULL,
  `AuthorID` int(11) DEFAULT NULL,
  `PublisherID` int(11) DEFAULT NULL,
  `SeriesID` int(11) DEFAULT NULL,
  `Cover` varchar(255) DEFAULT NULL,
  `Pages` int(11) DEFAULT NULL,
  `Confirmed` tinyint(1) DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`ID`, `AuthorID`, `PublisherID`, `SeriesID`, `Cover`, `Pages`, `Confirmed`, `Title`, `ReleaseDate`, `Description`) VALUES
(1, 1, 1, 1, 'cover1.jpg', 350, 1, '1984', '2001-01-01', NULL),
(2, 2, 2, 2, 'cover2.jpg', 420, 1, 'Harry Potter and the Philosopher\'s Stone', '2002-02-02', NULL),
(3, 3, 3, NULL, 'cover3.jpg', 280, 1, 'Foundation', '2003-03-03', NULL),
(4, 4, 4, 3, 'cover4.jpg', 500, 1, 'Pride and Prejudice', '2004-04-04', NULL),
(5, 1, 1, NULL, 'cover5.jpg', 150, 1, 'Animal Farm', '2005-05-05', NULL),
(6, 5, 2, NULL, 'cover6.jpg', 320, 1, 'The Shining', '2006-06-06', NULL),
(7, 6, 3, 4, 'cover7.jpg', 410, 1, 'Murder on the Orient Express', '2007-07-07', NULL),
(8, 7, 4, 5, 'cover8.jpg', 390, 1, 'The Fellowship of the Ring', '2008-08-08', NULL),
(9, 8, 5, NULL, 'cover9.jpg', 200, 1, 'The Great Gatsby', '2009-09-09', NULL),
(10, 3, 2, 6, 'cover10.jpg', 340, 0, 'I, Robot', '2010-10-10', NULL),
(26, 22, 17, 16, '1731438989759-383566951.jpg', 1234, 1, 'kot', '2024-11-12', 'kici');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `bookcategory`
--

CREATE TABLE `bookcategory` (
  `BookID` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookcategory`
--

INSERT INTO `bookcategory` (`BookID`, `CategoryID`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 1),
(6, 3),
(7, 2),
(8, 1),
(9, 4),
(10, 3),
(10, 2),
(26, 4),
(26, 9);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `bookshelf`
--

CREATE TABLE `bookshelf` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `BookID` int(11) DEFAULT NULL,
  `Finished` tinyint(1) DEFAULT NULL,
  `Favourite` tinyint(1) DEFAULT NULL,
  `Abandoned` tinyint(1) DEFAULT NULL,
  `CustomPages` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookshelf`
--

INSERT INTO `bookshelf` (`ID`, `UserID`, `BookID`, `Finished`, `Favourite`, `Abandoned`, `CustomPages`) VALUES
(1, 1, 2, 0, 0, 0, 157),
(2, 1, 26, 1, 1, 0, 1234),
(3, 2, 8, 0, 0, 0, 111),
(5, 1, 7, 0, 0, 0, 0),
(6, 1, 8, 1, 1, 0, 390);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `Name`) VALUES
(1, 'Science Fiction'),
(2, 'Fantasy'),
(3, 'Mystery'),
(4, 'Romance'),
(5, 'Horror'),
(6, 'Historical Fiction'),
(7, 'Young Adult'),
(8, 'Non-Fiction'),
(9, 'Classic'),
(10, 'Biography');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `commentreactions`
--

CREATE TABLE `commentreactions` (
  `CommentID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Reaction` enum('Like','Dislike') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commentreactions`
--

INSERT INTO `commentreactions` (`CommentID`, `UserID`, `Reaction`) VALUES
(1, 1, 'Dislike'),
(2, 2, 'Like'),
(1, 2, 'Dislike');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `PostID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Detail` text DEFAULT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`ID`, `PostID`, `UserID`, `Detail`, `likes`, `dislikes`) VALUES
(1, 1, 2, 'Coś bym polecił ale nie wiem co', 0, 2),
(2, 1, 5, 'Ja też się nad tym zastanawiam, to podajcie jakieś ciekawe propozycje.', 1, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `friendlist`
--

CREATE TABLE `friendlist` (
  `RequesterID` int(11) NOT NULL,
  `AddresseeID` int(11) NOT NULL,
  `Confirmed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `post`
--

CREATE TABLE `post` (
  `ID` int(11) NOT NULL,
  `Title` text DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Detail` text DEFAULT NULL,
  `likes` int(11) DEFAULT 0,
  `dislikes` int(11) DEFAULT 0,
  `comments` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`ID`, `Title`, `UserID`, `Detail`, `likes`, `dislikes`, `comments`) VALUES
(1, 'Polecacie książki w klimacie fantasy?', 1, 'Cześć wszystkim! 😊 Ostatnio wciągnąłem się w literaturę fantasy i szukam nowych inspiracji. Bardzo spodobały mi się takie tytuły jak:\"Władca Pierścieni\" J.R.R. Tolkiena\"Koło Czasu\" Roberta Jordana \"Cień wiatru\" Carlosa Ruiza Zafóna (choć to bardziej realizm magiczny). Szukam książek z bogato wykreowanymi światami, ciekawymi bohaterami i intrygującą fabułą. Czy macie jakieś ulubione tytuły, które polecilibyście komuś, kto uwielbia zatapiać się w magicznych krainach?Z góry dziękuję za wszystkie propozycje! 🙌P.S. Mile widziane mniej znane perełki, które warto odkryć!', 3, 1, 30),
(2, 'Najlepsze książki z gatunku science fiction – co polecacie?', 2, 'Hej wszystkim! 👋Ostatnio wpadłem w totalny zachwyt nad science fiction i szukam kolejnych świetnych książek do przeczytania. Przykłady tytułów, które bardzo mi się podobały:\"Diuna\" Franka Herberta – za epicką skalę i polityczne intrygi.\"Koniec dzieciństwa\" Arthura C. Clarke`a – niesamowicie wizjonerska książka.\"Neuromancer\" Williama Gibsona – dla fanów cyberpunku coś genialnego.Chętnie poznam Wasze ulubione tytuły z tego gatunku. Interesuje mnie zarówno klasyka, jak i nowsze pozycje. Szczególnie zależy mi na książkach, które mają głębsze przesłanie albo przedstawiają złożone światy i technologie.Macie coś do polecenia? Dzięki z góry! 🚀', 0, 1, 19);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `postreactions`
--

CREATE TABLE `postreactions` (
  `PostID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Reaction` enum('Like','Dislike') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `postreactions`
--

INSERT INTO `postreactions` (`PostID`, `UserID`, `Reaction`) VALUES
(1, 5, 'Dislike'),
(1, 1, 'Like'),
(1, 6, 'Like'),
(2, 2, 'Dislike'),
(1, 2, 'Like');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `publisher`
--

CREATE TABLE `publisher` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publisher`
--

INSERT INTO `publisher` (`ID`, `Name`) VALUES
(1, 'Penguin Books'),
(2, 'HarperCollins'),
(3, 'Simon & Schuster'),
(4, 'Hachette Livre'),
(5, 'Macmillan Publishers'),
(6, 'Random House'),
(7, 'Scholastic Corporation'),
(8, 'Oxford University Press'),
(9, 'Cambridge University Press'),
(10, 'Bloomsbury Publishing'),
(14, 'test'),
(17, 'kot');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `quote`
--

CREATE TABLE `quote` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `BookID` int(11) DEFAULT NULL,
  `Detail` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `review`
--

CREATE TABLE `review` (
  `ID` int(11) NOT NULL,
  `BookID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Rating` int(11) DEFAULT NULL,
  `Detail` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `series`
--

CREATE TABLE `series` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`ID`, `Name`) VALUES
(1, 'Harry Potter'),
(2, 'The Lord of the Rings'),
(3, 'Sherlock Holmes'),
(4, 'Foundation'),
(5, 'Pride and Prejudice Series'),
(6, 'Game of Thrones'),
(7, 'The Chronicles of Narnia'),
(8, 'Discworld'),
(9, 'The Wheel of Time'),
(10, 'Percy Jackson'),
(14, 'test'),
(16, 'kot');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `session`
--

CREATE TABLE `session` (
  `ID` int(11) NOT NULL,
  `BookshelfID` int(11) DEFAULT NULL,
  `PagesRead` int(11) DEFAULT NULL,
  `TimeStart` datetime DEFAULT NULL,
  `TimeEnd` datetime DEFAULT NULL,
  `BookID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`ID`, `BookshelfID`, `PagesRead`, `TimeStart`, `TimeEnd`, `BookID`) VALUES
(45, 2, 12, '2024-11-20 11:03:58', '2024-11-20 11:04:00', 26),
(46, 1, 11, '2024-11-20 11:04:28', '2024-11-20 11:04:31', 2),
(50, 2, 10, '2024-11-20 12:10:29', '2024-11-20 12:10:40', 26),
(51, 2, 1, '2024-11-20 12:10:42', '2024-11-20 12:12:33', 26),
(52, 2, 1, '2024-11-20 12:12:35', '2024-11-20 12:12:36', 26),
(54, 2, 1, '2024-11-20 12:16:42', '2024-11-20 12:17:34', 26),
(55, 1, 1, '2024-11-20 12:17:36', '2024-11-20 12:17:38', 2),
(56, 2, 1, '2024-11-20 12:17:46', '2024-11-20 12:21:50', 26),
(57, 2, 1, '2024-11-20 12:21:56', '2024-11-20 12:22:00', 26),
(58, 2, 1, '2024-11-20 13:37:53', '2024-11-20 13:37:56', 26),
(59, 2, 0, '2024-11-20 13:38:42', '2024-11-20 13:39:28', 26),
(61, 2, 1, '2024-11-20 13:48:55', '2024-11-20 13:49:23', 26),
(62, 2, 1, '2024-11-20 15:01:50', '2024-11-20 15:02:00', 26),
(63, 3, 11, '2024-12-04 12:52:29', '2024-12-04 12:52:32', 8),
(64, 2, 135, '2024-12-11 03:46:15', '2024-12-11 03:53:21', 26),
(65, 2, 1, '2024-12-11 03:53:26', '2024-12-11 03:55:29', 26),
(66, 1, 1, '2024-12-11 03:55:17', '2024-12-11 03:55:21', 2),
(68, 2, 10, '2024-12-11 03:56:18', '2024-12-11 03:56:24', 26),
(69, 2, 13, '2024-12-11 04:08:24', '2024-12-11 04:08:31', 26),
(70, 2, 1, '2024-12-11 04:08:34', '2024-12-11 04:08:38', 26),
(71, 2, 1, '2024-12-11 04:10:08', '2024-12-11 04:10:11', 26),
(72, 1, 11, '2024-12-12 14:11:24', '2024-12-12 14:11:27', 2),
(73, 1, 12, '2025-01-05 03:38:20', '2025-01-05 03:38:42', 2),
(74, 1, 1, '2025-01-05 03:42:16', '2025-01-05 03:42:23', 2),
(75, 1, 13, '2025-01-05 03:42:32', '2025-01-05 03:42:42', 2),
(76, 1, 2, '2025-01-05 03:46:47', '2025-01-05 03:47:31', 2),
(77, 1, 1, '2025-01-05 03:48:12', '2025-01-05 03:48:32', 2),
(78, 1, 2, '2025-01-05 03:50:40', '2025-01-05 03:50:46', 2),
(79, 1, 1, '2025-01-05 03:51:06', '2025-01-05 03:51:21', 2),
(80, 1, 1, '2025-01-05 03:54:41', '2025-01-05 03:54:49', 2),
(81, 5, 400, '2025-01-06 03:03:35', '2025-01-06 03:03:43', 7),
(82, 6, 200, '2025-01-06 03:14:57', '2025-01-06 03:15:10', 8),
(83, 6, 12, '2025-01-06 03:53:07', '2025-01-06 03:53:28', 8),
(84, 6, 12, '2025-01-06 03:55:06', '2025-01-06 03:55:11', 8),
(85, 6, 16, '2025-01-06 03:57:58', '2025-01-06 03:58:02', 8),
(86, 6, 150, '2025-01-06 04:12:38', '2025-01-06 04:12:44', 8);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `statistics`
--

CREATE TABLE `statistics` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ReadingSpeed` float DEFAULT NULL,
  `TotalTime` float DEFAULT NULL,
  `TotalPagesRead` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`ID`, `UserID`, `ReadingSpeed`, `TotalTime`, `TotalPagesRead`) VALUES
(1, 1, 132.017, 13.8155, 178),
(2, 2, 0, 0, 0),
(3, 5, 0, 0, 0),
(4, 6, 0, 0, 0),
(5, 7, 0, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `Activated` tinyint(1) DEFAULT NULL,
  `Admin` tinyint(1) DEFAULT NULL,
  `Status` enum('active','inactive') DEFAULT NULL,
  `LastOnline` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `login`, `password`, `email`, `Activated`, `Admin`, `Status`, `LastOnline`) VALUES
(1, 'test', '$2b$10$PXB.TaZvAfm8Izx/3qMFxe8T9dAV63EEGxRVQuKoMBAjy.teqSzY6', 'test@test.pl', 1, 0, 'active', '2024-11-03 23:42:09'),
(2, 'admin', '$2b$10$IMMv4eFJTGB1.vCbsUGuou7inKXRek4jVPFtaPZITi.uoXV0oGD/6', 'admin@admin', 1, 1, 'active', '2024-11-19 01:08:53'),
(5, 'Gucio', '$2b$10$Dh7riw5332u5q5T6bd9pauFu6jenmMobnPOjPZXFaGRt8MrK7smUS', 'gutek@witek.pl', 1, 0, 'active', '2025-01-05 05:13:00'),
(6, 'AmonRa', '$2b$10$jiSL9KigIMvQVxcIUlAnZe7KY/m8820tNg8kphKo9KgJdt0bQoYh6', 'mammon@git.pl', 1, 0, 'active', '2025-01-05 05:14:45'),
(7, 'asdasd', '$2b$10$iGDhBD6zif94y3OoWxZOe.IS9Vatdq82pW4XoOpcKxA/bop./WKlq', 'asdasd@asd', 1, 0, 'active', '2025-01-06 03:38:16');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `achievement`
--
ALTER TABLE `achievement`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `AuthorID` (`AuthorID`),
  ADD KEY `PublisherID` (`PublisherID`),
  ADD KEY `SeriesID` (`SeriesID`);

--
-- Indeksy dla tabeli `bookcategory`
--
ALTER TABLE `bookcategory`
  ADD KEY `BookID` (`BookID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indeksy dla tabeli `bookshelf`
--
ALTER TABLE `bookshelf`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `BookID` (`BookID`);

--
-- Indeksy dla tabeli `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `commentreactions`
--
ALTER TABLE `commentreactions`
  ADD KEY `CommentID` (`CommentID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PostID` (`PostID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `friendlist`
--
ALTER TABLE `friendlist`
  ADD PRIMARY KEY (`RequesterID`,`AddresseeID`),
  ADD KEY `AddresseeID` (`AddresseeID`);

--
-- Indeksy dla tabeli `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `postreactions`
--
ALTER TABLE `postreactions`
  ADD KEY `PostID` (`PostID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `quote`
--
ALTER TABLE `quote`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `BookID` (`BookID`);

--
-- Indeksy dla tabeli `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `BookID` (`BookID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `BookshelfID` (`BookshelfID`),
  ADD KEY `fk_session_book` (`BookID`);

--
-- Indeksy dla tabeli `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievement`
--
ALTER TABLE `achievement`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `bookshelf`
--
ALTER TABLE `bookshelf`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `publisher`
--
ALTER TABLE `publisher`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `quote`
--
ALTER TABLE `quote`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `series`
--
ALTER TABLE `series`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`AuthorID`) REFERENCES `author` (`ID`),
  ADD CONSTRAINT `book_ibfk_2` FOREIGN KEY (`PublisherID`) REFERENCES `publisher` (`ID`),
  ADD CONSTRAINT `book_ibfk_4` FOREIGN KEY (`SeriesID`) REFERENCES `series` (`ID`);

--
-- Constraints for table `bookcategory`
--
ALTER TABLE `bookcategory`
  ADD CONSTRAINT `bookcategory_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `book` (`ID`),
  ADD CONSTRAINT `bookcategory_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`ID`);

--
-- Constraints for table `bookshelf`
--
ALTER TABLE `bookshelf`
  ADD CONSTRAINT `bookshelf_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `bookshelf_ibfk_2` FOREIGN KEY (`BookID`) REFERENCES `book` (`ID`);

--
-- Constraints for table `commentreactions`
--
ALTER TABLE `commentreactions`
  ADD CONSTRAINT `commentreactions_ibfk_1` FOREIGN KEY (`CommentID`) REFERENCES `comments` (`ID`),
  ADD CONSTRAINT `commentreactions_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `post` (`ID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `friendlist`
--
ALTER TABLE `friendlist`
  ADD CONSTRAINT `friendlist_ibfk_1` FOREIGN KEY (`RequesterID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `friendlist_ibfk_2` FOREIGN KEY (`AddresseeID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `postreactions`
--
ALTER TABLE `postreactions`
  ADD CONSTRAINT `postreactions_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `post` (`ID`),
  ADD CONSTRAINT `postreactions_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `quote`
--
ALTER TABLE `quote`
  ADD CONSTRAINT `quote_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `quote_ibfk_2` FOREIGN KEY (`BookID`) REFERENCES `book` (`ID`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `book` (`ID`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `fk_session_book` FOREIGN KEY (`BookID`) REFERENCES `book` (`ID`),
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`BookshelfID`) REFERENCES `bookshelf` (`ID`);

--
-- Constraints for table `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
