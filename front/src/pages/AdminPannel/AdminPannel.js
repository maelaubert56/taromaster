import './AdminPannel.css'
import {useState} from "react";

function AdminPannel(){

    var nbInscrits = 12654;
    var nbParties = 812654;

    let [search, setSearch] = useState(null)
    const [result, setResult] = useState([])
    const [userSelected, setUserSelected] = useState(null)

    /* click on a user */
    const click = async (profile) => {
        setUserSelected(profile)
    }

    const deleteUser = async () => {
        if(userSelected){
            console.log(userSelected + " deleted")
        }
    }

    /* TEMPORAIRE */
    const resultTemp = [
        {
            idUser: 1,
            username: 'Jean',
            firstName: 'Jean',
            lastName: 'Jean',
            avatar: 1,
        },
        {
            idUser: 2,
            username: 'Pierre',
            firstName: 'Pierre',
            lastName: 'Pierre',
            avatar: 2,
        },
        {
            idUser: 3,
            username: 'Paul',
            firstName: 'Paul',
            lastName: 'Paul',
            avatar: 3,
        },
        {
            idUser: 4,
            username: 'Jacques',
            firstName: 'Jacques',
            lastName: 'Jacques',
            avatar: 4,
        },
        {
            idUser: 5,
            username: 'Jeanne',
            firstName: 'Jeanne',
            lastName: 'Jeanne',
            avatar: 5,
        },
        {
            idUser: 6,
            username: 'Marie',
            firstName: 'Marie',
            lastName: 'Marie',
            avatar: 6,
        },
        {
            idUser: 7,
            username: 'Julie',
            firstName: 'Julie',
            lastName: 'Julie',
            avatar: 7,
        },
        {
            idUser: 8,
            username: 'Julien',
            firstName: 'Julien',
            lastName: 'Julien',
            avatar: 8,
        }
    ]



    return(
        <div className='admin'>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" fill="none" className='backarrow' onClick={() => window.location.href = '/'}>
                <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM33 10.5L2 10.5L2 13.5L33 13.5L33 10.5Z"/>
            </svg>
            <h1>Admin Pannel</h1>
            <div className='admin-content'>
                <div className='admin-stats'>
                    <h2>Stats</h2>
                    <div className='admin-stats-content'>
                        <span>
                            <h3>{nbInscrits}</h3>
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
                            {resultTemp.length > 0 && resultTemp.map((profile, index) => {
                                return(
                                    <div className='user-admin' key={index} onClick={() => click(profile)}>
                                        <img src={`/profilePictures/pp${profile.avatar}.png`} alt="profile" />
                                        <span>{profile.username}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {userSelected !== null &&
                        <div className='admin-users-selected'>
                            <p>Utilisateur sélectionné :</p>
                            <p className="admin-user-selected">{userSelected.username} {/*TODO ajouter variable userSelected.admin*/}<span className="admin-user-carac">(admin)</span></p>
                            <div className="admin-user-buttons">
                                <button className='admin-users-delete' onClick={() => deleteUser(userSelected.idUser)}>Supprimer le compte</button>
                                {/*TODO changer en fonction de userSelected.admin*/}
                                <button className='admin-users-setadmin'>Rendre admin</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminPannel;
