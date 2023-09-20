import './UsersList.css';

function UsersList({setUsersListDiplayed}){


    /* if the user clicks outside the popup, the popup is closed */
    const handleClickOutside = (e) => {
        if (e.target.className === 'users-list'){
            setUsersListDiplayed(false)
        }
    }

    const handleClickOnUser = (e) => {
        if (e.target.className === 'user'){
            setUsersListDiplayed(false)
        }
    }

    return(
        <div className='users-list' onClick={handleClickOutside}>
            <div className='users-list-content'>
                <div className='users-list-search'>
                    <input type='text' id='search' name='search' placeholder='Rechercher un joueur'/>
                </div>
                <div className='user' onClick={handleClickOnUser}>
                    <img src={`/profilePictures/profile_picture_batman.png`} alt="profile"/>
                    <span>Batman</span>
                </div>
                <div className='user' onClick={handleClickOnUser}>
                    <img src={`/profilePictures/profile_picture_batman.png`} alt="profile"/>
                    <span>Batman</span>
                </div>
                <div className='user' onClick={handleClickOnUser}>
                    <img src={`/profilePictures/profile_picture_batman.png`} alt="profile"/>
                    <span>Batman</span>
                </div>
                <div className='user' onClick={handleClickOnUser}>
                    <img src={`/profilePictures/profile_picture_batman.png`} alt="profile"/>
                    <span>Batman</span>
                </div>
                <div className='user' onClick={handleClickOnUser}>
                    <img src={`/profilePictures/profile_picture_batman.png`} alt="profile"/>
                    <span>Batman</span>
                </div>
                <span onClick={()=>setUsersListDiplayed(false)}>Annuler</span>
            </div>
        </div>
    )
}

export default UsersList;