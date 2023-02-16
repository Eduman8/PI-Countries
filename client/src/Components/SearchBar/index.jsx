import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getByName } from '../../Actions/Index'
import './styles.modules.css'
import Swal from 'sweetalert2'


export default function SearchBar() {
    const [Country, setCountry] = useState('')
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    function Search(pais) {
        if (pais === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: 'Please insert a country name!'
            })
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