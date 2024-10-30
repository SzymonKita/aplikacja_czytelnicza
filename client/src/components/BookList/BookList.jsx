import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import Filter from './Filter.jsx'
import Book from '../Book.jsx'
import "./BookList.css"

const BookList = () => {
    return (
        <>
            <Navigation title="Strona główna"/>
            <div className='container'>
                <div className='content'>
                    <div className='bookList'>
                        <Filter/>
                        <div className='list'>
                            <Book id='1' title='Book1' author='Author Author' />
                            <Book id='2' title='Book2' author='Author Author' />
                            <Book id='1' title='Book1' author='Author Author' />
                            <Book id='1' title='Book1' author='Author Author' />
                            <Book id='1' title='Book1' author='Author Author' />
                            <Book id='1' title='Book1' author='Author Author' />
                            <Book id='1' title='Book1' author='Author Author' />
                            <Book id='1' title='Book1' author='Author Author' />
                            <Book id='1' title='Book1' author='Author Author' />
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

export default BookList