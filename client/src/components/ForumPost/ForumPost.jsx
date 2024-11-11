import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import ForumCommentForm from './ForumCommentForm.jsx'
import ForumComment from './ForumComment.jsx'
import image from '../blank-profile.png'
import { useParams } from "react-router-dom"
import './ForumPost.css'


const exampleParams = { user: 'User 1', likes: 14, dislikes: 18, details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra quis nunc vitae efficitur. Donec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor malesuada odio, vel feugiat arcu dictum ut. Vestibulum elementum leo neque, in consectetur risus lobortis vitae. Ut pharetra pellentesque nisi eget lobortis. Nunc accumsan enim nec rhoncus consectetur. Praesent ultricies commodo massa. Sed viverra pharetra rutrum. Vivamus dapibus consequat ex. Proin id magna at nisl interdum maximus. Proin vitae tempus libero. Vivamus volutpat facilisis ligula, eu feugiat mauris. Proin nec erat sit amet ante convallis malesuada at nec nunc. Mauris accumsan at leo a mattis. Duis in accumsan massa. Donec egestas lectus in urna tristique, a facilisis tellus consequat. Proin id semper nibh. In gravida justo in volutpat luctus. Proin at tincidunt arcu. Mauris eleifend, nisl eget tincidunt fringilla, augue lacus aliquam nisi, eu porta metus quam id felis. Quisque aliquet odio in mi bibendum fringilla. Pellentesque laoreet, orci eleifend.' }

const ForumPost = (params) => {
    const id = useParams();
    // TODO: pobieranie z bazy danych informacji o poście z bazy danych
    return (
        <>
            <Navigation title="Forum tytuł wpisu" />
            <div className='container'>
                <div className='content'>
                    <div className='forumPost'>
                        <div className='forumPostHeader'>
                            <div className='forumPostUser'>
                                <img className='rankingPicture' src={image} />
                                <b>{exampleParams.user}</b>
                            </div>
                            <div>
                                👍︎{exampleParams.likes} 👎︎{exampleParams.dislikes}
                            </div>
                        </div>
                        <p className='forumPostDetail'>
                            {exampleParams.details}
                        </p>
                    </div>
                    Komentarze:
                    <ForumCommentForm/>
                    <ForumComment user={exampleParams.user} likes={exampleParams.likes} dislikes={exampleParams.dislikes} details={exampleParams.details}/>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default ForumPost