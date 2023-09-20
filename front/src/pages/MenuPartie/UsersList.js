import './UsersList.css';
import { useEffect, useState } from 'react';
import axios from "axios"

function UsersList({setUsersListDiplayed, setPlayers, players, old}){


    const [search, setSearch] = useState(null)
    const [result, setResult] = useState([])


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/users/search/${search}`).then(res => {
            if(res.data) {
                setResult(res.data)
            }
            else{
                setResult([])
            }
        })
    }, [search])

    /* if the user clicks outside the popup, the popup is closed */
    const handleClickOutside = (e) => {
        if (e.target.className === 'users-list') {
            setUsersListDiplayed(false)
        }
    }

    const click = (profile) => {
        setPlayers([...players, profile])
        setUsersListDiplayed(false)
    }

    const isPresent = (id) => {
        for(let i=0; i<players.length; i++){
            if(players[i].idUser === id) return true
        }
        for(let i=0; i<old.length; i++){
            if(old[i].idUser === id) return true
        }
        return false
    }


    return(
        <div className='users-list' onClick={handleClickOutside}>
            <div className='users-list-content'>
                <div className='users-list-search'>
                    <input type='text' id='search' name='search' placeholder='Rechercher un joueur' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                {result.length > 0 && result.map((profile, index) => {
                    if(!isPresent(profile.idUser)) {
                        return(
                            <div className='user' key={index} onClick={() => click(profile)}>
                                <img src={`/profilePictures/pp${profile.avatar}.png`} alt="profile" />
                                <span>{profile.username}</span>
                            </div>
                        )
                    }
                   
                })}
            </div>
        </div>
    )
}

export default UsersList;