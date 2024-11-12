import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import RankingCard from './RankingCard.jsx'
import './Ranking.css'

const Ranking = () => {
    const users = [
        { id: 1, name: 'User1', text: '1' },
        { id: 2, name: 'User2', text: '2' },
        { id: 3, name: 'User3', text: '3' },
        { id: 4, name: 'User4', text: '4' },
        { id: 5, name: 'User5', text: '5' },
        { id: 6, name: 'User6', text: '6' },
        { id: 7, name: 'User7', text: '7' },
        { id: 8, name: 'User8', text: '8' }
    ]

    return (
        <>
            <Navigation title="Ranking" />
            <div className='container'>
                <div className='content'>
                    <div className='ranking'>
                        <RankingCard items={ users } title='Ranking 1' />
                        <RankingCard items={ users } title='Ranking 2' />
                        <RankingCard items={ users } title='Ranking 3' />
                        <RankingCard items={ users } title='Ranking 4' />
                    </div>
                </div>
                <div className='friendsList'>
                    <FriendCard name='Friend 1' active={true} />
                    <FriendCard name='Friend 2' active={false} />
                </div>
            </div>
        </>
    )
}

export default Ranking