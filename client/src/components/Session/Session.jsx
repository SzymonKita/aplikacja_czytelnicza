import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import './Session.css'

const Session = () => {
    // TODO: Dodać sprawdzanie informacji o sesji dla danego użytkownika i pobrania odpowiednich informacji
    const sessionInfo = { id: 1, title: 'Book1', author: 'Author 1', pages: 200, pagesRead: 57 }
    const progress = Math.round(((sessionInfo.pagesRead / sessionInfo.pages) * 100));

    const [number, setNumber] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const num = parseInt(number, 10);

        if (num <= 0) {
            alert('Liczba przeczytanych stron musi być większa od 0');
        } else {
            // TODO: zapis zakończonej sesji do bazy danych
            navigate('/bookshelf');
            const timeFinish = Date.now()
            //TODO: obliczenie czasu trwania sesji na podstawie czasu rozpoczęcia i zakończenia
        }
    };

    return (
        <>
            <Navigation title="Sesja czytania" />
            <div className='container'>
                <div className='content'>
                    <div className='session'>
                        <img src={`/covers/${sessionInfo.id}.png`} alt={`${sessionInfo.title} cover`} className='sessionImage' />
                        <div>
                            <p><b>Tytuł: </b>{sessionInfo.title}</p>
                            <p><b>Autor: </b>{sessionInfo.author}</p>
                            <p><b>Twój postęp: </b>{progress}% <br />{sessionInfo.pagesRead} z {sessionInfo.pages} stron</p>
                            <form onSubmit={handleSubmit}>
                                <h2>Zakończenie sesji</h2>
                                Podaj liczbę stron <input type='number' required value={number} onChange={handleChange}/> <br />
                                <button type='submit' id='numberOfPages'>Zakończ sesję</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default Session