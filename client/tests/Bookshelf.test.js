import { filterBooks } from "../src/components/Bookshelf/bookshelfUtils";
describe('filterBooks', () => {
    const mockBooks = [
        { ID: 1, Abandoned: false, Favourite: true },
        { ID: 2, Abandoned: true, Favourite: false },
        { ID: 3, Abandoned: false, Favourite: false },
        { ID: 4, Abandoned: true, Favourite: true },
    ];

    test('filters "all" to exclude abandoned books', () => {
        const result = filterBooks(mockBooks, 'all');
        expect(result).toEqual([
            { ID: 1, Abandoned: false, Favourite: true },
            { ID: 3, Abandoned: false, Favourite: false },
        ]);
    });

    test('filters "favourite" to include only favourite books', () => {
        const result = filterBooks(mockBooks, 'favourite');
        expect(result).toEqual([
            { ID: 1, Abandoned: false, Favourite: true },
            { ID: 4, Abandoned: true, Favourite: true },
        ]);
    });

    test('filters "abandoned" to include only abandoned books', () => {
        const result = filterBooks(mockBooks, 'abandoned');
        expect(result).toEqual([
            { ID: 2, Abandoned: true, Favourite: false },
            { ID: 4, Abandoned: true, Favourite: true },
        ]);
    });

    test('returns all books if filter is unrecognized', () => {
        const result = filterBooks(mockBooks, 'unknown');
        expect(result).toEqual(mockBooks);
    });
});
