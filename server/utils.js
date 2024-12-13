const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
};

module.exports = { formatTimestamp };
