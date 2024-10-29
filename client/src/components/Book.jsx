const Book = (props) => {
    return (
        <div className='favouriteBook'>
            <p className='favouriteBookImage' />
            {props.title} <br/>
            {props.author}
        </div>
    )
}

export default Book