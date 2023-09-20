import Card from './Card.js';
import Popup from "./Popup";
import './MenuPartie.css';
import {useState} from "react";
import plus_icon from '../../assets/plus.svg';

function MenuPartie() {

    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [isPopupDisplayed, setPopupDiplayed] = useState(false)

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
            window.location.href = '/'
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

        <div className='cards-area' onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {parties.map((partie, index) => (
                <Card
                    key={index}
                    id={partie.id}
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
            <div className='add-game' onClick={()=>setPopupDiplayed(true)}><img src={plus_icon} alt="ajouter"/></div>

            {isPopupDisplayed && <Popup setPopupDiplayed={setPopupDiplayed}/>}
        </div>
    );
}

export default MenuPartie
