import plus_full_icon from "../../assets/plus_full.svg";
import './AddDonne.css'
import {useEffect, useState} from "react";
import { useForm } from "react-hook-form"
import axios from "axios"


function AddDonne({setAddDonneDiplayed}){
    // TEMP
    const donne_number = 1
    // TEMP



    const handleClickOutside = (e) => {
        if (e.target.className === 'donne-popup') {
            setAddDonneDiplayed(false)
        }
    }

    return (
        <div className='donne-popup' onClick={handleClickOutside}>
            <div className='donne-popup-content'>
                <form className='game-popup-form'>
                    <div className='game-popup-form-title'>Nouvelle donne</div>
                    <div className='game-popup-form-input'>
                        <div>
                            {/*<div className='players'>
                                {players && players.map((player, index) => (
                                    <div className='add_player_card' key={index}>
                                        {player.idUser != user.idUser && <img src="/delete.png" class="delete" alt="Delete" onClick={() => deleteElement(index)} />}
                                        <img src={`/profilePictures/pp${player.avatar}.png`} alt="ajouter"/>
                                        <span>{player.username}</span>
                                    </div>
                                ))}
                            </div>*/}
                        </div>
                    </div>
                    <div className='button-area'>
                        <button>Ajouter</button>
                        <span onClick={()=>setAddDonneDiplayed(false)}>Annuler</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDonne
