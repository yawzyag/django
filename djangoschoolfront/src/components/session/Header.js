import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="headerContainer">
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <HomeIcon/>
            <p>Inicio</p>
            </Link>
        </div>
    )
}

export default Header
