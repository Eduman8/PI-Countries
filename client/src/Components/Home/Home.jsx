import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import Paginate from '../Paginate/Paginate'
import { byActivity, byOrder, byPopulation, getCountries, byContinent, getActivities, clearFilters } from '../../Actions/Index'
import './styles.modules.css'
import NavBar from '../NavBar'

function Home() {
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countries)
    const activities = useSelector(state => state.activities)
    const loading = useSelector(state => state.loading)
    const error = useSelector(state => state.error)
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 9
    const indexLastCountry = currentPage * countriesPerPage;
    const indexFirstCountry = indexLastCountry - countriesPerPage;
    const allCountries = countries.slice(indexFirstCountry, indexLastCountry);
    const totalPages = Math.ceil(countries.length / countriesPerPage) || 1;

    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivities())
    }, [dispatch])

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1)
        }
    }, [currentPage, totalPages])

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleOrder(e) {
        e.preventDefault();
        dispatch(byOrder(e.target.value))
        setCurrentPage(1)
    }
    function handleContinents(e) {
        e.preventDefault();
        dispatch(byContinent(e.target.value))
        setCurrentPage(1)
    }
    function handleOrderPopulation(e) {
        e.preventDefault();
        dispatch(byPopulation(e.target.value))
        setCurrentPage(1)
    }
    function handleActivity(e) {
        e.preventDefault();
        dispatch(byActivity(e.target.value))
        setCurrentPage(1)
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(clearFilters())
        dispatch(getCountries())
        setCurrentPage(1)
    }

    return (
        <div className='container'>
            <div className='fondo'>
                <div className='nav-bar'>
                    < NavBar onSearch={() => setCurrentPage(1)} />
                </div>
                <section className='home-hero'>
                    <p className='home-kicker'>Explorá el mundo</p>
                    <h1>Países, banderas y actividades turísticas</h1>
                    <p className='home-description'>Buscá, filtrá y organizá países.</p>
                </section>

                <div className='Filtros' aria-label='Filtros de países'>
                    <div className='Filtro'>
                        <select className='selectors' onChange={handleOrderPopulation}>
                            <option value='Select'>Población</option>
                            <option value='Min' key='Min'>Menor población</option>
                            <option value='Max' key='Max'>Mayor población</option>
                        </select>
                    </div>
                    <div className='Filtro'>
                        <select className='selectors' onChange={handleContinents}>
                            <option value='All' key='All'>Todos los continentes</option>
                            <option value='Africa' key='Africa'>África</option>
                            <option value='Antarctica' key='Antarctica'>Antártida</option>
                            <option value='Asia' key='Asia'>Asia</option>
                            <option value='Europe' key='Europe'>Europa</option>
                            <option value='North America' key='North America'>América del Norte</option>
                            <option value='Oceania' key='Oceania'>Oceanía</option>
                            <option value='South America' key='South America'>América del Sur</option>
                        </select>
                    </div>
                    <div className='Filtro'>
                        <select className='selectors' onChange={handleActivity}>
                            <option value='Select'>Actividades</option>
                            <option value='All'>Todas las actividades</option>
                            {activities.map(e => {
                                return (
                                    <option value={e.name} key={e.id} >{e.name}</option>

                                );
                            })}
                        </select>
                    </div>
                    <div className='Filtro'>
                        <select className='selectors' onChange={handleOrder}>
                            <option value="Select">Orden alfabético</option>
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

                {error ? <p className='text-error'>{error}</p> : null}
                {loading ? <div className='loading-state'>Cargando países...</div> : null}

                <div className='boxing'>
                    {!loading && allCountries?.length === 0 ? <div className='empty-state'>No se encontraron países. Probá cambiando la búsqueda o los filtros.</div> : null}
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
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}

export default Home
