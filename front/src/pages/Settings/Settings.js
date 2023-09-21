import './Settings.css'

function Settings() {
    return (
        <div className='settings'>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" fill="none" className='backarrow' onClick={() => window.location.href = '/'}>
                <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM33 10.5L2 10.5L2 13.5L33 13.5L33 10.5Z"/>
            </svg>
            <h1>Paramètres</h1>
            <div className='settings-content'>

            </div>
        </div>
    )
}

export default Settings