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

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/books/${bookId}`);
                const bookData = response.data;
                const categoriesArray = bookData.Categories
                    ? bookData.Categories.split(',').map(category => ({
                        value: category.trim(),
                        label: category.trim(),
                    }))
                    : [];
                const formattedDate = new Date(bookData.ReleaseDate).toISOString().split('T')[0];
    
                setFormData({
                    title: bookData.Title,
                    author: `${bookData.AuthorFirstName} ${bookData.AuthorLastName}`,
                    publisher: bookData.Publisher,
                    series: bookData.Series,
                    releaseDate: formattedDate,
                    description: bookData.Description,
                    pages: bookData.Pages,
                    cover: bookData.Cover,
                    categories: categoriesArray,
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
            title: formData.title,
            author: formData.author,
            publisher: formData.publisher,
            series: formData.series || null,
            releaseDate: formData.releaseDate,
            description: formData.description,
            pages: formData.pages,
            cover: formData.cover,
            categories: formData.categories.map(option => option.value),
        };
    
        try {
            await axios.put(`http://localhost:5000/books/${bookId}/confirm`, updatedData);
            alert("Książka została zaakceptowana!");
            navigate('/acceptBook');
        } catch (error) {
            console.error("Błąd zatwierdzania książki:", error);
            alert("Wystąpił błąd podczas zatwierdzania książki.");
        }
    };
    
    

    const handleDeny = async () => {
        navigate('/acceptBook')
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
