import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getByName, getCountries } from '../../Actions/Index'
import './styles.modules.css'

export default function SearchBar() {
    const [Country, setCountry] = useState('')
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    function Search(pais) {
        if (pais === '') {
            dispatch(getCountries())
            dispatch(getByName(''))
        } else {
            dispatch(getByName(pais))
        }
    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                Search(Country)
                setCountry('')
            }}>
                <input
                    type='text'
                    className="search-input"
                    placeholder="Country..."
                    value={Country}
                    onChange={e => setCountry(e.target.value)}
                />
                <input className="btn-search" type='submit' value='Search' />
            </form>
            {error && typeof error === 'string' ? <p className='text-error'>{error}</p> : null}
        </>
    )
}