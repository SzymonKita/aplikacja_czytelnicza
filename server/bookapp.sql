USE BookApp;

-- Tabela User
CREATE TABLE User (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    Activated BOOL,
    Admin BOOL,
    Status ENUM('active', 'inactive'),
    LastOnline DATETIME
);

-- Tabela FriendList
CREATE TABLE FriendList (
    RequesterID INT,
    AddresseeID INT,
    Confirmed BOOL,
    PRIMARY KEY (RequesterID, AddresseeID),
    FOREIGN KEY (RequesterID) REFERENCES User(ID),
    FOREIGN KEY (AddresseeID) REFERENCES User(ID)
);

-- Tabela Post
CREATE TABLE Post (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Title TEXT,
    UserID INT,
    Detail TEXT,
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

-- Tabela Comments
CREATE TABLE Comments (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    PostID INT,
    UserID INT,
    Detail TEXT,
    FOREIGN KEY (PostID) REFERENCES Post(ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

-- Tabela Statistics
CREATE TABLE Statistics (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ReadingSpeed FLOAT,
    TotalTime FLOAT,
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

-- Tabela Achievement
CREATE TABLE Achievement (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50),
    Description VARCHAR(255)
);

-- Tabela Review
CREATE TABLE Review (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    BookID INT,
    UserID INT,
    Rating INT,
    Detail TEXT,
    FOREIGN KEY (BookID) REFERENCES Book(ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

-- Tabela Quote
CREATE TABLE Quote (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    BookID INT,
    Detail TEXT,
    FOREIGN KEY (UserID) REFERENCES User(ID),
    FOREIGN KEY (BookID) REFERENCES Book(ID)
);

-- Tabela Bookshelf
CREATE TABLE Bookshelf (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    BookID INT,
    Finished BOOL,
    Favourite BOOL,
    Abandoned BOOL,
    CustomPages INT,
    FOREIGN KEY (UserID) REFERENCES User(ID),
    FOREIGN KEY (BookID) REFERENCES Book(ID)
);

-- Tabela Session
CREATE TABLE Session (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    BookshelfID INT,
    PagesRead INT,
    TimeStart DATETIME,
    TimeEnd DATETIME,
    FOREIGN KEY (BookshelfID) REFERENCES Bookshelf(ID)
);

-- Tabela Author
CREATE TABLE Author (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50)
);

-- Tabela Publisher
CREATE TABLE Publisher (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100)
);

-- Tabela Category
CREATE TABLE Category (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50)
);

-- Tabela Series
CREATE TABLE Series (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50)
);

-- Tabela Book
CREATE TABLE Book (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    AuthorID INT,
    PublisherID INT,
    CategoryID INT,
    SeriesID INT,
    Cover VARCHAR(255),
    Pages INT,
    Confirmed BOOL,
    FOREIGN KEY (AuthorID) REFERENCES Author(ID),
    FOREIGN KEY (PublisherID) REFERENCES Publisher(ID),
    FOREIGN KEY (CategoryID) REFERENCES Category(ID),
    FOREIGN KEY (SeriesID) REFERENCES Series(ID)
);
