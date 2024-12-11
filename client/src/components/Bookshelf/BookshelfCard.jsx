import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookshelfCard = ({ book, updateBookStatus }) => {
    const [fav, setFav] = useState(book.favourite);
    const [abd, setAbd] = useState(book.abandoned);
    const [showWindow, setShowWindow] = useState(false);
    const coverImagePath = book.cover
        ? `http://localhost:5000/covers/${book.cover}`
        : `http://localhost:5000/covers/default.png`;

    const progress = Math.floor((book.pagesRead / book.pages) * 100);
    const navigate = useNavigate();

    const toggleFavourite = async () => {
        const newFavouriteStatus = fav ? 0 : 1;
        setFav(!fav);
    
        try {
            await axios.put(`http://localhost:5000/api/update-favourite`, {
                bookshelfID: book.bookshelfID,
                favourite: newFavouriteStatus,
            });
            console.log('Status ulubionego został zaktualizowany.');
            updateBookStatus({ ...book, favourite: newFavouriteStatus });
        } catch (err) {
            console.error('Błąd podczas aktualizacji statusu ulubionego:', err);
        }
    };
    
    const toggleAbandoned = async () => {
        const newAbandonedStatus = abd ? 0 : 1;
        setAbd(!abd);

        try {
            await axios.put(`http://localhost:5000/api/update-abandoned`, {
                bookshelfID: book.bookshelfID,
                abandoned: newAbandonedStatus,
            });
            console.log('Status porzuconej książki został zaktualizowany.');
            updateBookStatus({ ...book, abandoned: newAbandonedStatus });
        } catch (err) {
            console.error('Błąd podczas aktualizacji statusu porzuconego:', err);
        }
    };

    const startSession = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/check-session/${book.bookshelfID}`);
            if (response.data.active) {
                navigate('/session');
            } else {
                await axios.post(`http://localhost:5000/api/start-session`, {
                    bookshelfID: book.bookshelfID,
                    bookID: book.id,
                    timeStart: new Date().toISOString(),
                });
                navigate('/session');
            }
        } catch (err) {
            console.error('Błąd podczas rozpoczynania sesji:', err);
        }
    };
    

    const handleContinue = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/current-session`);
            const sessionID = response.data.sessionID;

            await axios.put(`http://localhost:5000/api/end-session/${sessionID}`, {
                timeEnd: new Date().toISOString(),
                pagesRead: book.pagesRead,
            });

            await axios.post(`http://localhost:5000/api/start-session`, {
                bookshelfID: book.bookshelfID,
                timeStart: new Date().toISOString(),
            });

            setShowWindow(false);
            navigate('/session');
        } catch (err) {
            console.error('Błąd podczas zamykania i rozpoczynania nowej sesji:', err);
        }
    };

    const handleCancel = () => {
        setShowWindow(false);
    };

    return (
        <div className="bookshelfCard">
            <img src={coverImagePath} alt={`${book.title} cover`} className="bookshelfImage" />
            <div>
                <p><b>Tytuł:</b> {book.title}</p>
                <p><b>Autor:</b> {book.author}</p>
                <p><b>Postęp:</b> {progress}%</p>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <div className="bookshelfButtons">
                {book.finished !== 1 && (<button type="button" onClick={startSession}>Rozpocznij sesję</button>)}
                <div>
                <button type="button" className="bookshelfFunctionButton" onClick={toggleFavourite}>
                    {fav ? '❤︎' : '♡'}
                </button>
                <button type='button' className='bookshelfFunctionButton' onClick={() => toggleAbandoned()}>✖</button>
                </div>
            </div>
            {showWindow && (
                <div className="window">
                    <div className="window-content">
                        <p>Masz aktywną sesję. Czy chcesz ją zakończyć i rozpocząć nową?</p>
                        <button onClick={handleContinue}>Tak</button>
                        <button onClick={handleCancel}>Nie</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookshelfCard;
