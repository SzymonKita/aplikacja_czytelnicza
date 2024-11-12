-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 12 Lis 2024, 20:53
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `bookapp`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `achievement`
--

CREATE TABLE `achievement` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `author`
--

CREATE TABLE `author` (
  `ID` int(11) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `author`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `book`
--

INSERT INTO `book` (`ID`, `AuthorID`, `PublisherID`, `SeriesID`, `Cover`, `Pages`, `Confirmed`, `Title`, `ReleaseDate`, `Description`) VALUES
(1, 1, 1, 1, 'cover1.jpg', 350, 1, '1984', '2001-01-01', NULL),
(2, 2, 2, 2, 'cover2.jpg', 420, 1, 'Harry Potter and the Philosopher\'s Stone', '2002-02-02', NULL),
(3, 3, 3, NULL, 'cover3.jpg', 280, 1, 'Foundation', '2003-03-03', NULL),
(4, 4, 4, 3, 'cover4.jpg', 500, 0, 'Pride and Prejudice', '2004-04-04', NULL),
(5, 1, 1, NULL, 'cover5.jpg', 150, 1, 'Animal Farm', '2005-05-05', NULL),
(6, 5, 2, NULL, 'cover6.jpg', 320, 1, 'The Shining', '2006-06-06', NULL),
(7, 6, 3, 4, 'cover7.jpg', 410, 0, 'Murder on the Orient Express', '2007-07-07', NULL),
(8, 7, 4, 5, 'cover8.jpg', 390, 1, 'The Fellowship of the Ring', '2008-08-08', NULL),
(9, 8, 5, NULL, 'cover9.jpg', 200, 1, 'The Great Gatsby', '2009-09-09', NULL),
(10, 3, 2, 6, 'cover10.jpg', 340, 1, 'I, Robot', '2010-10-10', NULL),
(26, 22, 17, 16, '1731438989759-383566951.jpg', 1234, 1, 'kot', '2024-11-12', 'kici');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `bookcategory`
--

CREATE TABLE `bookcategory` (
  `BookID` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `bookcategory`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `category`
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
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `PostID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Detail` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `friendlist`
--

CREATE TABLE `friendlist` (
  `RequesterID` int(11) NOT NULL,
  `AddresseeID` int(11) NOT NULL,
  `Confirmed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `post`
--

CREATE TABLE `post` (
  `ID` int(11) NOT NULL,
  `Title` text DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Detail` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `publisher`
--

CREATE TABLE `publisher` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `publisher`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `series`
--

CREATE TABLE `series` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `series`
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
  `TimeEnd` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `statistics`
--

CREATE TABLE `statistics` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ReadingSpeed` float DEFAULT NULL,
  `TotalTime` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`ID`, `login`, `password`, `email`, `Activated`, `Admin`, `Status`, `LastOnline`) VALUES
(1, 'test', '$2b$10$PXB.TaZvAfm8Izx/3qMFxe8T9dAV63EEGxRVQuKoMBAjy.teqSzY6', 'test@test.pl', 1, 0, 'active', '2024-11-03 23:42:09');

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
  ADD KEY `BookshelfID` (`BookshelfID`);

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
-- AUTO_INCREMENT dla tabel zrzutów
--

--
-- AUTO_INCREMENT dla tabeli `achievement`
--
ALTER TABLE `achievement`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `author`
--
ALTER TABLE `author`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT dla tabeli `book`
--
ALTER TABLE `book`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT dla tabeli `bookshelf`
--
ALTER TABLE `bookshelf`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT dla tabeli `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `post`
--
ALTER TABLE `post`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `publisher`
--
ALTER TABLE `publisher`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT dla tabeli `quote`
--
ALTER TABLE `quote`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `review`
--
ALTER TABLE `review`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `series`
--
ALTER TABLE `series`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT dla tabeli `session`
--
ALTER TABLE `session`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `statistics`
--
ALTER TABLE `statistics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`AuthorID`) REFERENCES `author` (`ID`),
  ADD CONSTRAINT `book_ibfk_2` FOREIGN KEY (`PublisherID`) REFERENCES `publisher` (`ID`),
  ADD CONSTRAINT `book_ibfk_4` FOREIGN KEY (`SeriesID`) REFERENCES `series` (`ID`);

--
-- Ograniczenia dla tabeli `bookcategory`
--
ALTER TABLE `bookcategory`
  ADD CONSTRAINT `bookcategory_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `book` (`ID`),
  ADD CONSTRAINT `bookcategory_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`ID`);

--
-- Ograniczenia dla tabeli `bookshelf`
--
ALTER TABLE `bookshelf`
  ADD CONSTRAINT `bookshelf_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `bookshelf_ibfk_2` FOREIGN KEY (`BookID`) REFERENCES `book` (`ID`);

--
-- Ograniczenia dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `post` (`ID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Ograniczenia dla tabeli `friendlist`
--
ALTER TABLE `friendlist`
  ADD CONSTRAINT `friendlist_ibfk_1` FOREIGN KEY (`RequesterID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `friendlist_ibfk_2` FOREIGN KEY (`AddresseeID`) REFERENCES `user` (`ID`);

--
-- Ograniczenia dla tabeli `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Ograniczenia dla tabeli `quote`
--
ALTER TABLE `quote`
  ADD CONSTRAINT `quote_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `quote_ibfk_2` FOREIGN KEY (`BookID`) REFERENCES `book` (`ID`);

--
-- Ograniczenia dla tabeli `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `book` (`ID`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);

--
-- Ograniczenia dla tabeli `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`BookshelfID`) REFERENCES `bookshelf` (`ID`);

--
-- Ograniczenia dla tabeli `statistics`
--
ALTER TABLE `statistics`
  ADD CONSTRAINT `statistics_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
