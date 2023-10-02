import plus_full_icon from "../../assets/plus_full.svg";
import './AddDonne.css'
import {useEffect, useState} from "react";
import { useForm } from "react-hook-form"
import axios from "axios"
import {computePoints} from "../../helpers";


function AddDonne({setAddDonneDiplayed, partie}){

    const [preneurSelected, preneurSetSelected] = useState(null)
    const [choisiSelected, choisiSetSelected] = useState(null)
    const [indexContratSelected, setIndexContratSelected] = useState(null)
    const [validated, setValidated] = useState(true)
    const [petitLastPliAttaque, setPetitLastPliAttaque] = useState(false)
    const [petitLastPliDefense, setPetitLastPluDefense] = useState(false)
    const [indexBoutsSelected, setIndexBoutsSelected] = useState(null)
    const [ptsAttaque, setPtsAttaque] = useState("")

    const contrats = [
        {
            title: "Petite",
            coef: 1
        },
        {
            title: "Garde",
            coef: 2
        },
        {
            title: "Garde sang",
            coef: 4
        },
        {
            title: "Garde contre",
            coef: 6
        }
    ]

    const targets = [
        {
            bouts: 0,
            target: 0
        },
        {
            bouts: 1,
            target: 51
        },
        {
            bouts: 2,
            target: 41
        },
        {
            bouts: 3,
            target: 36
        }
    ]

    const handleClickOutside = (e) => {
        if (e.target.className === 'donne-popup') {
            setAddDonneDiplayed(false)
        }
    }

    const getIdOnly = (arr) => {
        let tab = []
        for(let i=0; i<arr.length; i++){
            tab.push(arr[i].joueur.idUser)
        }
        return tab
    }

    const onSubmit = async () => {

        if(preneurSelected != null && indexContratSelected != null && indexBoutsSelected != null){

            const getPartie = await axios.get(`${process.env.REACT_APP_API}/parties/${partie.idPartie}`)

            const updateDate = await axios.post(`${process.env.REACT_APP_API}/parties/update/${partie.idPartie}`,{
                createdAt: new Date(),
                nbDonnes: getPartie.data.nbDonnes + 1
            })

            if(updateDate){

                const res = computePoints(
                    partie.playerInGames.length,
                    partie.playerInGames[preneurSelected].joueur.idUser,
                    choisiSelected ? partie.playerInGames[choisiSelected].joueur.idUser : null,
                    getIdOnly(partie.playerInGames.filter((player) => player.joueur.idUser !== partie.playerInGames[preneurSelected].joueur.idUser && player.joueur.idUser !== preneurSelected ? partie.playerInGames[preneurSelected].joueur.idUser : null)),
                    contrats[indexContratSelected].coef,
                    targets[indexBoutsSelected].target,
                    ptsAttaque >= targets[indexBoutsSelected].target,
                    petitLastPliAttaque,
                    petitLastPliDefense,
                    ptsAttaque
                )

                if(res){
                    for(let i=0; i<res.length; i++){
                        const response = await axios.get(`${process.env.REACT_APP_API}/playeringame/${partie.idPartie}/${res[i].id}`)
                        const old_points = response.data.points
                        const res2 = await axios.post(`${process.env.REACT_APP_API}/playeringame/update/${partie.idPartie}/${res[i].id}`, {
                            points: old_points + res[i].points
                        })
                    }
                    setAddDonneDiplayed(false)
                }
                

            }
        }
    }

    return (
        <div className='donne-popup' onClick={handleClickOutside}>
            <div className='donne-popup-content'>
                <div className='game-popup-form'>
                    <div className='game-popup-form-title'>Nouvelle donne</div>
                    <div className='game-popup-form-input'>
                        <div className='preneur'>
                            <h3>Preneur</h3>
                            <div className='players_cards_add_donne'>
                                
                                {partie.playerInGames.map((player, index) => (
                                    <div onClick={() => preneurSetSelected(index)} id={index} style={preneurSelected === index ? { backgroundColor: "white" } : undefined}>
                                        <img src={`/profilePictures/pp${player.joueur.avatar}.png`} alt="Profile Pic" />
                                        <p>{player.joueur.username}</p>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {partie.playerInGames.length >= 5 && <div className='choisis'>
                            <h3>Choisis :</h3>
                            <div className='players_cards_add_donne'>

                                {partie.playerInGames.map((player, index) => (
                                    <div onClick={() => choisiSetSelected(index)} id={index} style={choisiSelected === index ? { backgroundColor: "white" } : undefined}>
                                        <img src={`/profilePictures/pp${player.joueur.avatar}.png`} alt="Profile Pic" />
                                        <p>{player.joueur.username}</p>
                                    </div>
                                ))}  

                            </div>
                        </div>}

                        <div className='contrat'>
                            <h3>Contrat</h3>
                            {contrats.map((contrat, index) => (
                                <p onClick={() => setIndexContratSelected(index)} style={index === indexContratSelected ? { backgroundColor: "white" } : undefined} key={index}>{contrat.title}</p>
                            ))}
                        </div>

                        <div className='contrat'>
                            <h3>Nombre de bouts</h3>
                            {targets.map((target, index) => (
                                <p onClick={() => setIndexBoutsSelected(index)} style={index === indexBoutsSelected ? { backgroundColor: "white" } : undefined} key={index}>{target.bouts}</p>
                            ))}
                        </div>
                        
                        <div className='points'>
                            <label htmlFor="points">Nombre de point attaque</label>
                            <input type="number" id="points" name="points" min="0" max="91" required value={ptsAttaque} onChange={(e) => setPtsAttaque(parseInt(e.target.value))} />
                        </div>

                        {/* <div className='contrat_valide'>
                            <label>Contrat validé ?</label>
                            <p onClick={() => setValidated(true)} style={validated ? {border: "2px solid green"} : null}>OUI</p>
                            <p onClick={() => setValidated(false)} style={!validated ? {border: "2px solid red"} : null}>NON</p>
                        </div> */}

                        <div className='contrat_valide'>
                            <label>Le petit au dernier pli</label>
                            <p onClick={() => {setPetitLastPliAttaque(!petitLastPliAttaque) ; setPetitLastPluDefense(false)}} style={petitLastPliAttaque ? {backgroundColor: "white"} : null}>Attaque</p>
                            <p onClick={() => {setPetitLastPluDefense(!petitLastPliDefense) ; setPetitLastPliAttaque(false) }} style={petitLastPliDefense ? {backgroundColor: "white"}: null}>Défense</p>
                        </div>

                    </div>
                    <div className='button-area'>
                        <button onClick={onSubmit}>Ajouter</button>
                        <span onClick={()=>setAddDonneDiplayed(false)}>Annuler</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDonne
