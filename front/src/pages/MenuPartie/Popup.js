import plus_full_icon from "../../assets/plus_full.svg";
import './Popup.css'


function Popup({setDiplayed}){
    return (
        <div className='game-popup' id='gamePopup'>
            <div className='game-popup-content'>
                <div className='game-popup-banner'>
                    <img src={`/bannerPictures/gens_heureux_qui_jouent.png`} alt='banner'/>
                </div>
                <form className='game-popup-form'>
                    <div className='game-popup-form-title'>Créer une partie</div>
                    <div className='game-popup-form-input'>
                        <div>
                            <label htmlFor='gameName'>Nom de la partie</label>
                            <input type='text' id='gameName' name='gameName' placeholder='Nom de la partie'/>
                        </div>
                        <div>
                            <div className='add_player_card'>
                                <img src={plus_full_icon} alt="ajouter"/>
                                <span>Ajouter</span>
                            </div>
                        </div>
                    </div>
                    <div className='button-area'>
                        <button>Ajouter</button>
                        <span onClick={()=>setDiplayed(false)}>Annuler</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Popup
