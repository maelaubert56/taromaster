import './DeletePopup.css'

function DeletePopup({deleteUser, user, closePopup}){

        const handleClickOutside = (e) => {
            if (e.target.className === 'delete-popup') {
                closePopup();
            }
        }

        return(
            <div className="delete-popup" onClick={handleClickOutside}>
                <div className="delete-popup-content">
                    <p>Êtes-vous sûr de vouloir supprimer {user.username} ?</p>
                    <div className="delete-popup-buttons">
                        <button onClick={() => deleteUser(user.idUser)}>Oui</button>
                        <button onClick={() => closePopup()}>Non</button>
                    </div>
                </div>
            </div>
        )
}

export default DeletePopup
