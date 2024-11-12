import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import RatingForm from './RatingForm.jsx';
import RatingComment from './RatingComment.jsx';
import { useParams } from 'react-router-dom';
import React from 'react';
import "./BookInfo.css"

const books = [
    { id: 1, title: 'Book1', author: 'Author1', publisher:'Publisher1', series:'Series1', releaseDate:'11.11.1111', categories:'Category1', description:'Description1'},
    { id: 2, title: 'Book2', author: 'Author2', publisher:'Publisher2', series:'Series2', releaseDate:'22.22.2222', categories:'Category2', description:'Description2'},
];

const BookInfo = (params) => {
    const { id } = useParams();
    const book = books.find((book) => book.id == parseInt(id));


    if(!book){
        return(<Navigation title="Brak książki"/>)
    }
    
    const coverImagePath = `/covers/${id}.png`;
    return (
        <>
            <Navigation title={book.title}/>
            <div className='container'>
                <div className='content'>
                    <div className='bookInfo'>
                        <div className='col'>
                            <img src={coverImagePath} alt={`${book.title} cover`} className='coverImage'/>
                            <p style={{fontSize:'2em'}}>Dodaj do biblioteczki +</p>
                            <p>
                                <b>Średnia ocen</b><br/>
                                0/5
                            </p>
                        </div>
                        <div className='col'>
                            <p style={{textAlign:'start'}}>
                                <b>Autor:</b> {book.author} <br/>
                                <b>Wydawnictwo:</b> {book.publisher} <br/>
                                <b>Seria:</b> {book.series} <br/>
                                <b>Data wydania:</b> {book.releaseDate} <br/>
                                <b>Kategorie:</b> {book.categories} <br/>
                            </p>
                            <p>{book.description}</p>
                        </div>
                    </div>
                    <h2>Recenzje</h2>
                    <RatingForm/>
                    
                    <RatingComment rating='4'/>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default BookInfo