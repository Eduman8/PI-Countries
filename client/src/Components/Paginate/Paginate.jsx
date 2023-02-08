import React from "react";
import './styles.modules.css'

function Paginate({ countriesPerPage, allCountries, paginado }) {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav className='nav'>
            <ul className="ul">
                {pageNumber && pageNumber.map((number) => {
                    return (
                        <li key={number}>
                            <label className="span" onClick={() => paginado(number)}>{number}</label>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Paginate;