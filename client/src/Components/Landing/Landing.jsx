import React from 'react';
import { Link } from 'react-router-dom'
import image from '../Assets/Countries-3.jpg'
import './styles.css'
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

function LandingButton() {
    return <Link to="/countries" className="nav-link">
        <button className="btn btn-primary" >
            Ingresar
        </button>
    </Link>
}
const Landing = () => {
    return (
        <div className='landing-container'>
            <div className='title'>
                <h1>Henry Countries</h1>
            </div>
            <div className='contacto'>
                <h5>Contacto</h5>
                <a className='Github' href='https://github.com/Eduman8'><FaGithub/></a>
                <a className='Linkedin' href='https://www.linkedin.com/in/eduardo-dami%C3%A1n-g%C3%B3mez-89a432217/'><FaLinkedinIn/></a>
            </div>
            <img className='landing-img' src={image} alt='Countries App' />
            <LandingButton />
        </div>
    )
}

export default Landing;