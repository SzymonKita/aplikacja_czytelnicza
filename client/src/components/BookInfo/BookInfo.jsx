import Navigation from '../Navigation/Navigation.jsx';
import FriendCard from '../FriendCard.jsx';
import RatingForm from './RatingForm.jsx';
import RatingComment from './RatingComment.jsx';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./BookInfo.css";

const BookInfo = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/books/${id}`);
                const data = await response.json();
                
                if (response.ok) {
                    setBook(data);
                } else {
                    throw new Error(data.error || 'Błąd podczas pobierania danych o książce');
                }
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        };

        fetchBook();
    }, [id]);

    if (error) {
        return <Navigation title="Błąd" />;
    }

    if (!book) {
        return <Navigation title="Ładowanie książki..." />;
    }

    // Construct the path to the cover image
    const coverImagePath = `http://localhost:5000/covers/${book.Cover}`;

    const releaseDate = new Date(book.ReleaseDate).toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const categoriesList = book.Categories ? book.Categories.split(', ') : ['Brak kategorii'];

    return (
        <>
            <Navigation title={book.Title} />
            <div className='container'>
                <div className='content'>
                    <div className='bookInfo'>
                        <div className='col'>
                            {/* Display the cover image */}
                            <img src={coverImagePath} alt={`${book.Title} cover`} className='coverImage' />
                            <p style={{ fontSize: '2em' }}>Dodaj do biblioteczki +</p>
                            <p>
                                <b>Średnia ocen</b><br />
                                0/5
                            </p>
                        </div>
                        <div className='col'>
                            <p style={{ textAlign: 'start' }}>
                                <b>Autor:</b> {book.AuthorFirstName} {book.AuthorLastName}  <br />
                                <b>Wydawnictwo:</b> {book.Publisher} <br />
                                <b>Seria:</b> {book.Series || 'Brak serii'} <br />
                                <b>Data wydania:</b> {releaseDate} <br />
                                <b>Kategorie:</b> {categoriesList.map((category, index) => (
                                    <span key={index}>{category}{index < categoriesList.length - 1 ? ', ' : ''}</span>
                                ))} <br />
                            </p>
                            <p>{book.Description || 'Brak opisu'}</p>
                        </div>
                    </div>
                    <h2>Recenzje</h2>
                    <RatingForm />
                    <RatingComment rating='4' />
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    );
};

export default BookInfo;
