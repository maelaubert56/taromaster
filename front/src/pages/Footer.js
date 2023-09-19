import './Footer.css'
import param_img from '../assets/parametres.png'
import regles_img from '../assets/regles.png'

function Footer() {
    return (
        <footer>
            <ul>
                <a href='/'><li className='parameters_picto'><img src={param_img} alt='parametres'/></li></a>
                <a href='/'><li className='regles_picto'><img src={regles_img} alt='regles'/></li></a>
                <a href='/account'><li className='account_picto'><img src={param_img} alt='parametres'/></li></a>
            </ul>
        </footer>
    )
}

export default Footer
