import './Card.css'
import {useEffect} from "react";
function Card({index, id, nbDonne, nomPartie, date, pictureFirst, scoreFirst, pseudoFirst, nbJoueurs}){

    return(
        <a href={`/partie/${id}`} className='card' key={index}>
            <div className='top-card'>
                <div className='top-left-card'>
                    <span>Donnes</span>
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
                <p>1<span>er</span></p>
                <div>
                    <img src={`/profilePictures/${pictureFirst}`} alt="profile"/>
                    <span>{pseudoFirst}</span>
                </div>
                <span className='score'>
                    {scoreFirst}
                    <span>{scoreFirst > 1 ? " points" : " point"}</span>
                </span>
            </div>
        </a>

    );

}


export default Card;