import plus_full_icon from "../../assets/plus_full.svg";
import './Popup.css'
import UsersList from "./UsersList.js";
import {useEffect, useState} from "react";
import { useForm } from "react-hook-form"
import axios from "axios"


function Popup({setPopupDiplayed, playersList, partie}){

    const user = JSON.parse(sessionStorage.getItem("session"))
    const [players, setPlayers] = useState(playersList ?? [user])
    const [isUsersListDisplayed, setUsersListDiplayed] = useState(false)
    const [toDelete, setToDelete] = useState([])


    /* if the user clicks outside the popup, the popup is closed */
    const handleClickOutside = (e) => {
        if (e.target.className === 'game-popup') {
            setPopupDiplayed(false)
        }
    }

    const isPresent = (userId) => {
        for(let i=0; i<playersList.length; i++){
            if(playersList[i].idUser === userId) return true
        }
        return false
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const {gameName} = data

        if(!partie){
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
                await axios.post(`${process.env.REACT_APP_API}/playeringame/create`, obj)
            }
        }else{
            const res = await axios.post(`${process.env.REACT_APP_API}/parties/update/${partie.idPartie}`, {
                name: gameName,
                banner: 0
            })
            for(let i=0; i<players.length; i++){
                const obj = {
                    id_joueur: players[i].idUser,
                    id_partie: res.data.idPartie,
                    points: 0
                }
                if(!isPresent(players[i].idUser))
                    await axios.post(`${process.env.REACT_APP_API}/playeringame/create`, obj)
            }

            for(let i=0; i<toDelete.length; i++){
                await axios.delete(`${process.env.REACT_APP_API}/playeringame/${res.data.idPartie}/${toDelete[i]}`)
            }



        }
        setPopupDiplayed(false)
    }


    const deleteElement = (index) => {
        setToDelete([...toDelete, players[index].idUser])
        setPlayers(players.filter((player, key) => key !== index))
    }




    return (
        <div className='game-popup' onClick={handleClickOutside}>
            <div className='game-popup-content'>
                <div className='game-popup-banner'>
                    <img src={`/bannerPictures/gens_heureux_qui_jouent.png`} alt='banner'/>
                </div>
                <form className='game-popup-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='game-popup-form-title'>{partie ? "Modifier la partie" : "Créer une partie"}</div>
                    <div className='game-popup-form-input'>
                        <div className='gameName'>
                            <input type='text' id='gameName' name='gameName' placeholder='Nom de la partie' {...register("gameName")} defaultValue={partie ? partie.name : null} required />
                        </div>
                        <div>
                            <label htmlFor='addPlayers'>Ajoutez des joueurs :</label>
                            <div className='players'>
                                {players && players.map((player, index) => (
                                    <div className='add_player_card' key={index}>
                                        {player.idUser !== user.idUser && <img src="/delete.png" class="delete" alt="Delete" onClick={() => deleteElement(index)} />}
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
                        <button>{partie ? "Enregistrer" : "Valider"}</button>
                        <span onClick={()=>setPopupDiplayed(false)}>Annuler</span>
                    </div>
                </form>
            </div>
            {isUsersListDisplayed && <UsersList setPlayers={setPlayers} players={players} old={players} setUsersListDiplayed={setUsersListDiplayed} />}
        </div>
    );
}

export default Popup
