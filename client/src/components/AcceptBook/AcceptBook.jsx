import FriendCard from '../FriendCard.jsx'
import Navigation from '../Navigation/Navigation.jsx'
import React, { useState } from 'react';
import AcceptBookCard from './AcceptBookCard.jsx';
import './AcceptBook.css'
const AcceptBook = () => {
    // TODO: Do zmiennej isAdmin dodać sprawdzanie czy użytkownik, który jest zalogowany, ma uprawnienia administratora
    const isAdmin = true;

    const acceptBooks = [
        { id: 1, title: 'Book1', author: 'Author1', publisher: 'Publisher1', series: 'Series1', releaseDate: '11.11.1111', categories: 'Category1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra quis nunc vitae efficitur. Donec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor malesuada odio, vel feugiat arcu dictum ut. Vestibulum elementum leo neque, in consectetur risus lobortis vitae. Ut pharetra pellentesque nisi eget lobortis. Nunc accumsan enim nec rhoncus consectetur. Praesent ultricies commodo massa. Sed viverra pharetra rutrum. Vivamus dapibus consequat ex. Proin id magna at nisl interdum maximus. Proin vitae tempus libero. Vivamus volutpat facilisis ligula, eu feugiat mauris. Proin nec erat sit amet ante convallis malesuada at nec nunc. Mauris accumsan at leo a mattis. Duis in accumsan massa. Donec egestas lectus in urna tristique, a facilisis tellus consequat. Proin id semper nibh. In gravida justo in volutpat luctus. Proin at tincidunt arcu. Mauris eleifend, nisl eget tincidunt fringilla, augue lacus aliquam nisi, eu porta metus quam id felis. Quisque aliquet odio in mi bibendum fringilla. Pellentesque laoreet, orci eleifend.', pages: 200 },
        { id: 2, title: 'Book2', author: 'Author2', publisher: 'Publisher2', series: 'Series2', releaseDate: '22.22.2222', categories: 'Category2', description: 'Description2', pages: 100 },
        { id: 3, title: 'Opuszczona', author: 'Author3', publisher: 'Publisher3', series: 'Series3', releaseDate: '33.33.3333', categories: 'Category3', description: 'Description3', pages: 100 },
    ];

    return (
        <>
            <Navigation title="Lista książek do akceptacji" />
            <div className='container'>
                <div className='content'>
                    {isAdmin ? (
                        <div>
                            {
                                acceptBooks.map((book) => (
                                    <AcceptBookCard book={book} />
                                ))};
                        </div>
                    ) : (
                        <p>Musisz mieć uprawniena administatora, żeby zobaczyć tą stronę.</p>
                    )}
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default AcceptBook