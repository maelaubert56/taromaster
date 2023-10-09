import './Footer.css'
import regles_img from '../assets/regles.png'

const user = JSON.parse(localStorage.getItem("session"))
/* if user is logged in, display his avatar, else display default avatar */
function Footer() {
    return (
        <footer>
            <div>
                <a href='/rules'><img src={regles_img} alt='regles'/></a>
                <a href='/account' className={localStorage.getItem("session") ?`avatar`:`picto_not_logged`}><img src={localStorage.getItem("session") ? `/profilePictures/pp${JSON.parse(localStorage.getItem("session")).avatar}.png` : "/people.png"} alt='Account'/></a>
            </div>
        </footer>
    )
}

export default Footer
