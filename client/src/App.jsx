import './App.css';
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Profile from './components/Profile/Profile.jsx'
import BookList from './components/BookList/BookList.jsx'
import BookInfo from './components/BookInfo/BookInfo.jsx'
import SuggestBook from './components/SuggestBook/SuggestBook.jsx'
import Bookshelf from './components/Bookshelf/Bookshelf.jsx'
import Session from './components/Session/Session.jsx'
import AcceptBook from './components/AcceptBook/AcceptBook.jsx'
import AcceptBookDetails from './components/AcceptBook/AcceptBookDetails.jsx'
import MainForum from './components/Forum/MainForum.jsx'
import ForumPost from './components/ForumPost/ForumPost.jsx'
import Ranking from './components/Ranking/Ranking.jsx'
import { Route, Routes, Navigate } from "react-router-dom"
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' exact element={<MainPage/>}/>
        <Route path='login' exact element={<LoginPage/>}/>
        <Route path='register' exact element={<RegisterPage/>}/>
        <Route path='profile' exact element={<Profile/>}/>
        <Route path='booklist' exact element={<BookList/>}/>
        <Route path='book/:id' element={<BookInfo/>}/>
        <Route path='suggestBook' element={<SuggestBook/>}/>
        <Route path='bookshelf' exact element={<Bookshelf/>}/>
        <Route path='session' element={<Session/>}/>
        <Route path="/session/:bookshelfID" element={<Session />} />
        <Route path='acceptBook' exact element={<AcceptBook/>}/>
        <Route path='acceptBook/:bookid' element={<AcceptBookDetails/>}/>
        <Route path='forum' exact element={<MainForum/>}/>
        <Route path='forum/post/:id' element={<ForumPost/>}/>
        <Route path='ranking' exact element={<Ranking/>}/>
    </Routes>
    </AuthProvider>
  );
}

export default App;
