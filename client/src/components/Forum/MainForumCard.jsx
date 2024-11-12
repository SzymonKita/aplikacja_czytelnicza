import {Link} from "react-router-dom"
const MainForumCard = ({ id, title, author, text, likes, dislikes, comments }) => {
    return (
        <Link to={`/forum/post/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='mainForumCard'>
                <div className='mainForumCardHeader'>
                    <b>{title}</b>
                    <p>Autor: {author}</p>
                </div>
                <p>
                    {text.substring(0, 200)}...
                </p>
                <div className='mainForumCardInfo'>
                    <b>👍︎</b>{likes}  <b>👎︎</b>{dislikes}  <b>🗨️</b>{comments}
                </div>
            </div>
        </Link>
    );
}

export default MainForumCard