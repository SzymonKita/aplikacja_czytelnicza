import FriendCard from '../FriendCard.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import React, { useContext, useEffect, useState } from 'react';
import AcceptBookCard from './AcceptBookCard.jsx';
import { AuthContext } from '../../AuthContext'; // Import AuthContext
import axios from 'axios';
import './AcceptBook.css';

const AcceptBook = () => {
    const { isAdmin } = useContext(AuthContext);
    const [acceptBooks, setAcceptBooks] = useState([]);

    // Wczytaj dane książek z backendu
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/books/pending'); // Endpoint dla książek do akceptacji
                console.log(response.data);
                setAcceptBooks(response.data);
            } catch (error) {
                console.error('Błąd podczas wczytywania książek:', error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <>
            <Navigation title="Lista książek do akceptacji" />
            <div className='container'>
                <div className='content'>
                    {isAdmin ? (
                        <div>
                            {acceptBooks.map((book) => (
                                <AcceptBookCard key={book.ID}
                                book={{
                                    id: book.ID,
                                    title: book.Title,
                                    author: `${book.AuthorFirstName} ${book.AuthorLastName}`,
                                    cover: book.Cover,
                                    pages: book.Pages,
                                    pagesRead: book.PagesRead,
                                    favourite: book.Favourite,
                                    abandoned: book.Abandoned,
                                    description: book.Description,
                                    publisher: book.Publisher,
                                    series: book.Series
                                }}/>
                            ))}
                        </div>
                    ) : (
                        <p>Musisz mieć uprawniena administatora, żeby zobaczyć tą stronę.</p>
                    )}
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    );
};

export default AcceptBook;
