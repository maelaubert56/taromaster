import './Account.css'

const ChooseAvatar = ({avatar, setAvatar}) => {


    return(
        <div className="pp_list">
            {[...Array(17)].map((e, index) => (
                <img key={index} src={`/profilePictures/pp${index}.png`} alt="Profile Pic" className={index === avatar ? "ppSelected" : "pp"} onClick={() => setAvatar(index)} />
            ))}
            <span className='arrow_pp_list'>
                {">"}
            </span>
        </div>
    )
    
}

export default ChooseAvatar