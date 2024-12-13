export const filterBooks = (books, filter) => {
    return books.filter((book) => {
        if (filter === 'all') {
            return !book.Abandoned;
        }
        if (filter === 'favourite') {
            return book.Favourite;
        }
        if (filter === 'abandoned') {
            return book.Abandoned;
        }
        return true;
    });
};
