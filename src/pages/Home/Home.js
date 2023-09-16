import Logo from './Logo.js';
import Menu from './Menu.js';
import Footer from '../Footer.js';
import './Home.css';
function Home() {

    return (
        <div className='main-page'>
            <Logo />
            <Menu />
            <Footer />
        </div>
    );
}

export default Home
