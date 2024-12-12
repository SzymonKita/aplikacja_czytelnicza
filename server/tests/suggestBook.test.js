const request = require('supertest');
const app = require('../server'); // Import aplikacji Express
const db = require('../db'); // Import konfiguracji bazy danych
const { formatTimestamp } = require('../utils');

// Resetowanie bazy danych przed testami
beforeAll(async () => {
    await db.query('SET FOREIGN_KEY_CHECKS = 0');
    await db.query('TRUNCATE TABLE BookCategory');
    await db.query('TRUNCATE TABLE Book');
    await db.query('TRUNCATE TABLE Category');
    await db.query('TRUNCATE TABLE Series');
    await db.query('TRUNCATE TABLE Publisher');
    await db.query('TRUNCATE TABLE Author');
    await db.query('SET FOREIGN_KEY_CHECKS = 1');
});

afterAll(async () => {
    await db.end(); // Zamknięcie połączenia z bazą danych
});

describe('POST /suggest-book and GET /books/:id', () => {
    it('should add a book and then fetch it by ID', async () => {
        // Dane testowe do dodania książki
        const payload = {
            title: 'Example Book',
            author: { firstName: 'John', lastName: 'Doe' },
            publisher: 'Example Publisher',
            categories: ['Fiction', 'Adventure'].sort(),
            series: 'Example Series',
            releaseDate: '2023-01-02',
            description: 'This is an example book.',
            pages: 300,
            confirmed: 1,
            cover: 'https://example.com/cover.jpg'
        };

        // Dodawanie książki
        const addResponse = await request(app)
            .post('/suggest-book')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(addResponse.body).toHaveProperty('message', 'Książka została dodana');
        expect(addResponse.body).toHaveProperty('bookID');

        const bookId = addResponse.body.bookID;

        // Wyszukiwanie książki po ID
        const getResponse = await request(app)
            .get(`/books/${bookId}`)
            .expect('Content-Type', /json/)
            .expect(200);


        getResponse.body.Categories = getResponse.body.Categories.split(", ").sort()
        // Walidacja danych zwróconych przez endpoint GET /books/:id
        getResponse.body.ReleaseDate = getResponse.body.ReleaseDate.slice(0, 10)
        expect(getResponse.body).toMatchObject({
            ID: bookId,
            Title: payload.title,
            AuthorFirstName: payload.author.firstName,
            AuthorLastName: payload.author.lastName,
            Publisher: payload.publisher,
            Categories: payload.categories,
            Series: payload.series,
            Cover: payload.cover,
            Pages: payload.pages,
            Confirmed: payload.confirmed,
            ReleaseDate: payload.releaseDate,
            Description: payload.description
        });
    });
});