import Card from './Card.js';
import './MenuPartie.css';
import {useState} from "react";

function Home() {

    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 70

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isRightSwipe = distance < -minSwipeDistance
        if (isRightSwipe) {
            window.location.href = '/'
        }
    }

    const parties = [
        {
            nomPartie: 'La Jungle test de texte long',
            nbJoueurs: '5',
            nbDonne: '3',
            date: '15/09/2023',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '145'
        },
        {
            nomPartie: 'Partie 2',
            nbJoueurs: '2',
            nbDonne: '10',
            date: '05/09/2023',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '195'
        },
        {
            nomPartie: 'Partie 3',
            nbJoueurs: '4',
            nbDonne: '5',
            date: '05/09/2023',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '65'
        },
        {
            nomPartie: 'Partie 4',
            nbJoueurs: '5',
            nbDonne: '3',
            date: '15/09/2023',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '145'
        },
        {
            nomPartie: 'Partie 5',
            nbJoueurs: '2',
            nbDonne: '10',
            date: '05/09/2023',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '195'
        },
        {
            nomPartie: 'Partie 6',
            nbJoueurs: '4',
            nbDonne: '5',
            date: '05/09/2023',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '65'
        },
        {
            nomPartie: 'Partie 7',
            nbJoueurs: '5',
            nbDonne: '3',
            date: '15/09/2023',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '145'
        },
        {
            nomPartie: 'Partie 8',
            nbJoueurs: '2',
            nbDonne: '10',
            date: '05/09/2023',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '195'
        }
    ];

    return (

    <div className='cards-area' onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {parties.map((partie, index) => (
                <Card
                    key={index}
                    nomPartie={partie.nomPartie}
                    nbJoueurs={partie.nbJoueurs}
                    nbDonne={partie.nbDonne}
                    date={partie.date}
                    pictureFirst={partie.pictureFirst}
                    pseudoFirst={partie.pseudoFirst}
                    scoreFirst={partie.scoreFirst}
                />
            ))}
            <div className='bottom-gradient'></div>
        </div>
    );
}

export default Home
