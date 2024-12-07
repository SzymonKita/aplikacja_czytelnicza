import {Link} from "react-router-dom"
const Filter = () => {
    return (
        <div className='filter'>
            <h2>Filtry</h2>
            <input type='text' placeholder='Wyszukaj...' />
            <h3>Sortuj</h3>
            <select name='sortBy'>
                <option value='dateDecs'>Data wydania malejąco</option>
                <option value='dateAsc'>Data wydania rosnąco</option>
                <option value='readersDesc'>Liczba czytelników malejąco</option>
                <option value='readersAcs'>Liczba czytelników rosnąco</option>
            </select>
            <h3>Kategorie</h3>
            <div className='categories'>
                <p><input type='checkbox' id='Przygodowa' value='Przygodowa' /><label for='Przygodowa'>Przygodowa</label></p>
                <p><input type='checkbox' id='Fantasy' value='Fantasy' /><label for='Fantasy'>Fantasy</label></p>
                <p><input type='checkbox' id='Kryminalna' value='Kryminalna' /><label for='Kryminalna'>Kryminalna</label></p>
                <p><input type='checkbox' id='Historyczna' value='Historyczna' /><label for='Historyczna'>Historyczna</label></p>
                <p><input type='checkbox' id='Naukowa' value='Naukowa' /><label for='Naukowa'>Naukowa</label></p>
            </div>
            <h3>Autor</h3>
            <div className='categories'>
                <p><input type='checkbox' id='1' value='Autor' /><label for='1'>George Orwell</label></p>
                <p><input type='checkbox' id='2' value='Autor' /><label for='2'>J.K. Rowling</label></p>
                <p><input type='checkbox' id='3' value='Autor' /><label for='3'>Isaac Asimov</label></p>
                <p><input type='checkbox' id='4' value='Autor' /><label for='4'>Jane Austen</label></p>
                <p><input type='checkbox' id='5' value='Autor' /><label for='5'>George Orwell</label></p>
                <p><input type='checkbox' id='6' value='Autor' /><label for='6'>Stephen King</label></p>
            </div>
            <Link to='/suggestBook'><button type='button'>Zaproponuj nową książkę</button></Link>
        </div>
    )
}

export default Filter