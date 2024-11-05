// Card.js
import React from 'react';
import image from '../blank-profile.png'

const RankingCard = ({ items, title }) => {
    const firstThree = items.slice(0, 3);
    return (
        <div className='rankingCardContainer'>
            <b>{title}</b>
            <div className="rankingCard">
                <div className='firstThree'>
                    <div className='second'>
                        <img className='rankingPicture' src={image} />
                        <p><b>{items[1].name}</b></p>
                        <p>{items[1].text}</p>
                    </div>
                    <div className='first'>
                        <img className='rankingPicture' src={image} />
                        <p><b>{items[0].name}</b></p>
                        <p>{items[0].text}</p>
                    </div>
                    <div className='third'>
                        <img className='rankingPicture' src={image} />
                        <p><b>{items[2].name}</b></p>
                        <p>{items[2].text}</p>
                    </div>
                </div>
                {items.slice(3).map((item) => (
                    <p><b>{item.name}</b> : {item.text}</p>
                ))}
            </div>
        </div>
    );
};

export default RankingCard;
