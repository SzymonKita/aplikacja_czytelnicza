import React, { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import FriendCard from '../FriendCard.jsx';
import RankingCard from './RankingCard.jsx';
import './Ranking.css';

const Ranking = () => {
    const [readingSpeedRanking, setReadingSpeedRanking] = useState([]);
    const [totalTimeRanking, setTotalTimeRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('http://localhost:5000/session/statistics');
                const data = await response.json();

                // Sort for separate rankings
                const sortedByReadingSpeed = [...data].sort((a, b) => b.readingSpeed - a.readingSpeed);
                const sortedByTotalTime = [...data].sort((a, b) => b.totalTime - a.totalTime);

                setReadingSpeedRanking(
                    sortedByReadingSpeed.map((item) => ({
                        id: item.id,
                        name: item.name,
                        text: `${item.readingSpeed.toFixed(2)} pages/min`
                    }))
                );

                setTotalTimeRanking(
                    sortedByTotalTime.map((item) => ({
                        id: item.id,
                        name: item.name,
                        text: `${item.totalTime} mins`
                    }))
                );
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    return (
        <>
            <Navigation title="Ranking" />
            <div className='container'>
                <div className='content'>
                    <div className='ranking'>
                        <RankingCard items={readingSpeedRanking} title='Ranking - Reading Speed' />
                        <RankingCard items={totalTimeRanking} title='Ranking - Total Time' />
                    </div>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    );
};

export default Ranking;
