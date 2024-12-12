const { formatTimestamp } = require('../utils');

describe('formatTimestamp', () => {
    test('formats a valid timestamp correctly', () => {
        const timestamp = 1712111112002; // 2024-04-03 02:25:12 UTC
        const formatted = formatTimestamp(timestamp);
        expect(formatted).toBe('2024-04-03 02:25:12');
    });

    test('handles a timestamp of 0 correctly', () => {
        const timestamp = 0; // 1970-01-01 00:00:00 UTC
        const formatted = formatTimestamp(timestamp);
        expect(formatted).toBe('1970-01-01 00:00:00');
    });

    test('throws an error for invalid timestamp', () => {
        expect(() => formatTimestamp('invalid')).toThrow();
    });
});
