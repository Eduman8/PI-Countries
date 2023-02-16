import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import Paginate from '../Paginate/Paginate'
import { byActivity, byOrder, byPopulation, getCountries, byContinent } from '../../Actions/Index'
import './styles.modules.css'
import NavBar from '../NavBar'

function Home() {
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const activity = useSelector(state => state.activity)
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9)
    const [order, setOrder] = useState()
    const indexLastCountry = currentPage * countriesPerPage;
    const indexFirstCountry = indexLastCountry - countriesPerPage;
    const allCountries = countries.slice(indexFirstCountry, indexLastCountry);



    useEffect(() => {
        dispatch(getCountries())
        dispatch(byActivity())
    }, [dispatch])

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleOrder(e) {
        e.preventDefault();
        dispatch(byOrder(e.target.value))
        setOrder(e.target.value)
    }
    function handleContinents(e) {
        e.preventDefault();
        dispatch(byContinent(e.target.value))
        setOrder(e.target.value)
    }
    function handleOrderPopulation(e) {
        e.preventDefault();
        dispatch(byPopulation(e.target.value))
        setOrder(e.target.value)
    }
    function handleActivity(e) {
        e.preventDefault();
        dispatch(byActivity(e.target.value))
        setOrder(e.target.value)
    }
    

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
        window.location.reload()
    }


    return (
        <div className='container'>
            <div className='fondo'>
                <div className='nav-bar'>
                    < NavBar />
                </div>
                <div className='Filtros'>
                    <div className='Filtro'>
                        <select className='selectors' onChange={handleOrderPopulation}>
                            <option value='Select'>Population</option>
                            <option value='Min' key='Min'>Min Population</option>
                            <option value='Max' key='Max'>Max Population</option>
                        </select>
                    </div>
                    <div className='Filtro'>
                        <select className='selectors' onChange={handleContinents}>
                            <option value='All' key='All'>All Continents</option>
                            <option value='Africa' key='Africa'>Africa</option>
                            <option value='Antarctica' key='Antarctica'>Antarctica</option>
                            <option value='Asia' key='Asia'>Asia</option>
                            <option value='Europe' key='Europe'>Europe</option>
                            <option value='North America' key='North America'>North America</option>
                            <option value='Oceania' key='Oceania'>Oceania</option>
                            <option value='South America' key='South America'>South America</option>
                        </select>
                    </div>
                    <div className='Filtro'>
                        <select className='selectors' onChange={handleActivity}>
                            <option value='Select'> Activities</option>
                            <option value='All'>All Activities</option>
                            {activity.map(e => {
                                return (
                                    <option value={e.name} key={e.id} >{e.name}</option>

                                );
                            })}
                        </select>
                    </div>
                    <div className='Filtro'>
                        <select className='selectors' onChange={handleOrder}>
                            <option value="Select">Alphabet</option>
                            <option value="Asc" key="Asc">A-Z</option>
                            <option value="Desc" key="Desc">Z-A</option>
                        </select>
                    </div>
                    <div className='Filtro'>
                        <button onClick={e => { handleClick(e) }} className='selectors'>
                            Limpiar filtros
                        </button>
                    </div>
                </div>

                <div className='boxing'>
                    {allCountries?.map((e) => {
                        return (
                            <div className='carta' key={e.id}>
                                <Card
                                    key={e.id}
                                    name={e.name}
                                    continent={e.continent}
                                    image={e.image}
                                    id={e.id}
                                />
                            </div>
                        )
                    })
                    }
                </div>
                <Paginate
                    paginado={paginado}
                    allCountries={countries.length}
                    countriesPerPage={countriesPerPage}
                />
            </div>
        </div>
    )
}

export default Home