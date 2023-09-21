import Card from './Card.js';
import Popup from "./Popup";
import './MenuPartie.css';
import {useState, useEffect} from "react";
import plus_icon from '../../assets/plus.svg';
import axios from "axios"
import { format } from 'date-fns';

function MenuPartie() {
    const [isPopupDisplayed, setPopupDiplayed] = useState(false)
    const [parties, setParties] = useState([])
    const [session, setSession] = useState(sessionStorage.getItem("session"))


    useEffect(() => {
        if(session)
            axios.get(`${process.env.REACT_APP_API}/users/${session.username}`).then(res => {
                setParties(res.data.playerInGames)
            })
        else{
            window.location.href = "/account"
        }
    }, [isPopupDisplayed])



    /* if popup opened, the user can't scroll the body */
    if (isPopupDisplayed) {
        document.body.style.overflow = 'hidden'
    }else{
        document.body.style.overflow = 'unset'
    }



    return (

        <div className='cards-area'> 
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" fill="none" className='backarrow' onClick={() => window.location.href = '/'}>
                <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM33 10.5L2 10.5L2 13.5L33 13.5L33 10.5Z"/>
            </svg>
            {session && parties.length > 0 && parties.map((partie, index) => (
                <Card
                    index={index}
                    id={partie.idPartie}
                    nomPartie={partie.partie.name}
                    nbJoueurs={partie.partie.playerInGames.length}
                    nbDonne={partie.partie.donnes.length}
                    date={format(new Date(partie.partie.createdAt), "dd/LL/yyyy")}
                    pictureFirst={partie.partie.playerInGames.length > 0 ? `pp${partie.partie.playerInGames[0].joueur.avatar}.png` : ""}
                    pseudoFirst={partie.partie.playerInGames.length > 0 ? partie.partie.playerInGames[0].joueur.username : "Aucun"}
                    scoreFirst={partie.partie.playerInGames.length > 0 ?  partie.partie.playerInGames[0].points : "0"}
                />
            ))
            }

            <div className='bottom-gradient'></div>
            <div className='add-game' onClick={()=>setPopupDiplayed(true)}><img src={plus_icon} alt="ajouter"/></div>

            {isPopupDisplayed && <Popup setPopupDiplayed={setPopupDiplayed}/>}
        </div>
    );
}

export default MenuPartie
