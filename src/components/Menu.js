import React from 'react';
import { Link } from 'react-router-dom';

import RunAwayLogo from '../assets/RunAwayLogo.png';

const Menu = () => {

    return (
        <div className="mainMenu">
            <Link className="homeLink" to="/landing">
                <img src={RunAwayLogo} alt="Run Away Logo" />
            </Link>
        </div>
    );
}

export default Menu;