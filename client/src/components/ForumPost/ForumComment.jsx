import image from '../blank-profile.png'
const ForumComment = ({user, likes, dislikes, details}) => {
    return (
        <div className='forumPost' style={{backgroundColor:'#96EFFF'}}>
            <div className='forumPostHeader'>
                <div className='forumPostUser'>
                    <img className='rankingPicture' src={image} />
                    <b>{user}</b>
                </div>
                <div>
                    👍︎{likes} 👎︎{dislikes}
                </div>
            </div>
            <p className='forumPostDetail'>
                {details}
            </p>
        </div>
    )
}

export default ForumComment