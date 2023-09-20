import Card from './Card.js';
import Popup from "./Popup";
import './MenuPartie.css';
import {useState} from "react";
import plus_icon from '../../assets/plus.svg';

function MenuPartie() {
    const [isPopupDisplayed, setPopupDiplayed] = useState(false)

    /* if popup opened, the user can't scroll the body */
    if (isPopupDisplayed) {
        document.body.style.overflow = 'hidden'
    }else{
        document.body.style.overflow = 'unset'
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

        <div className='cards-area'>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" fill="none" className='backarrow' onClick={() => window.location.href = '/'}>
                <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM33 10.5L2 10.5L2 13.5L33 13.5L33 10.5Z"/>
            </svg>
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
