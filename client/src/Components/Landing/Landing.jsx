import React from 'react';
import { Link } from 'react-router-dom'
import image from '../Assets/Countries-3.jpg'
import './styles.css'

function LandingButton() {
    return <Link to="/Home" className="nav-link">
        <button className="btn btn-primary" >
            <span style={{ "font-size": "24px" }}>
                Ingresar
            </span>
        </button>
    </Link>
}
const Landing = () => {
    return (
        <div>
            <img className='landing-img' src={image} alt='Countries App' />
             <LandingButton /> 
        </div>
    )
}

export default Landing;