import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation.jsx';
import FriendCard from '../FriendCard.jsx';
import Filter from './Filter.jsx';
import { Link } from "react-router-dom"
import Book from '../Book.jsx';
import "./BookList.css";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Pobranie książek z API
        axios.get('http://localhost:5000/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania książek:', error);
            });
        axios.get('http://localhost:5000/books/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania kategorii:', error);
            });
        axios.get('http://localhost:5000/books/authors')
            .then(response => {
                setAuthors(response.data);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania autorów:', error);
            });
    }, []);

    const filteredBooks = books.filter((book) => {
        const matchesAuthor = selectedAuthor ? book.AuthorFirstName + " " + book.AuthorLastName === selectedAuthor : true;
        const matchesCategory = selectedCategory ? book.Categories === selectedCategory : true;
        return matchesAuthor && matchesCategory;
    });

    console.log(filteredBooks)

    return (
        <>
            <Navigation title="Lista książek" />
            <div className='container'>
                <div className='content'>
                    <div className='bookList'>
                        <div className='filter'>
                            <h2>Filtry</h2>
                            <input type='text' placeholder='Wyszukaj...' />
                            <h3>Sortuj</h3>
                            <select name='sortBy'>
                                <option value='dateDecs'>Data wydania malejąco</option>
                                <option value='dateAsc'>Data wydania rosnąco</option>
                                <option value='readersDesc'>Liczba czytelników malejąco</option>
                                <option value='readersAcs'>Liczba czytelników rosnąco</option>
                            </select>
                            <h3>Kategorie</h3>
                            <button className="clearButton" onClick={() => setSelectedCategory('')}>Wyczyść kategorię</button>
                            <div className='categories'>
                                {categories.map(c => (
                                    <div className="categoryField">
                                        <input type="radio"
                                            id={c.Name}
                                            name="category"
                                            value={c.Name}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            checked={selectedCategory === c.Name}
                                        />
                                        <label for={c.Name}>{c.Name}</label>
                                    </div>
                                ))}
                            </div>
                            <h3>Autor</h3>
                            <button onClick={() => setSelectedAuthor('')}>Wyczyść autora</button>
                            <div className='categories'>
                                {authors.map(a => (
                                    <div className="categoryField">
                                        <input type="radio"
                                            id={a.FirstName + " " + a.LastName}
                                            name="author"
                                            value={a.FirstName + " " + a.LastName}
                                            onChange={(e) => setSelectedAuthor(e.target.value)}
                                            checked={selectedAuthor === a.FirstName + " " + a.LastName}
                                        />
                                        <label for={a.FirstName + " " + a.LastName}>{a.FirstName + " " + a.LastName}</label>
                                    </div>
                                ))}
                            </div>
                            <Link to='/suggestBook'><button className="suggestBookButton" type='button'>Zaproponuj nową książkę</button></Link>
                        </div>
                        <div className='list'>
                            {filteredBooks.map(book => (
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
