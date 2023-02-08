import React from "react";
import { Link } from 'react-router-dom'
import { getCountries } from "../../Actions/Index";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar";
import { GiWorld } from 'react-icons/gi'
import { BsHouseFill } from 'react-icons/bs'
import { RiAddLine } from 'react-icons/ri'
import './styles.modules.css'

const NavBar = () => {
    const dispatch = useDispatch()

    const HandleDispatch = () => {
        dispatch(getCountries())
    }

    return (
        <header className='navbar'>
            <nav>
                <div className='cosas'>
                    <Link className="main" to='/'>< GiWorld />Henry Countries</Link>
                    <div className='search-bar'>
                        <SearchBar />
                    </div>
                    <div className='links'>
                        <Link className="ul-nav-home" to='/countries' onClick={() => HandleDispatch()}><BsHouseFill />Home</Link>
                        <Link className="ul-nav-act" to='/activities'><RiAddLine />Create Activity</Link>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default NavBar