import './AdminPannel.css'
import {useEffect, useState} from "react";
import axios from "axios"
import DeletePopup from "../../pages/AdminPannel/DeletePopup.js";

function AdminPannel(){

    /* get the number of users and the number of parties */
    const [nbUsers, setNbUsers] = useState(0)
    const [nbParties, setNbParties] = useState(0)
    const [session, setSession] = useState(JSON.parse(localStorage.getItem("session")))
    let [search, setSearch] = useState(null)
    const [result, setResult] = useState([])
    const [userSelected, setUserSelected] = useState(null)
    const [able, setAble] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)

    // check if the user is connected, if not redirect to the login page
    useEffect(() => {
        if(session)axios.get(`${process.env.REACT_APP_API}/users/${session.username}`).then(res => {
            if(res.data.privilege>0) {
                setSession(res.data)
                setAble(true)
            }else window.location.href = "/"
        })
        else window.location.href = "/account"
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/admin/stats`).then(res => {
            if(res.data){
                setNbUsers(res.data.nbUsers)
                setNbParties(res.data.nbParties)
            }
        })
    }, [])

    const deleteUser = async (idUser) => {
        await axios.post(`${process.env.REACT_APP_API}/users/delete/${idUser}`,
            {
                idAsker: session.idUser
            })
        setResult([])
        setUserSelected(null)
        setDeletePopup(false)
    }


    const changePrivilege = async (user, privilege) => {
        await axios.post(`${process.env.REACT_APP_API}/users/update/privilege/${user.idUser}`, {
            privilege: privilege
        })
        setResult([])
        setUserSelected(null)
    }

    /* get all the users data*/
    useEffect(() => {

    }, [result])

    useEffect(() => {
        /* check if search is empty */
        if(!(search === null || search === '')) {
            /* tolowercase and trim the search */
            search = search.toLowerCase().trim()
            axios.get(`${process.env.REACT_APP_API}/users/search/${search}`).then(res => {
                if(res.data) {
                    setResult(res.data)
                }
                else{
                    setResult([])
                }
            })
        }else{
            /* get all the users */
            axios.get(`${process.env.REACT_APP_API}/users/data/all`).then(res => {
                if(res.data){
                    setResult(res.data)
                }else{
                    setResult([])
                }
            })
        }
    }, [search, result])


    return(
        able ?
        <div className='admin'>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" fill="none" className='backarrow' onClick={() => window.location.href = '/'}>
                <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM33 10.5L2 10.5L2 13.5L33 13.5L33 10.5Z"/>
            </svg>
            <h1>Admin Panel</h1>
            <div className='admin-content'>
                <div className='admin-stats'>
                    <h2>Stats</h2>
                    <div className='admin-stats-content'>
                        <span>
                            <h3>{nbUsers}</h3>
                            <p>Nombre d'inscrits</p>
                        </span>
                        <span>
                            <h3>{nbParties}</h3>
                            <p>Nombre de parties</p>
                        </span>
                    </div>
                </div>
                <div className='admin-users'>
                    <h2>Utilisateurs</h2>
                    <div className='admin-users-content'>
                        <div className='admin-users-search'>
                            <input type='text' id='search-admin' name='search' placeholder='Rechercher un joueur' value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className='admin-users-list'>
                            {result.length > 0 && result.map((profile, index) => {
                                return(
                                    <div className='user-admin' key={index} onClick={() => setUserSelected(profile)}>
                                        <img src={`/profilePictures/pp${profile.avatar}.png`} alt="profile" />
                                        <span>{profile.username}</span>
                                        {profile.privilege===1 ? <img src="/star_yellow.svg" alt="admin" className='admin-star' /> :
                                            profile.privilege===2 ? <img src="/star_purple.svg" alt="superadmin" className='admin-star' /> :
                                            <span src="" alt="" className='admin-star'/>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {userSelected !== null &&
                        <div className='admin-users-selected'>
                            <p>Utilisateur sélectionné :</p>
                            <p className="admin-user-selected">{userSelected.username}
                                {userSelected.privilege===2 ?<span className="admin-user-carac" style={{color:"#aa68e8"}}> (superadmin)</span>
                                : userSelected.privilege===1 ? <span className="admin-user-carac"> (admin)</span>
                                : <span className="normal-user-carac"> (user)</span>
                                }
                            </p>
                            { (userSelected.privilege===0 || (userSelected.privilege===1 && session.privilege===2)) &&
                            <div className="admin-user-buttons">
                                <button className='admin-users-delete' onClick={() => setDeletePopup(true)}>Supprimer</button>
                                {session.privilege===2 &&
                                    userSelected.privilege>0 ?
                                    <button className='admin-users-setuser' onClick={() => changePrivilege(userSelected,0)}>Rétrograder</button>
                                    : <button className='admin-users-setadmin' onClick={() => changePrivilege(userSelected,1)}>Rendre admin</button>
                                }
                            </div>
                            }
                        </div>
                    }
                </div>
            </div>
            {
                deletePopup && <DeletePopup   deleteUser={deleteUser} user={userSelected} closePopup={() => setDeletePopup(false)} />
            }
            </div>
        :
        <div className='admin'>
            <p>Chargement ...</p>
        </div>
    )
}

export default AdminPannel;
