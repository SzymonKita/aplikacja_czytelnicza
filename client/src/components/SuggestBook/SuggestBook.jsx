import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Navigation from '../Navigation/Navigation.jsx';
import ImageDropZone from './ImageDropZone.jsx';
import FriendCard from '../FriendCard.jsx';
import './SuggestBook.css';

const SuggestBook = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [publisher, setPublisher] = useState('');
    const [series, setSeries] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [description, setDescription] = useState('');
    const [pages, setPages] = useState('');
    const [coverFileName, setCoverFileName] = useState('');

    const options = [
        { value: 'Science Fiction', label: 'Science Fiction' },
        { value: 'Fantasy', label: 'Fantasy' },
        { value: 'Mystery', label: 'Tajemnica' },
        { value: 'Romance', label: 'Romans' },
        { value: 'Horror', label: 'Horror' },
        { value: 'Historical Fiction', label: 'Fikcja Historyczna' },
        { value: 'Young Adult', label: 'Młodzi Dorośli' },
        { value: 'Non-Fiction', label: 'Literatura faktu' },
        { value: 'Classic', label: 'Klasyka' },
        { value: 'Biography', label: 'Biografia' },
    ];

    const handleCoverUpload = (fileName) => {
        setCoverFileName(fileName);
    };

    const handleChange = (selected) => setSelectedOptions(selected);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const bookData = {
            title,
            author: { firstName, lastName },
            publisher,
            series,
            pages,
            releaseDate,
            categories: selectedOptions.map(option => option.value),
            description,
            cover: coverFileName
        };

        try {
            const response = await axios.post('http://localhost:5000/suggest-book', bookData);
            console.log('Książka dodana:', response.data);
            alert("Książka została pomyślnie dodana!");
        } catch (error) {
            console.error('Błąd podczas dodawania książki:', error);
            alert("Wystąpił błąd podczas dodawania książki. Spróbuj ponownie.");
        }
    };

    return (
        <>
            <Navigation title="Zaproponuj nową książkę" />
            <div className='container'>
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <div className='bookSuggestion'>
                            <div className='cover'>
                                Okładka
                                <ImageDropZone onUploadSuccess={handleCoverUpload} />
                            </div>
                            <div className='info'>
                                <p>Tytuł <input type='text' required name='title' value={title} onChange={(e) => setTitle(e.target.value)} /></p>
                                <p>Imię autora <input type='text' required name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} /></p>
                                <p>Nazwisko autora <input type='text' required name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} /></p>
                                <p>Wydawnictwo <input type='text' required name='publisher' value={publisher} onChange={(e) => setPublisher(e.target.value)} /></p>
                                <p>Seria <input type='text' name='series' value={series} onChange={(e) => setSeries(e.target.value)} /></p>
                                <p>Ilość stron <input type='number' name='pages' value={pages} onChange={(e) => setPages(e.target.value)} /></p>
                                <p>Data wydania <input type='date' required name='date' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} /></p>
                                <p style={{ display: 'flex' }}>Kategorie <Select isMulti options={options} value={selectedOptions} onChange={handleChange} placeholder="Wybierz kategorie" /></p>
                                <p>Opis <br/><textarea rows="10" style={{ width: '90%', marginTop: '10px', resize: 'none' }} value={description} onChange={(e) => setDescription(e.target.value)} /></p>
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
    );
};

export default SuggestBook;
