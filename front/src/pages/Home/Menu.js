import './Menu.css';

function Menu() {
    return (
        <div className='menu'>
            <ul>
                <a href='/parties'><li>Parties</li></a>
                <a href='/'><li>Classement</li></a>
            </ul>
        </div>
    )
}

export default Menu