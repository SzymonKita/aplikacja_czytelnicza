import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation.jsx";
import FriendCard from "../FriendCard.jsx";
import RankingCard from "./RankingCard.jsx";
import "./Ranking.css";

const Ranking = () => {
  const [readingSpeedRanking, setReadingSpeedRanking] = useState([]);
  const [totalTimeRanking, setTotalTimeRanking] = useState([]);
  const [PagesReadRanking, setPagesReadRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/session/statistics"
        );
        const data = await response.json();

        const sortedByReadingSpeed = [...data].sort(
          (a, b) => b.readingSpeed - a.readingSpeed
        );
        const sortedByTotalTime = [...data].sort(
          (a, b) => b.totalTime - a.totalTime
        );
        const sortedByTotalPagesRead = [...data].sort(
          (a, b) => b.TotalPagesRead - a.TotalPagesRead
        );

        setReadingSpeedRanking(
          sortedByReadingSpeed.map((item) => ({
            id: item.id,
            name: item.name,
            text: `${item.readingSpeed.toFixed(2)}`,
          }))
        );

        setTotalTimeRanking(
          sortedByTotalTime.map((item) => ({
            id: item.id,
            name: item.name,
            text: `${(item.totalTime / 60).toFixed(2)} godzin`,
          }))
        );

        setPagesReadRanking(
          sortedByTotalPagesRead.map((item) => ({
            id: item.id,
            name: item.name,
            text: `${item.TotalPagesRead}`,
          }))
        );
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
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
      <div className="container">
        <div className="content">
          <div className="ranking">
            <RankingCard
              items={readingSpeedRanking}
              title="Szybkość czytania (strony na minute)"
            />
            <RankingCard
              items={totalTimeRanking}
              title="Całkowity czas czytania"
            />
            <RankingCard
              items={PagesReadRanking}
              title="Ilość przeczytanch stron"
            />
          </div>
        </div>
        <div className="friendsList">
          <FriendCard name="Friend 1" active={true} />
          <FriendCard name="Friend 2" active={false} />
        </div>
      </div>
    </>
  );
};

export default Ranking;
