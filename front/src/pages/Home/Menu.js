import './Menu.css';

function Menu() {

    const admin = true;
    return (

        <div className='menu'>
            <ul>
                <a href='/parties'><li>Parties</li></a>
                {/* if is admin and logged */}
                {admin &&
                    <a href='/admin'><li>Panneau Admin</li></a>
                }
            </ul>
        </div>
    )
}

export default Menu