import './Partie.css';
import Footer from '../Footer.js';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios"
import Popup from "../MenuPartie/Popup"
import AddDonne from "./AddDonne"
import plus_icon from "../../assets/plus.svg";

function Partie() {

    let {id} = useParams();
    const [partie, setPartie] = useState(null)
    const [isOpen, setPopupDiplayed] = useState(false)
    const [addDonneDisplayed, setAddDonneDiplayed] = useState(false)
    const [players, setPlayers] = useState(null)


    useEffect(() => {
        if(!partie){
            axios.get(`${process.env.REACT_APP_API}/parties/${id}`).then(res => {
                setPartie(res.data)
            })
        }
        else{
            axios.get(`${process.env.REACT_APP_API}/parties/${id}`).then(res => {
                setPartie(res.data)
                let arr = []
                for(let i=0; i<res.data.playerInGames.length; i++){
                    arr.push(res.data.playerInGames[i].joueur)
                }
                setPlayers(arr)
            })
        }
    }, [isOpen, addDonneDisplayed])


    return (
        <div className='root_partie'>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" fill="none" className='backarrow' onClick={() => window.location.href = '/parties'}>
                <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM33 10.5L2 10.5L2 13.5L33 13.5L33 10.5Z"/>
            </svg>
            {isOpen && players && <Popup setPopupDiplayed={setPopupDiplayed} playersList={players} partie={partie} />}

            {partie && !isOpen && <div className='partie'>
                <img src={`/bannerPictures/banner${partie.banner}.png`} alt="partie de tarot"/>
                <div className='partie-bottom'>
                    <h1>{partie.name}</h1>
                    <div className='partie-bottom-infos'>
                        <span>Donnes<span className='data_partie'>{partie.donnes.length}</span></span>
                        <span>Joueurs<span className='data_partie'>{partie.playerInGames.length}</span></span>
                    </div>
                    <div className='classement'>
                        {partie.playerInGames.map((player, index) => (
                            <div key={index}>
                                <p>{index+1}<span className='n-eme'>{index === 0 ? "er" : "ème"}</span></p>
                                <div>
                                    <img src={`/profilePictures/pp${player.joueur.avatar}.png`} alt="profile" />
                                    <p>{player.joueur.username}</p>
                                </div>
                                <p>{player.points} points</p>
                            </div>
                        ))}
                    </div>
                    <span className='date_partie'>Débuté le {partie.createdAt.split("T")[0]} à {partie.createdAt.split("T")[1].split(".")[0][0]+partie.createdAt.split("T")[1].split(".")[0][1]}:{partie.createdAt.split("T")[1].split(".")[0][3]+partie.createdAt.split("T")[1].split(".")[0][4]}</span>
                    <div className='stats'></div>

                    <div className='add-donne' onClick={()=>setAddDonneDiplayed(true)}><img src={plus_icon} alt="ajouter"/></div>

                    <div className='edit_partie' onClick={() => setPopupDiplayed(true)}><img src="/edit.png" alt="Edit" style={{width: "30px"}}  /></div>
                </div>
            </div>}
            {addDonneDisplayed &&
                <AddDonne setAddDonneDiplayed={setAddDonneDiplayed} partie={partie} />
            }

        </div>
    );
}

export default Partie;
