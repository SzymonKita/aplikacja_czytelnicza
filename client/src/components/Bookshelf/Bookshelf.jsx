import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import BookshelfCard from './BookshelfCard.jsx'
import './Bookshelf.css'

const Bookshelf = () => {
    //TODO: Add getting data form database for the books and their information for progress and favurite state
    const books = [
        { id: 1, title: 'Book1', author: 'Author1', publisher: 'Publisher1', series: 'Series1', releaseDate: '11.11.1111', categories: 'Category1', description: 'Description1', pages: 200, pagesRead: 57, favourite: true, abandoned: false },
        { id: 1, title: 'Book1', author: 'Author1', publisher: 'Publisher1', series: 'Series1', releaseDate: '11.11.1111', categories: 'Category1', description: 'Description1', pages: 200, pagesRead: 57, favourite: true, abandoned: false },
        { id: 2, title: 'Book2', author: 'Author2', publisher: 'Publisher2', series: 'Series2', releaseDate: '22.22.2222', categories: 'Category2', description: 'Description2', pages: 100, pagesRead: 8, favourite: false, abandoned: false },
        { id: 3, title: 'Opuszczona', author: 'Author3', publisher: 'Publisher3', series: 'Series3', releaseDate: '33.33.3333', categories: 'Category3', description: 'Description3', pages: 100, pagesRead: 0, favourite: false, abandoned: true },
        { id: 3, title: 'Opuszczona', author: 'Author3', publisher: 'Publisher3', series: 'Series3', releaseDate: '33.33.3333', categories: 'Category3', description: 'Description3', pages: 100, pagesRead: 0, favourite: false, abandoned: true },
    ];

    const [filter, setFilter] = useState('inProggres');

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filterBooks = books.filter(book => {
        if (filter === 'abandoned') {
            return book.abandoned
        }
        if (filter === 'inProggres') {
            return !book.abandoned
        }
        if (filter === 'favourite') {
            return book.favourite
        }
        return false
    }
    );

    return (
        <>
            <Navigation title="Biblioteczka" />
            <div className='container'>
                <div className='content'>
                    <div className='bookshelfFilter'>
                        Filtruj
                        <select className='bookshelfSortBy' value={filter} onChange={handleFilterChange}>
                            <option value='favourite'>Ulubione</option>
                            <option value='inProggres'>W trakcie czytania</option>
                            <option value='abandoned'>Opuszczone</option>
                        </select>
                    </div>
                    {
                        filterBooks.map((book) => (
                            <BookshelfCard book={book} />
                        ))};
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default Bookshelf