import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getByName } from '../../Actions/Index'
import './styles.modules.css'

export default function SearchBar({ onSearch }) {
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    function search(pais) {
        dispatch(getByName(pais))
        if (onSearch) onSearch()
    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                search(country)
                setCountry('')
            }}>
                <input
                    type='text'
                    className="search-input"
                    placeholder="Country..."
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
                <input className="btn-search" type='submit' value='Search' />
            </form>
            {error && typeof error === 'string' ? <p className='text-error'>{error}</p> : null}
        </>
    )
}
