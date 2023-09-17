import './Card.css'
import {useEffect} from "react";
function Card({key, id, nbDonne, nomPartie, date, pictureFirst, scoreFirst, pseudoFirst, nbJoueurs}){

    useEffect(() => {
        var div = document.querySelector('.corner-color-div span');
        /* if the string is more than 10 characters, we cut it */
        var nbCharac = div.innerHTML.length;
        if(nbCharac > 15){
            // only let 10 characters and add '...' at the end
            div.innerHTML = div.innerHTML.substring(0, 10) + '...';
        }
    }, []);

    return(
        <a href={`/partie/${id}`} className='card'>
            <div className='top-card'>
                <div className='top-left-card'>
                    <span>Donne</span>
                    <span className='value'>{nbDonne}</span>
                </div>
                <div className='top-middle-card'>
                    <div className='corner-left'></div>
                    <div className='corner-color-div'><span>{nomPartie}</span></div>
                    <div className='corner-right'></div>
                </div>
                <div className='top-right-card'>
                    <span>Joueurs</span>
                    <span className='value'>{nbJoueurs}</span>
                </div>
            </div>
            <div className='middle-card'>
                <span>1er</span>
                <div>
                    <img src={`/profilePictures/${pictureFirst}`} alt="profile"/>
                    <span>{pseudoFirst}</span>
                </div>
                <span className='score'>
                    {scoreFirst}
                    <span>point</span>
                </span>
            </div>
            <div className='bottom-card'>
                <i>derniere donne le {date}</i>
            </div>
        </a>

    );

}


export default Card;