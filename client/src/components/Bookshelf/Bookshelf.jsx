import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation.jsx';
import FriendCard from '../FriendCard.jsx';
import BookshelfCard from './BookshelfCard.jsx';
import { AuthContext } from '../../AuthContext';
import './Bookshelf.css';

const Bookshelf = () => {
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState(null);

    const { userID } = useContext(AuthContext);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/bookshelf/${userID}`);
                setBooks(response.data);
            } catch (err) {
                console.error('Błąd podczas pobierania książek:', err);
                setError('Nie udało się pobrać książek z biblioteczki.');
            }
        };

        if (userID) {
            fetchBooks();
        }
    }, [userID, filter]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const updateBookStatus = async (updatedBook) => {
        setBooks(prevBooks =>
            prevBooks.map((book) =>
                book.ID === updatedBook.ID ? updatedBook : book
            )
        );
    };

    const filteredBooks = books.filter((book) => {
        if (filter === 'all') {
            return !book.Abandoned;
        }
        if (filter === 'favourite') {
            return book.Favourite;
        }
        if (filter === 'abandoned') {
            return book.Abandoned;
        }
        return true;
    });

    if (error) {
        return (
            <div>
                <Navigation title="Błąd" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
            <Navigation title="Biblioteczka" />
            <div className="container">
                <div className="content">
                    <div className="bookshelfFilter">
                        <span>Filtruj</span>
                        <select className="bookshelfSortBy" value={filter} onChange={handleFilterChange}>
                            <option value="all">Wszystkie</option>
                            <option value="favourite">Ulubione</option>
                            <option value="abandoned">Opuszczone</option>
                        </select>
                    </div>
                    {filteredBooks.map((book) => (
                        <BookshelfCard
                            key={book.ID}
                            book={{
                                id: book.ID,
                                bookshelfID: book.BookshelfID,
                                title: book.Title,
                                author: `${book.AuthorFirstName} ${book.AuthorLastName}`,
                                cover: book.Cover,
                                pages: book.Pages,
                                pagesRead: book.PagesRead,
                                favourite: book.Favourite,
                                abandoned: book.Abandoned
                            }}
                            updateBookStatus={updateBookStatus}
                        />
                    ))}
                </div>
                <div className="friendsList">
                    <FriendCard name='Kolega123' active={true} />
                    <FriendCard name='Ktoś987' active={false} />
                </div>
            </div>
        </>
    );
};

export default Bookshelf;
