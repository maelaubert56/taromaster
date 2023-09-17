import './Partie.css';
import Footer from '../Footer.js';
import {useState} from "react";
import {useParams} from "react-router-dom";

function Partie() {
    let {id} = useParams();

    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 70

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) =>{
        setTouchEnd(e.targetTouches[0].clientX)
        /* move the div according to the touchmove event */
        /* it should go to the right if the touche is going to the right and vice versa */
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isRightSwipe = distance < -minSwipeDistance
        if (isRightSwipe) {
            window.location.href = '/Parties'
        }
    }

    const parties = [
        {
            id: '1',
            nomPartie: 'La Jungle test de texte long',
            nbJoueurs: '5',
            nbDonne: '3',
            date: '15/09/2023',
            bannerGame: 'gens_heureux_qui_jouent.png',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '145'
        },
        {
            id: '2',
            nomPartie: 'Partie 2',
            nbJoueurs: '2',
            nbDonne: '10',
            date: '05/09/2023',
            bannerGame: 'gens_heureux_qui_jouent.png',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '195'
        },
        {
            id: '3',
            nomPartie: 'Partie 3',
            nbJoueurs: '4',
            nbDonne: '5',
            date: '05/09/2023',
            bannerGame: 'gens_heureux_qui_jouent.png',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '65'
        },
        {
            id: '4',
            nomPartie: 'Partie 4',
            nbJoueurs: '5',
            nbDonne: '3',
            date: '15/09/2023',
            bannerGame: 'gens_heureux_qui_jouent.png',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '145'
        },
        {
            id: '5',
            nomPartie: 'Partie 5',
            nbJoueurs: '2',
            nbDonne: '10',
            date: '05/09/2023',
            bannerGame: 'gens_heureux_qui_jouent.png',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '195'
        },
        {
            id: '6',
            nomPartie: 'Partie 6',
            nbJoueurs: '4',
            nbDonne: '5',
            date: '05/09/2023',
            bannerGame: 'gens_heureux_qui_jouent.png',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '65'
        },
        {
            id: '7',
            nomPartie: 'Partie 7',
            nbJoueurs: '5',
            nbDonne: '3',
            date: '15/09/2023',
            bannerGame: 'gens_heureux_qui_jouent.png',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '145'
        },
        {
            id: '8',
            nomPartie: 'Partie 8',
            nbJoueurs: '2',
            nbDonne: '10',
            date: '05/09/2023',
            bannerGame: 'gens_heureux_qui_jouent.png',
            pictureFirst: 'profile_picture_batman.png',
            pseudoFirst: 'Batman',
            scoreFirst: '195'
        }
    ];

    return (
        <div className='root_partie'>
            <div className='partie' onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                <img src={`/bannerPictures/${parties[id].bannerGame}`} alt="partie de tarot"/>
                <div className='partie-bottom'>
                    <h1>{parties[id].nomPartie}</h1>
                    <span>Débuté le {parties[id].date}</span>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Partie;
