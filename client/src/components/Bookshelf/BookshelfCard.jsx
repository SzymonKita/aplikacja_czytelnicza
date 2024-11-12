import React, { useState } from 'react';
const BookshelfCard = ({ book, progress, favourite }) => {
    const [fav, setFav] = useState(favourite);
    const coverImagePath = `/covers/${book.id}.png`;
    const heartIcon = ['❤︎', '♡'];
    

    const toggleFavourite = () => {
        setFav(!fav);
        // TODO: Dodać zmianę w bazie danych statusu ulubionej książki
    };

    const toggleAbandoned = () => {
        // TODO: Dodać opuszczanie ksiażki w bazie danych
    }

    return (
        <div className='bookshelfCard'>
            <img src={coverImagePath} alt={`${book.title} cover`} className='bookshelfImage' />
            <div>
                <p><b>Tytuł: </b>{book.title}</p>
                <p><b>Autor: </b>{book.author}</p>
                <p><b>Wydawnictwo: </b>{book.publisher}</p>
                <p><b>Seria: </b>{book.series}</p>
                <p><b>Postęp: </b>{progress}%</p>
            </div>
            <div className='bookshelfButtons'>
                <button type='button'>Rozpocznij sesję</button>
                <div>
                    <button type='button' className='bookshelfFunctionButton' onClick={() => toggleFavourite()}>{fav ? '❤︎' : '♡'}</button>
                    <button type='button' className='bookshelfFunctionButton' onClick={() => toggleAbandoned()}>✖</button>
                </div>
            </div>
        </div>
    );
}

export default BookshelfCard