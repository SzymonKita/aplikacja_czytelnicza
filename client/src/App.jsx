import './App.css'
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import Profile from './components/Profile/Profile.jsx'
import BookList from './components/BookList/BookList.jsx'
import BookInfo from './components/BookInfo/BookInfo.jsx'
import SuggestBook from './components/SuggestBook/SuggestBook.jsx'
import Ranking from './components/Ranking/Ranking.jsx'
import Bookshelf from './components/Bookshelf/Bookshelf.jsx'
import MainForum from './components/Forum/MainForum.jsx'
import ForumPost from './components/ForumPost/ForumPost.jsx'
import Session from './components/Session/Session.jsx'
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  return (
    <Routes>
        <Route path='/' exact element={<MainPage/>}/>
        <Route path='login' exact element={<LoginPage/>}/>
        <Route path='profile' exact element={<Profile/>}/>
        <Route path='booklist' exact element={<BookList/>}/>
        <Route path='book/:id' element={<BookInfo/>}/>
        <Route path='suggestBook' element={<SuggestBook/>}/>
        <Route path='ranking' exact element={<Ranking/>}/>
        <Route path='bookshelf' exact element={<Bookshelf/>}/>
        <Route path='forum' exact element={<MainForum/>}/>
        <Route path='forum/post/:id' element={<ForumPost/>}/>
        <Route path='session' element={<Session/>}/>
    </Routes>
  )
}

export default App
