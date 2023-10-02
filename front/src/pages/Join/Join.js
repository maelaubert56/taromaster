import "./Join.css"
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import cross from "../../assets/cross.png"
import check from "../../assets/check.png"

const Join = () => {

    const {max_date, id_partie} = useParams()
    const [isValid, setisValid] = useState((new Date()).getTime() <= parseInt(max_date))
    const [session, setSession] = useState(JSON.parse(sessionStorage.getItem("session")))
    const [error, setError] = useState(null)

    useEffect(() => {
        if(session)
            axios.get(`${process.env.REACT_APP_API}/playeringame/join/${max_date}/${id_partie}/${session.idUser}`).then(res => {
                window.location.href = `/partie/${id_partie}`
            }).catch(e => {
                setError(e.response.data)
            })
    }, [])


    return(
        <div>
            {isValid
                ? session
                    ? error
                        && <div className="content">
                            <img src={cross} alt="Cross" className="cross" />
                            <p>{error}</p>
                            <a href="/parties">Voir mes parties</a>
                        </div>
                    : <div className='content'>
                        <img src={cross} alt="Cross" className="cross" />
                        <p>Connectez vous pour pouvoir rejoindre une partie via ce lien !</p>
                        <a href="/account">Se connecter</a>
                    </div>
                : <div className="content">
                    <img src={cross} alt="Cross" className="cross" />
                    <p>Ce lien ne fonctionne malheureusement plus :{"("}</p>
                </div>
            }
        </div>
    )
}

export default Join