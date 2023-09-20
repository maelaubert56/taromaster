import './Account.css'

const ChooseAvatar = ({avatar, setAvatar}) => {

    const arr = ["pp0"]

    return(
        <div>
            {arr.map((pp, index) => (
                <img key={index} src={`/profilePictures/${pp}.png`} alt="Profile Pic" className={index === avatar ? "ppSelected" : "pp"} onClick={() => setAvatar(index)} />
            ))}
        </div>
    )
    
}

export default ChooseAvatar