import image from '../blank-profile.png'
const RatingComment = ({ rating }) => {
    return (
        <div className='bookReview'>
            <p><img src={image} className='userImage'/></p>
            <div>
                <div className='ratingCommentHeader'>
                    <h3>Osoba 1</h3>
                    <p>{[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            style={{
                                color: index < rating ? 'gold' : 'gray',
                                fontSize: '1 em',
                            }}
                        >
                            ★
                        </span>
                    ))}</p>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ligula lacus, vulputate a viverra id, commodo id tellus. Pellentesque nec maximus ante. Phasellus rutrum eu nisi id rutrum. Suspendisse quis sagittis nulla. Quisque rutrum dui sit amet nunc faucibus, eu laoreet diam luctus. Quisque mattis nulla a lectus feugiat laoreet. Vivamus eu elit vitae orci pharetra facilisis. Etiam aliquet, magna dapibus dignissim dignissim, odio elit iaculis lacus, ut commodo libero purus et justo. Donec nec rutrum quam, sit amet porta justo. Aenean consequat mollis lacus convallis dictum.</p>
            </div>
        </div>
    )
}

export default RatingComment