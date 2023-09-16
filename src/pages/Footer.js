import './Footer.css'
import param_img from '../assets/parametres.png'
import regles_img from '../assets/regles.png'

function Footer() {
    return (
        <footer>
            <ul>
                <li className='parameters_picto'><img src={param_img} alt='parametres'/></li>
                <li className='regles_picto'><img src={regles_img} alt='regles'/></li>
                <li><img src={param_img} alt='parametres'/></li>
            </ul>
        </footer>
    )
}

export default Footer
