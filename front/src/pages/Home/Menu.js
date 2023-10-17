import './Menu.css';
import {useEffect, useState} from 'react';
import axios from "axios";

function Menu() {
    const [admin, setAdmin] = useState(false)
    const [session, setSession] = useState(JSON.parse(localStorage.getItem("session")))

    useEffect(() => {
        if(session)axios.get(`${process.env.REACT_APP_API}/users/${session.username}`).then(res => {
            if(res.data.privilege>0) {
                setSession(res.data)
                setAdmin(true)
            }
        })
    }, [])

    return (

        <div className='menu'>
            <ul>
                <a href='/parties'><li>Parties</li></a>
                {/* if is admin and logged */}
                {admin &&
                    <a href='/admin'><li>Panneau Admin</li></a>
                }
            </ul>
        </div>
    )
}

export default Menu