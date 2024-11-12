import FriendCard from '../FriendCard.jsx'
import Navigation from '../Navigation/Navigation.jsx'
import ImageDropZone from './ImageDropZone.jsx'
import './SuggestBook.css'
import React, { useState } from 'react';
import Select from 'react-select';
const SuggestBook = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'przygodowa', label: 'Przygodowa' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'kryminalna', label: 'Kryminalna' },
        { value: 'historyczna', label: 'Historyczna' },
        { value: 'naukowa', label: 'Naukowa' }
    ];

    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected options:', selectedOptions);
        // TODO: Dodać zapisywanie do bazy danych
    };
    return (
        <>
            <Navigation title="Zaproponuj nową książkę" />
            <div className='container'>
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <div className='bookSuggestion' >
                            <div className='cover'>
                                Okładka
                                <ImageDropZone />
                            </div>
                            <div className='info'>
                                <p>Tytuł <input type='text' required name='title' /></p>
                                <p>Autor <input type='text' required name='author' /></p>
                                <p>Wydawnictwo <input type='text' required name='publisher' /></p>
                                <p>Seria <input type='text' required name='series' /></p>
                                <p>Data wydania <input type='date' required name='date' /></p>
                                <p style={{ display: 'flex' }}>Kategorie <Select isMulti options={options} value={selectedOptions} onChange={handleChange} placeholder="Wybierz kategorie" /></p>
                                <p>Opis <br/><textarea rows="10" style={{ width: '90%', marginTop: '10px', resize: 'none' }}/></p>
                            </div>
                        </div>
                        <div className='formButtons'>
                            <button type='reset' style={{backgroundColor:'#FF6666'}}>Anuluj</button>
                            <button type='submit' style={{backgroundColor:'#66FF87'}}>Zatwierdź</button>
                        </div>
                    </form>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default SuggestBook