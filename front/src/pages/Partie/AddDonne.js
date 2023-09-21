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
                        <div className='preneur'>
                            <h3>Preneur</h3>
                            <div className='players_cards_add_donne'>
                                <input type="radio" id="preneur_1" name="preneur" value="preneur" />
                                <label htmlFor="preneur_1">
                                    <div className='add_player_card'>
                                        <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                        <span>test</span>
                                    </div>
                                </label>

                                <input type="radio" id="preneur_2" name="preneur" value="preneur" />
                                <label htmlFor="preneur_2"><div className='add_player_card'>
                                <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                <span>test</span>
                            </div></label>

                                <input type="radio" id="preneur_3" name="preneur" value="preneur" />
                                <label htmlFor="preneur_3"><div className='add_player_card'>
                                    <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                    <span>test</span>
                                </div></label>

                                <input type="radio" id="preneur_4" name="preneur" value="preneur" />
                                <label htmlFor="preneur_4"><div className='add_player_card'>
                                    <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                    <span>test</span>
                                </div></label>

                                <input type="radio" id="preneur_5" name="preneur" value="preneur" />
                                <label htmlFor="preneur_5"><div className='add_player_card'>
                                    <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                    <span>test</span>
                                </div></label>

                                <input type="radio" id="preneur_6" name="preneur" value="preneur" />
                                <label htmlFor="preneur_6"><div className='add_player_card'>
                                <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                <span>test</span>
                            </div></label>
                            </div>
                        </div>
                        <div className='choisis'>
                            <h3>Choisis :</h3>
                            <div className='players_cards_add_donne'>
                                <input type="radio" id="choisis_1" name="choisis" value="choisis" />
                                <label htmlFor="choisis_1">
                                    <div className='add_player_card'>
                                        <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                        <span>test</span>
                                    </div>
                                </label>

                                <input type="radio" id="choisis_2" name="choisis" value="choisis" />
                                <label htmlFor="choisis_2"><div className='add_player_card'>
                                    <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                    <span>test</span>
                                </div></label>

                                <input type="radio" id="choisis_3" name="choisis" value="choisis" />
                                <label htmlFor="choisis_3"><div className='add_player_card'>
                                    <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                    <span>test</span>
                                </div></label>

                                <input type="radio" id="choisis_4" name="choisis" value="choisis" />
                                <label htmlFor="choisis_4"><div className='add_player_card'>
                                    <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                    <span>test</span>
                                </div></label>

                                <input type="radio" id="choisis_5" name="choisis" value="choisis" />
                                <label htmlFor="choisis_5"><div className='add_player_card'>
                                    <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                    <span>test</span>
                                </div></label>

                                <input type="radio" id="choisis_6" name="choisis" value="choisis" />
                                <label htmlFor="choisis_6"><div className='add_player_card'>
                                <img src={`/profilePictures/pp0.png`} alt="ajouter"/>
                                <span>test</span>
                            </div></label>
                            </div>
                        </div>
                        <div className='contrat'>
                            <h3>Contrat :</h3>
                            <input type="radio" id="contrat_0" name="contrat" value="Petite" />
                            <label htmlFor="contrat"><span>Petite</span></label>
                            <input type="radio" id="contrat_1" name="contrat" value="Garde" />
                            <label htmlFor="contrat"><span>Garde</span></label>
                            <input type="radio" id="contrat_2" name="contrat" value="Garde sans" />
                            <label htmlFor="contrat"><span>Garde sans</span></label>
                            <input type="radio" id="contrat_3" name="contrat" value="Garde contre" />
                            <label htmlFor="contrat"><span>Garde contre</span></label>
                        </div>
                        <div className='points'>
                            <label htmlFor="points">Nombre de point du vainqueur :</label>
                            <input type="number" id="points" name="points" min="0" max="91" />
                        </div>
                        <div className='contrat_valide'>
                            <label htmlFor="contrat_valide">Contrat validé ?</label>
                            <input type="radio" id="contrat_valide" name="contrat_valide" value="oui" />
                            <input type="radio" id="contrat_valide" name="contrat_valide" value="non" />
                        </div>





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
