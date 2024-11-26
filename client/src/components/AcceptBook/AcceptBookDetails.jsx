import React, { useState } from "react";
import Select from 'react-select';
import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'

const AcceptBookDetails = () => {
    // TODO: zmienić na wczytywanie z bazy danych obrazka, danych ksiażki i kategorii
    const coverImagePath = `/covers/1.png`;
    const book = { id: 1, title: 'Book1', author: 'Author1', publisher: 'Publisher1', series: 'Series1', releaseDate: '11.11.1111', categories: [{ label: "Przygodowa", value: "przygodowa" }], description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra quis nunc vitae efficitur. Donec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor malesuada odio, vel feugiat arcu dictum ut. Vestibulum elementum leo neque, in consectetur risus lobortis vitae. Ut pharetra pellentesque nisi eget lobortis. Nunc accumsan enim nec rhoncus consectetur. Praesent ultricies commodo massa. Sed viverra pharetra rutrum. Vivamus dapibus consequat ex. Proin id magna at nisl interdum maximus. Proin vitae tempus libero. Vivamus volutpat facilisis ligula, eu feugiat mauris. Proin nec erat sit amet ante convallis malesuada at nec nunc. Mauris accumsan at leo a mattis. Duis in accumsan massa. Donec egestas lectus in urna tristique, a facilisis tellus consequat. Proin id semper nibh. In gravida justo in volutpat luctus. Proin at tincidunt arcu. Mauris eleifend, nisl eget tincidunt fringilla, augue lacus aliquam nisi, eu porta metus quam id felis. Quisque aliquet odio in mi bibendum fringilla. Pellentesque laoreet, orci eleifend.', pages: 200 }
    const options = [
        { value: 'przygodowa', label: 'Przygodowa' },
        { value: 'fantasy', label: 'Fantasy' },
        { value: 'kryminalna', label: 'Kryminalna' },
        { value: 'historyczna', label: 'Historyczna' },
        { value: 'naukowa', label: 'Naukowa' }
    ];
    const [formData, setFormData] = useState({ ...book });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCategoryChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            categories: selectedOption,
        }));
    };
    const handleConfirm = (e) => {
        e.preventDefault();
        // TODO: Zmiana zapisu w bazie danych na książkę zatwierdzoną
    };
    const handleCancle = (e) => {
        e.preventDefault();
        // TODO: Zmiana zapisu w bazie danych na odrzuconą albo kompletne usunięcie z bazy
    };
    return (
        <>
            <Navigation title="Zaakceptuj książkę" />
            <div className='container'>
                <div className='content'>
                    <form onSubmit={handleConfirm}>
                        <div className='acceptBookDetails' >

                            <div className='cover'>
                                Okładka
                                <img src={coverImagePath} alt={`${book.title} cover`} className="acceptBookCover" />
                            </div>
                            <div className='info'>
                                <p>Tytuł <input type='text' required name='title' value={formData.title} onChange={handleChange} /></p>
                                <p>Autor <input type='text' required name='author' value={formData.author} onChange={handleChange} /></p>
                                <p>Wydawnictwo <input type='text' required name='publisher' value={formData.publisher} onChange={handleChange} /></p>
                                <p>Seria <input type='text' required name='series' value={formData.series} onChange={handleChange} /></p>
                                <p>Data wydania <input type='releaseDate' required name='date' value={formData.releaseDate} onChange={handleChange} /></p>
                                <p style={{ display: 'flex' }}>Kategorie <Select isMulti options={options} value={formData.categories} onChange={handleCategoryChange} placeholder="Wybierz kategorie" /></p>
                                <p>Opis <br /><textarea name='description' rows="10" style={{ width: '90%', marginTop: '10px', resize: 'none' }} value={formData.description} onChange={handleChange} /></p>
                            </div>
                        </div>
                        <button type="button" onClick={() => onDeny()} style={{backgroundColor:'#FF6666'}}>Odrzuć</button>
                        <button type='submit' style={{backgroundColor:'#66FF87'}}>Zatwierdź</button>
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

export default AcceptBookDetails