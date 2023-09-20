import "./Account.css"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
import ChooseAvatar from "./ChooseAvatar";
const salt = bcrypt.genSaltSync(10)

function Account() {

    const [login, setLogin] = useState(true)
    const [error, setError] = useState(null)
    const [avatar, setAvatar] = useState(0)
    const [logged, setLogged] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("session")) navigate("/");
    }, [logged])

    const createSession = (user) => {
        sessionStorage.setItem("session", JSON.stringify(user))
        setLogged(true)
    }

    const onSubmitLogin = async (data) => {
        const {username, password} = data
        const user = await axios.get(`${process.env.REACT_APP_API}/users/${username}`)
        if(bcrypt.compareSync(password, user.data.password)) createSession(user.data)
        setError("Nom d'utilisateur ou mot de passe incorrects !")
    }

    const onSubmitRegister = async (data) => {
        const {username, firstName, lastName, password} = data
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
            setError(e.response.data)
        })
    }


    return (
        <div>
            {error && <p>{error}</p>}
            {login ? <form onSubmit={handleSubmit(onSubmitLogin)}>
                <input type="text" {...register("username")} placeholder="Username" />
                <input type="password" {...register("password")} placeholder="Mot de passe" />
                <input type="submit" value="Se connecter" />
                <p onClick={() => setLogin(false)}>Je n'ai pas encore de compte</p>
            </form> : <form onSubmit={handleSubmit(onSubmitRegister)}>
                <input type="text" {...register("username")} placeholder="Nom d'utilisateur" />
                <input type="text" {...register("firstName")} placeholder="Prénom" />
                <input type="text" {...register("lastName")} placeholder="Nom" />
                <input type="password" {...register("password")} placeholder="Mot de passe" />
                <ChooseAvatar avatar={avatar} setAvatar={setAvatar} />
                <input type="submit" value="Se connecter" />
                <p onClick={() => setLogin(true)}>J'ai un compte</p>
            </form>}
        </div>
    )
}

export default Account