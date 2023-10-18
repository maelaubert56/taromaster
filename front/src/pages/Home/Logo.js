import './Logo.css'
import logo from '../../assets/logo-0.5.png'

function Logo() {
    return (
        <div className='home_logo'>
            <img src={logo} alt='taromètre logo'/>
            <p className="version">v0.1.0</p>
        </div>
    )
}

export default Logo
