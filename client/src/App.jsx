import './App.css'
import Navigation from './components/Navigation.jsx'

function App() {
  return (
    <>
    <Navigation title="Strona główna" isLoggedIn={false} />
    <div className='container'>
      <div className='content'>Tu będzie content strony</div>
      <div className='friendsList'>Tu będzie lista przyjaciółTu będzie lista przyjaciół Tu będzie lista przyjaciół Tu będzie lista przyjaciół</div>
    </div>
    </>
  )
}

export default App
