import image from '../blank-profile.png'
const ForumComment = ({id, user, likes, dislikes, details}) => {
    const toggleLike = () => {
        // TODO: Add switching like reaction in database, using id
    }
    const toggleDislike = () => {
        // TODO: Add switching dislike reaction in database, using id
    }
    return (
        <div className='forumPost' style={{backgroundColor:'#96EFFF'}}>
            <div className='forumPostHeader'>
                <div className='forumPostUser'>
                    <img className='rankingPicture' src={image} />
                    <b>{user}</b>
                </div>
                <div>
                    <button type='button' className='reactionButton' onClick={() => toggleLike()}>👍︎</button>{likes} <button type='button' className='reactionButton' onClick={() => toggleDislike()}>👎︎</button>{dislikes}
                </div>
            </div>
            <p className='forumPostDetail'>
                {details}
            </p>
        </div>
    )
}

export default ForumComment