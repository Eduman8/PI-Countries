import React from "react";
import './styles.modules.css'

function Paginate({ countriesPerPage, allCountries, paginado, currentPage }) {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav className='nav' aria-label='Pagination'>
            <ul className="ul">
                {pageNumber && pageNumber.map((number) => {
                    return (
                        <li key={number}>
                            <button
                                type="button"
                                className={currentPage === number ? 'span span-active' : 'span'}
                                onClick={() => paginado(number)}
                                aria-current={currentPage === number ? 'page' : undefined}
                            >
                                {number}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Paginate;
