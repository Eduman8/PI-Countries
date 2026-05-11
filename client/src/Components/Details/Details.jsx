import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { clearFilters, getDetail, getCountries } from '../../Actions/Index'
import { translateContinent, translateSeason } from '../../utils/translations'
import './styles.modules.css'
import Loading from '../Assets/Loading.gif'
import { Link } from 'react-router-dom'
import { BsHouseFill } from 'react-icons/bs'

function Details() {
    let { id } = useParams();
    const dispatch = useDispatch()
    const details = useSelector(state => state.detail)
    const loading = useSelector(state => state.loading)
    const error = useSelector(state => state.error)
    const activities = details?.activities || []

    const HandleDispatch = () => {
        dispatch(clearFilters())
        dispatch(getCountries())
    }

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    return (
        <main className='details-page'>
            <section className='details-card'>
                <div className='details-actions'>
                    <Link className="details-home-link" to='/countries' onClick={() => HandleDispatch()}><BsHouseFill /> Inicio</Link>
                </div>
                {loading ? <div className='details-loading'><img src={Loading} alt='Cargando detalle del país' /><span>Cargando detalle...</span></div> : details !== null ?
                    <div>
                        <div className='details-hero'>
                            <div>
                                <p className='details-kicker'>{translateContinent(details.continent)}</p>
                                <h1>{details.name}</h1>
                                <p className='details-code'>Código del país: {details.id}</p>
                            </div>
                            <img src={details.image} alt={`Bandera de ${details.name}`} className='details-flag' />
                        </div>
                        <div className='details-grid'>
                            <div className='details-panel'>
                                <h2>Detalle del país</h2>
                                <dl className='stats-list'>
                                    <div><dt>Capital</dt><dd>{details.capital}</dd></div>
                                    <div><dt>Población</dt><dd>{details.population}</dd></div>
                                    <div><dt>Área</dt><dd>{details.area} km²</dd></div>
                                    <div><dt>Subregión</dt><dd>{details.subregion || 'No disponible'}</dd></div>
                                </dl>
                            </div>
                            <div className='details-panel'>
                                <h2>Actividades</h2>
                                {activities.length > 0 ? <div className='activity-list'>{activities.map(e => {
                                    return (
                                        <article className='activity-item' key={e.id}>
                                            <h3>{e.name}</h3>
                                            <p>Dificultad: {e.difficulty}</p>
                                            <p>Duración: {e.duration} h</p>
                                            <p>Temporada: {translateSeason(e.season)}</p>
                                        </article>
                                    )
                                })}</div>
                                    : <p className='empty-copy'>Sin actividades registradas.</p>}
                            </div>
                        </div>
                    </div> : <p className='empty-copy'>{error || 'País no encontrado'}</p>
                }
            </section>
        </main>
    )
}

export default Details
