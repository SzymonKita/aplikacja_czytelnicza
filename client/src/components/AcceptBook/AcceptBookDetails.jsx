import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation  } from "react-router-dom";
import Select from 'react-select';
import Navigation from '../Navigation/Navigation.jsx';
import FriendCard from '../FriendCard.jsx';
import axios from 'axios';

const AcceptBookDetails = () => {
    const location = useLocation();
    const bookId = location.pathname.split("/").pop();
    const navigate = useNavigate();

    const categoryOptions = [
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

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publisher: '',
        series: '',
        releaseDate: '',
        description: '',
        pages: '',
        cover: '',
        categories: []
    });

    // Pobierz dane książki z API
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/books/${bookId}`);
                const bookData = response.data;
                setFormData({
                    title: bookData.Title,
                    author: `${bookData.AuthorFirstName} ${bookData.AuthorLastName}`, // Łączenie imienia i nazwiska
                    publisher: bookData.Publisher,
                    series: bookData.Series,
                    releaseDate: bookData.ReleaseDate,
                    description: bookData.Description,
                    pages: bookData.Pages,
                    cover: bookData.Cover,
                });
            } catch (error) {
                console.error("Błąd wczytywania danych książki:", error);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCategoryChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            categories: selectedOptions,
        }));
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            categories: formData.categories.map(option => option.value),
        };

        try {
            await axios.post(`/api/books/${bookId}/approve`, updatedData);
            alert("Książka została zaakceptowana!");
            navigate('/acceptBook');
        } catch (error) {
            console.error("Błąd zatwierdzania książki:", error);
        }
    };

    const handleDeny = async () => {
        try {
            await axios.delete(`/api/books/${bookId}`);
            alert("Książka została odrzucona.");
            navigate('/acceptBook');
        } catch (error) {
            console.error("Błąd odrzucania książki:", error);
        }
    };

    if (!formData.title) return <p>Wczytywanie danych...</p>;

    return (
        <>
            <Navigation title="Zaakceptuj książkę" />
            <div className='container'>
                <div className='content'>
                    <form onSubmit={handleConfirm}>
                        <div className='acceptBookDetails'>
                            <div className='cover'>
                                <p>Okładka</p>
                                <img src={`/covers/${formData.cover}`} alt={`${formData.title} cover`} className="acceptBookCover" />
                            </div>
                            <div className='info'>
                                <p>Tytuł <input type='text' required name='title' value={formData.title} onChange={handleInputChange} /></p>
                                <p>Autor <input type='text' required name='author' value={formData.author} onChange={handleInputChange} /></p>
                                <p>Wydawnictwo <input type='text' required name='publisher' value={formData.publisher} onChange={handleInputChange} /></p>
                                <p>Seria <input type='text' name='series' value={formData.series} onChange={handleInputChange} /></p>
                                <p>Data wydania <input type='date' required name='releaseDate' value={formData.releaseDate} onChange={handleInputChange} /></p>
                                <p>Kategorie 
                                    <Select 
                                        isMulti 
                                        options={categoryOptions} 
                                        value={formData.categories} 
                                        onChange={handleCategoryChange} 
                                        placeholder="Wybierz kategorie" 
                                    />
                                </p>
                                <p>Opis <textarea name='description' rows="10" value={formData.description} onChange={handleInputChange} /></p>
                                <p>Ilość stron <input type='number' name='pages' value={formData.pages} onChange={handleInputChange} /></p>
                            </div>
                        </div>
                        <div className='formButtons'>
                            <button type="button" onClick={handleDeny} style={{ backgroundColor: '#FF6666' }}>Odrzuć</button>
                            <button type='submit' style={{ backgroundColor: '#66FF87' }}>Zatwierdź</button>
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

export default AcceptBookDetails;
