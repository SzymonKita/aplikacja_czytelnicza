import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BookshelfCard = ({ book }) => {
    const [fav, setFav] = useState(book.favourite);
    const coverImagePath = `/covers/${book.id}.png`;
    const progress = Math.round(((book.pagesRead / book.pages) * 100));

    const [showWindow, setShowWindow] = useState(false);
    const navigate = useNavigate();


    const toggleFavourite = () => {
        setFav(!fav);
        // TODO: Dodać zmianę w bazie danych statusu ulubionej książki
    };

    const toggleAbandoned = () => {
        // TODO: Dodać statusu opuszczania ksiażki w bazie danych
    }

    const startSession = () => {
        // TODO: sprawdzenie czy użytkownik ma już rozpoczętą sesję
        const isSessionActive = true;
        if (isSessionActive) {
            setShowWindow(true);
        } else {
            // TODO: rozpoczęcie nowej sesji
            const timeStart = Date.now()
            navigate("/session");
        }
    }

    const handleContinue = () => {
        setShowWindow(false);
        navigate("/session");
        // TODO: zamknięcie aktualnie trwającej sesji i rozpoczęcie nowej
    };

    const handleShow = () => {
        navigate("/session");
    }

    const handleCancel = () => {
        setShowWindow(false);
    };

    return (
        <div className='bookshelfCard'>
            <img src={coverImagePath} alt={`${book.title} cover`} className='bookshelfImage' />
            <div>
                <p><b>Tytuł: </b>{book.title}</p>
                <p><b>Autor: </b>{book.author}</p>
                <p><b>Wydawnictwo: </b>{book.publisher}</p>
                <p><b>Seria: </b>{book.series}</p>
                <p><b>Postęp: </b>{progress}%</p>
                <p>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                </p>
            </div>
            <div className='bookshelfButtons'>
                <button type='button' onClick={() => startSession()}>Rozpocznij sesję</button>
                <div>
                    <button type='button' className='bookshelfFunctionButton' onClick={() => toggleFavourite()}>{fav ? '❤︎' : '♡'}</button>
                    <button type='button' className='bookshelfFunctionButton' onClick={() => toggleAbandoned()}>✖</button>
                </div>
            </div>
            {showWindow && (
                <div className="window">
                    <div className="window-content">
                        <p>Posiadasz aktualnie rozpoczętą sesje. Czy chcesz ją zamknąć i rozpocząć nową?</p>
                        <button onClick={() => handleContinue()}>Rozpocznij nową</button>
                        <button onClick={() => handleShow()}>Weź mnie do sesji</button>
                        <button onClick={() => handleCancel()}>Anuluj</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookshelfCard