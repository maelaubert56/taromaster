import './DesktopError.css';
import Logo from "../../pages/Home/Logo";

function DesktopError() {
    return(
        <div className='desktop-error'>
            <Logo/>
            <div className='desktop-error-content'>
                <h1>Erreur</h1>
                <p>Malheureusement, ce site n'est disponible que sur mobile pour le moment.</p>
                <p>Soyez patient, la version desktop arrive bientôt !</p>
            </div>
        </div>
    )
}

export default DesktopError;