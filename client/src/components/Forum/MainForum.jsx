import Navigation from '../Navigation/Navigation.jsx'
import FriendCard from '../FriendCard.jsx'
import MainForumCard from './MainForumCard.jsx'
import './MainForum.css'

const exampleParams = [{id: 1, title:'Polecacie książki w klimacie fantasy?', author:'FantasyLover99', text:'Cześć wszystkim! 😊 Ostatnio wciągnąłem się w literaturę fantasy i szukam nowych inspiracji. Bardzo spodobały mi się takie tytuły jak:"Władca Pierścieni" J.R.R. Tolkiena"Koło Czasu" Roberta Jordana "Cień wiatru" Carlosa Ruiza Zafóna (choć to bardziej realizm magiczny). Szukam książek z bogato wykreowanymi światami, ciekawymi bohaterami i intrygującą fabułą. Czy macie jakieś ulubione tytuły, które polecilibyście komuś, kto uwielbia zatapiać się w magicznych krainach?Z góry dziękuję za wszystkie propozycje! 🙌P.S. Mile widziane mniej znane perełki, które warto odkryć!', likes: 10, dislikes: 3, comments: 30},
    {id: 2, title:'Najlepsze książki z gatunku science fiction – co polecacie?', author:'SciFiSeeker', text:'Hej wszystkim! 👋Ostatnio wpadłem w totalny zachwyt nad science fiction i szukam kolejnych świetnych książek do przeczytania. Przykłady tytułów, które bardzo mi się podobały:"Diuna" Franka Herberta – za epicką skalę i polityczne intrygi."Koniec dzieciństwa" Arthura C. Clarke`a – niesamowicie wizjonerska książka."Neuromancer" Williama Gibsona – dla fanów cyberpunku coś genialnego.Chętnie poznam Wasze ulubione tytuły z tego gatunku. Interesuje mnie zarówno klasyka, jak i nowsze pozycje. Szczególnie zależy mi na książkach, które mają głębsze przesłanie albo przedstawiają złożone światy i technologie.Macie coś do polecenia? Dzięki z góry! 🚀', likes: 15, dislikes: 2, comments: 19}
]
const MainForum = () => {
    return (
        <>
            <Navigation title="Forum"/>
            <div className='container'>
                <div className='content'>
                    {exampleParams.map((params) => (
                        <MainForumCard id={params.id} title={params.title} author={params.author} text={params.text} likes={params.likes} dislikes={params.dislikes} comments={params.comments}/>
                    ))}
                </div>
                <div className='friendsList'>
                    <FriendCard name='Kolega123' active={true} />
                    <FriendCard name='Ktoś987' active={false} />
                </div>
            </div>
        </>
    )
}

export default MainForum