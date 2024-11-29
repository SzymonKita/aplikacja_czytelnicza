import { Link } from "react-router-dom";

const AcceptBookCard = ({ book }) => {
    // Ścieżka do okładki (zmieniona na dynamiczną, jeśli później będzie używana z bazy danych)
    const coverImagePath = book.cover
        ? `http://localhost:5000/covers/${book.cover}`
        : `http://localhost:5000/covers/default.png`;

    // Bezpieczna obsługa opisu
    const description = book.description ? book.description.substring(0, 300) : "Brak opisu.";

    return (
        <Link to={`/acceptBook/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='acceptBookCard'>
                <img src={coverImagePath} alt={`${book.title} cover`} className='acceptBookCardImage' />
                <div>
                    <p><b>Tytuł: </b>{book.title}</p>
                    <p><b>Autor: </b>{book.author}</p>
                    <p><b>Wydawnictwo: </b>{book.publisher}</p>
                    <p><b>Seria: </b>{book.series || "Brak serii"}</p>
                </div>
                <p className='acceptBookCardDescription'><b>Opis:</b> {description}...</p>
            </div>
        </Link>
    );
};

export default AcceptBookCard;
