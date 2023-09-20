import plus_full_icon from "../../assets/plus_full.svg";
import './Popup.css'
import UsersList from "./UsersList.js";
import {useState} from "react";


function Popup({setPopupDiplayed}){


    const [isUsersListDisplayed, setUsersListDiplayed] = useState(false)

    /* if the user clicks outside the popup, the popup is closed */
    const handleClickOutside = (e) => {
        if (e.target.className === 'game-popup') {
            setPopupDiplayed(false)
        }
    }


    return (
        <div className='game-popup' onClick={handleClickOutside}>
            <div className='game-popup-content'>
                <div className='game-popup-banner'>
                    <img src={`/bannerPictures/gens_heureux_qui_jouent.png`} alt='banner'/>
                </div>
                <form className='game-popup-form'>
                    <div className='game-popup-form-title'>Créer une partie</div>
                    <div className='game-popup-form-input'>
                        <div className='gameName'>
                            <input type='text' id='gameName' name='gameName' placeholder='Nom de la partie'/>
                        </div>
                        <div>
                            <label htmlFor='addPlayers'>Ajoutez des joueurs :</label>
                            <div className='players'>
                                <div onClick={()=>setUsersListDiplayed(true)} className='add_player_card'>
                                    <img src={plus_full_icon} alt="ajouter"/>
                                    <span>Ajouter</span>
                                </div>
                                <div className='add_player_card'>
                                    <img src={plus_full_icon} alt="ajouter"/>
                                    <span>Ajouter</span>
                                </div>
                                <div className='add_player_card'>
                                    <img src={plus_full_icon} alt="ajouter"/>
                                    <span>Ajouter</span>
                                </div>
                                <div className='add_player_card'>
                                    <img src={plus_full_icon} alt="ajouter"/>
                                    <span>Ajouter</span>
                                </div>
                                <div className='add_player_card'>
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
            {isUsersListDisplayed && <UsersList isUsersListDisplayed={setUsersListDiplayed}/>}
        </div>
    );
}

export default Popup
