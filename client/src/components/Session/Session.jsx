import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../Navigation/Navigation.jsx';
import FriendCard from '../FriendCard.jsx';
import { AuthContext } from '../../AuthContext';
import './Session.css';

const Session = () => {
    const [sessionInfo, setSessionInfo] = useState(null);
    const [number, setNumber] = useState('');
    const [timeStart, setTimeStart] = useState(null);
    const navigate = useNavigate();
    const { userID } = useContext(AuthContext);
    
    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/current-session/${userID}`);
                console.log('Odpowiedź z backendu:', response.data);
                setSessionInfo(response.data);
                setTimeStart(Date.now())
            } catch (error) {
                console.error('Błąd podczas pobierania danych sesji:', error);
                if (error.response) {
                    console.error('Szczegóły odpowiedzi:', error.response.data);
                } else {
                    console.error('Treść błędu:', error.message);
                }
                alert('Nie udało się pobrać informacji o sesji.');
                navigate('/bookshelf');
            }
        };
        

        fetchSessionData();
    }, [navigate]);

    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const num = parseInt(number, 10);

        if (num < 0) {
            alert('Liczba przeczytanych stron nie może być ujemna');
            return;
        }

        if (sessionInfo.pagesRead + num > sessionInfo.pages) {
            alert('Nie możesz przeczytać więcej stron, niż zawiera książka.');
            return;
        }

        const timeEnd = Date.now();

        try {
            await axios.post('http://localhost:5000/api/sessions', {
                bookshelfID: sessionInfo.bookshelfID,
                pagesRead: num,
                timeStart: timeStart,
                timeEnd: timeEnd,
            });

            navigate('/bookshelf');
        } catch (error) {
            console.error('Błąd podczas zapisywania sesji:', error);
            alert('Nie udało się zakończyć sesji. Spróbuj ponownie.');
        }
    };

    if (!sessionInfo) {
        return <p>Ładowanie danych sesji...</p>;
    }

    const progress = Math.round(((sessionInfo.pagesRead / sessionInfo.pages) * 100));

    return (
        <>
            <Navigation title="Sesja czytania" />
            <div className='container'>
                <div className='content'>
                    <div className='session'>
                        <img
                            src={`http://localhost:5000/covers/${sessionInfo.cover}`}
                            alt={`${sessionInfo.title} cover`}
                            className='sessionImage'
                        />
                        <div>
                            <p><b>Tytuł: </b>{sessionInfo.title}</p>
                            <p><b>Autor: </b>{sessionInfo.author}</p>
                            <p>
                                <b>Twój postęp: </b>
                                {progress}% <br />
                                {sessionInfo.pagesRead} z {sessionInfo.pages} stron
                            </p>
                            <form onSubmit={handleSubmit}>
                                <h2>Zakończenie sesji</h2>
                                Podaj liczbę stron{' '}
                                <input
                                    type='number'
                                    required
                                    value={number}
                                    onChange={handleChange}
                                />
                                <br />
                                <button type='submit' id='numberOfPages'>
                                    Zakończ sesję
                                </button>
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
    );
};

export default Session;
