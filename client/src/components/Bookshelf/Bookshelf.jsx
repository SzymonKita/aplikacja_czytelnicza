import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import BookshelfCard from './BookshelfCard.jsx'
import './Bookshelf.css'

const Bookshelf = () => {
    const books = [
        { id: 1, title: 'Book1', author: 'Author1', publisher:'Publisher1', series:'Series1', releaseDate:'11.11.1111', categories:'Category1', description:'Description1'},
        { id: 2, title: 'Book2', author: 'Author2', publisher:'Publisher2', series:'Series2', releaseDate:'22.22.2222', categories:'Category2', description:'Description2'},
    ];
    return (
        <>
            <Navigation title="Biblioteczka" />
            <div className='container'>
                <div className='content'>
                    <div className='bookshelfFilter'>
                        Filtruj
                        <select className='bookshelfSortBy'>
                            <option value='favourite'>Ulubione</option>
                            <option value='inProggres'>W trakcie czytania</option>
                            <option vlaue='abandoned'>Opuszczone</option>
                        </select>
                    </div>
                    <BookshelfCard book={books[0]} progress='50' favourite={true}/>
                    <BookshelfCard book={books[1]} progress='20' favourite={false}/>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default Bookshelf