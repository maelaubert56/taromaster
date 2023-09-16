import './Card.css'
import {useEffect} from "react";
function Card(props){

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
        <div className='card'>
            <div className='top-card'>
                <div className='top-left-card'>
                    <span>Donne</span>
                    <span className='value'>{props.nbDonne}</span>
                </div>
                <div className='top-middle-card'>
                    <div className='corner-left'></div>
                    <div className='corner-color-div'><span>{props.nomPartie}</span></div>
                    <div className='corner-right'></div>
                </div>
                <div className='top-right-card'>
                    <span>Joueurs</span>
                    <span className='value'>{props.nbJoueurs}</span>
                </div>
            </div>
            <div className='middle-card'>
                <span>1er</span>
                <div>
                    <img src={`/profilePictures/${props.pictureFirst}`} alt="profile"/>
                    <span>{props.pseudoFirst}</span>
                </div>
                <span className='score'>
                    {props.scoreFirst}
                    <span>point</span>
                </span>
            </div>
            <div className='bottom-card'>
                <i>derniere donne le {props.date}</i>
            </div>
        </div>

    );

}


export default Card;