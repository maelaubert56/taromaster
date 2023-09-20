import './Partie.css';
import Footer from '../Footer.js';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios"
import Popup from "../MenuPartie/Popup"

function Partie() {

    let {id} = useParams();
    const [partie, setPartie] = useState(null)
    const [isOpen, setPopupDiplayed] = useState(false)
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
            })
            let arr = []
            for(let i=0; i<partie.playerInGames.length; i++){
                arr.push(partie.playerInGames[i].joueur)
            }
            setPlayers(arr)
        }
    }, [partie, isOpen])


    return (
        <div className='root_partie'>

            {isOpen && players && <Popup setPopupDiplayed={setPopupDiplayed} playersList={players} partie={partie} />}

            {partie && !isOpen && <div className='partie'>
                <img src="/edit.png" alt="Edit" style={{width: "30px"}} onClick={() => setPopupDiplayed(true)} />
                <img src={`/bannerPictures/banner${partie.banner}.png`} alt="partie de tarot"/>
                <div className='partie-bottom'>
                    <h1>{partie.name}</h1>
                    <span>Débuté le {partie.createdAt}</span>
                     
                    <p>{partie.donnes.length} donnes</p>
                    <p>{partie.playerInGames.length} joueurs</p>


                    {partie.playerInGames.map((player, index) => (
                        <div key={index}>
                            <p>{player.joueur.username}</p>
                            <p>{player.points}</p>
                        </div>
                    ))}

                    <p>Ajouter une donne</p>

                </div>

            </div>}


            <Footer/>
        </div>
    );
}

export default Partie;
