import plus_full_icon from "../../assets/plus_full.svg";
import './Popup.css'
import UsersList from "./UsersList.js";
import {useState} from "react";
import { useForm } from "react-hook-form"
import axios from "axios"


function Popup({setPopupDiplayed}){

    const [players, setPlayers] = useState([])
    const [isUsersListDisplayed, setUsersListDiplayed] = useState(false)

    /* if the user clicks outside the popup, the popup is closed */
    const handleClickOutside = (e) => {
        if (e.target.className === 'game-popup') {
            setPopupDiplayed(false)
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const {gameName} = data
        const res = await axios.post(`${process.env.REACT_APP_API}/parties/create`, {
            name: gameName,
            banner: 0
        })
        for(let i=0; i<players.length; i++){
            const obj = {
                id_joueur: players[i].idUser,
                id_partie: res.data.idPartie,
                points: 0
            }
            axios.post(`${process.env.REACT_APP_API}/playeringame/create`, obj)
            setPopupDiplayed(false)
        }
    }




    return (
        <div className='game-popup' onClick={handleClickOutside}>
            <div className='game-popup-content'>
                <div className='game-popup-banner'>
                    <img src={`/bannerPictures/gens_heureux_qui_jouent.png`} alt='banner'/>
                </div>
                <form className='game-popup-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='game-popup-form-title'>Créer une partie</div>
                    <div className='game-popup-form-input'>
                        <div className='gameName'>
                            <input type='text' id='gameName' name='gameName' placeholder='Nom de la partie' {...register("gameName")} />
                        </div>
                        <div>
                            <label htmlFor='addPlayers'>Ajoutez des joueurs :</label>
                            <div className='players'>
                                {players.map((player, index) => (
                                    <div className='add_player_card' key={index}>
                                        <img src={`/profilePictures/pp${player.avatar}.png`} alt="ajouter"/>
                                        <span>{player.username}</span>
                                    </div>
                                ))}
                                <div onClick={()=>setUsersListDiplayed(true)} className='add_player_card'>
                                    <img src={plus_full_icon} alt="ajouter"/>
                                    <span>Ajouter</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='button-area'>
                        <button>Ajouter</button>
                        <span onClick={()=>setPopupDiplayed(false)}>Annuler</span>
                    </div>
                </form>
            </div>
            {isUsersListDisplayed && <UsersList setPlayers={setPlayers} players={players} setUsersListDiplayed={setUsersListDiplayed}/>}
        </div>
    );
}

export default Popup
