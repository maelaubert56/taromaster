import "./Account.css"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
import ChooseAvatar from "./ChooseAvatar";
import logo from "../../assets/logo-0.5.png"
const salt = bcrypt.genSaltSync(10)

function Account() {

    const [login, setLogin] = useState(true)
    const [error, setError] = useState(null)
    const [avatar, setAvatar] = useState(JSON.parse(localStorage.getItem("session")) ? JSON.parse(localStorage.getItem("session")).avatar : 0)
    const [logged, setLogged] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();


    useEffect(() => {
        if(localStorage.getItem("session")) setLogged(true);//TODO: redirect to account
    }, [logged])

    const createSession = (user) => {
        localStorage.setItem("session", JSON.stringify(user))
        setLogged(true)
        window.location.href='/'
    }

    const deconnexion = () => {
        localStorage.removeItem("session")
        setLogged(false)
    }

    const onSubmitLogin = async (data) => {
        const {username, password} = data
        username.toLowerCase()
        console.log(`${process.env.REACT_APP_API}/users/${username}`)
        const user = await axios.get(`${process.env.REACT_APP_API}/users/${username}`)
        if(user.data){
            if(bcrypt.compareSync(password, user.data.password)) createSession(user.data)
        }
        else{
            setError("Nom d'utilisateur ou mot de passe incorrects !")
        }
    }

    const onSubmitRegister = async (data) => {
        const {username, firstName, lastName, password} = data
        username.toLowerCase()
        const new_password = bcrypt.hashSync(password, salt);
        axios.post(`${process.env.REACT_APP_API}/users/create`, {
            username,
            firstName,
            lastName,
            avatar,
            password: new_password
        }).then((res) => {
            createSession(res.data)
        }).catch(e => {
            setError("Ce nom d'utilisateur est déjà utilisé !")
        })
    }

    const onSubmitEdit = async (data) => {
        const {firstName, lastName} = data
        const res = await axios.post(`${process.env.REACT_APP_API}/users/update/${JSON.parse(localStorage.getItem("session")).username}`, {
            firstName,
            lastName,
            avatar
        })
        localStorage.setItem("session", JSON.stringify(res.data))
    }

    return (
        <div className="account_page_root">
            {logged ?
                <div className='account_page'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" fill="none" className='backarrow' onClick={() => window.location.href = '/'}>
                        <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM33 10.5L2 10.5L2 13.5L33 13.5L33 10.5Z"/>
                    </svg>
                    <img src={logo} alt="logo" className='account_logo'/>
                    <form onSubmit={handleSubmit(onSubmitEdit)} className='form_register'>
                        <ChooseAvatar avatar={avatar} setAvatar={setAvatar} />
                        <p className='username_form'><u>Username</u> : <i>{JSON.parse(localStorage.getItem("session")).username}</i></p>
                        <input type="text" {...register("firstName")} placeholder="Prénom" defaultValue={JSON.parse(localStorage.getItem("session")).firstName} />
                        <input type="text" {...register("lastName")} placeholder="Nom" defaultValue={JSON.parse(localStorage.getItem("session")).lastName} />

                        <input type="submit" value="Appliquer" />
                        <p onClick={deconnexion} className='deconnexion'>Se déconnecter</p>
                    </form>
                </div>
            :
                <div className='account_page'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" fill="none" className='backarrow' onClick={() => window.location.href = '/'}>
                        <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM33 10.5L2 10.5L2 13.5L33 13.5L33 10.5Z"/>
                    </svg>
                    <img src={logo} alt="logo" className='account_logo'/>
                    {error && <p>{error}</p>}
                    {login ?
                    <form onSubmit={handleSubmit(onSubmitLogin)} className='form_login'>
                        <input type="text" {...register("username")} placeholder="Username" />
                        <input type="password" {...register("password")} placeholder="Mot de passe" />
                        <input type="submit" value="Se connecter" />
                        <p>Pas encore de compte ?</p>
                        <p onClick={() => setLogin(false)} className='change_type'>Inscrivez vous</p>
                    </form>
                        :
                    <form onSubmit={handleSubmit(onSubmitRegister)} className='form_register'>
                        <ChooseAvatar avatar={avatar} setAvatar={setAvatar} />
                        <input type="text" {...register("username")} placeholder="Nom d'utilisateur" />
                        <input type="text" {...register("lastName")} placeholder="Nom" />
                        <input type="text" {...register("firstName")} placeholder="Prénom" />
                        <input type="password" {...register("password")} placeholder="Mot de passe" />
                        <input type="submit" value="S'inscrire" />
                        <p>Déja inscrit ?</p>
                        <p onClick={() => setLogin(true)}className='change_type'>Connectez vous</p>
                    </form>
                    }
                </div>

            }
        </div>
    )
}

export default Account