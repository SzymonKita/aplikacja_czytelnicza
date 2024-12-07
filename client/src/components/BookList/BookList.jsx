import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation.jsx';
import FriendCard from '../FriendCard.jsx';
import Filter from './Filter.jsx';
import Book from '../Book.jsx';
import "./BookList.css";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Pobranie książek z API
        axios.get('http://localhost:5000/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania książek:', error);
            });
    }, []);

    return (
        <>
            <Navigation title="Lista książek" />
            <div className='container'>
                <div className='content'>
                    <div className='bookList'>
                        <Filter />
                        <div className='list'>
                            {books.map(book => (
                                <Book 
                                    key={book.ID} 
                                    id={book.ID} 
                                    title={book.Title} 
                                    author={`${book.AuthorFirstName} ${book.AuthorLastName}`} 
                                    cover={book.Cover}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Kolega123' active={true} />
                    <FriendCard name='Ktoś987' active={false} />
                </div>
            </div>
        </>
    );
}

export default BookList;
