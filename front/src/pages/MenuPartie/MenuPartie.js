import Card from './Card.js';
import Popup from "./Popup";
import './MenuPartie.css';
import {useState, useEffect} from "react";
import plus_icon from '../../assets/plus.svg';
import axios from "axios"
import { format } from 'date-fns';

function MenuPartie() {

    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [isPopupDisplayed, setPopupDiplayed] = useState(false)
    const [parties, setParties] = useState([])

    useEffect(() => {
        const {username} = JSON.parse(sessionStorage.getItem("session"))
        axios.get(`${process.env.REACT_APP_API}/users/${username}`).then(res => {
            setParties(res.data.playerInGames)
        })
    }, [isPopupDisplayed])



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


    return (

        <div className='cards-area' onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {parties.length > 0 && parties.map((partie, index) => (
                <Card
                    key={index}
                    id={partie.id}
                    nomPartie={partie.partie.name}
                    nbJoueurs={partie.partie.playerInGames.length}
                    nbDonne={partie.partie.donnes.length}
                    date={format(new Date(partie.partie.createdAt), "dd/LL/yyyy")}
                    pictureFirst={partie.partie.playerInGames.length > 0 ? `pp${partie.partie.playerInGames[0].joueur.avatar}.png` : ""}
                    pseudoFirst={partie.partie.playerInGames.length > 0 ? partie.partie.playerInGames[0].joueur.username : "Aucun"}
                    scoreFirst={partie.partie.playerInGames.length > 0 ?  partie.partie.playerInGames[0].points : "0"}
                />
            ))}

            <div className='bottom-gradient'></div>
            <div className='add-game' onClick={()=>setPopupDiplayed(true)}><img src={plus_icon} alt="ajouter"/></div>

            {isPopupDisplayed && <Popup setPopupDiplayed={setPopupDiplayed}/>}
        </div>
    );
}

export default MenuPartie
