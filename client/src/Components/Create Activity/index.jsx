import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { getActivities, getCountries, postActivity } from '../../Actions/Index'
import { translateSeason } from '../../utils/translations'
import './styles.modules.css'
import Swal from 'sweetalert2'
import { BsHouseFill } from 'react-icons/bs'

function valida(input) {
    let errors = {}
    if (!input.name.trim()) {
        errors.name = "El nombre es obligatorio"
    }
    if (!input.season) {
        errors.season = "La temporada es obligatoria"
    }
    if (!input.difficulty) {
        errors.difficulty = "La dificultad es obligatoria"
    }
    if (!input.duration) {
        errors.duration = "La duración es obligatoria"
    }
    if (!input.countries.length) {
        errors.countries = "Seleccioná al menos un país"
    }
    return errors;
}

function AddActivity() {
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector(state => state.allCountries).slice().sort((a, b) => a.name.localeCompare(b.name))
    const [submitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    })

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    function updateInput(nextInput) {
        setInput(nextInput)
        setErrors(valida(nextInput))
    }

    function handleChange(e) {
        updateInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e) {
        const countryId = e.target.value

        if (!countryId || input.countries.includes(countryId)) return

        updateInput({
            ...input,
            countries: [...input.countries, countryId]
        })
    }

    function handleDelete(e) {
        updateInput({
            ...input,
            countries: input.countries.filter(c => c !== e)
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = valida(input)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length) {
            Swal.fire('Faltan datos', 'Completá todos los campos obligatorios.', 'error')
            return
        }

        try {
            setSubmitting(true)
            await dispatch(postActivity(input))
            await dispatch(getActivities())
            setInput({
                name: '',
                difficulty: '',
                duration: '',
                season: '',
                countries: []
            })
            setErrors({})
            Swal.fire(
                '¡Listo!',
                'La actividad se creó correctamente.',
                'success'
            )
            history.push('/countries')
        } catch (error) {
            Swal.fire('No se pudo crear la actividad', error.message, 'error')
        } finally {
            setSubmitting(false)
        }
    }

    const season = ['Winter', 'Spring', 'Autumn', 'Summer'];
    const difficulty = [1, 2, 3, 4, 5];
    const duration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    return (
        <div className='background-image'>
            <div className="form">
                <div className="container">
                    <Link className="ul-nav-home" to='/countries' ><BsHouseFill />Inicio</Link>
                    <p className='form-kicker'>Planificá un viaje</p>
                    <h2>Crear actividad</h2>
                    <p className='form-description'>Agregá una actividad turística y asociála con uno o más países.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="act">
                        <label>Nombre de la actividad</label>
                        <input className='select' type='text' value={input.name} name='name' onChange={handleChange} placeholder='Nombre de la actividad' required />
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    </div>
                    <div className="season">
                        <label>Temporada</label>
                        <select className='select' name='season' value={input.season} onChange={handleChange} required>
                            <option value='' hidden>Seleccioná una temporada</option>
                            {season.map(e => (
                                <option value={e} name='season' key={e}>{translateSeason(e)}</option>
                            ))}
                        </select>
                        {errors.season && <p className="error">{errors.season}</p>}
                    </div>
                    <div className="difficulty">
                        <label>Dificultad</label>
                        <select className='select' name='difficulty' value={input.difficulty} onChange={handleChange} required>
                            <option value='' hidden>Elegí una opción</option>
                            {difficulty.map(e => (
                                <option value={e} name='difficulty' key={e}>{e}</option>
                            ))}
                        </select>
                        {errors.difficulty && <p className="error">{errors.difficulty}</p>}
                    </div>
                    <div className="duration">
                        <label>Duración</label>
                        <select className='select' name='duration' value={input.duration} onChange={handleChange} required>
                            <option value='' hidden>Elegí una opción</option>
                            {duration.map(e => (
                                <option value={e} name='duration' key={e}>{e} h</option>
                            ))}
                        </select>
                        {errors.duration && <p className="error">{errors.duration}</p>}
                    </div>
                    <div className="country">
                        <label>Países</label>
                        <select className='select' value='' onChange={handleSelect}>
                            <option value='' hidden>Seleccioná un país</option>
                            {countries.map(e => (
                                <option value={e.id} name='countries' key={e.id}>{e.name}</option>
                            ))}
                        </select>
                        {errors.countries && <p className="error">{errors.countries}</p>}
                    </div>
                    <div>
                        <p className='selected-title'>Países seleccionados</p>
                        <li className="countries-select">
                            {input.countries.map(i =>
                                <div key={i}>
                                    <span>{i}</span>
                                    <button aria-label={`Quitar ${i}`} title={`Quitar ${i}`} className='close-btn' onClick={() => handleDelete(i)} type='button'>X</button>
                                </div>)}
                        </li>
                    </div>
                    <button className='button1' type="submit" disabled={submitting}>{submitting ? 'Guardando...' : 'Crear actividad'}</button>
                </form>
            </div>
        </div>
    )
}

export default AddActivity;
