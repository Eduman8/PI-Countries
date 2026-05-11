import {
    BY_CONTINENT,
    BY_NAME,
    BY_ORDER,
    BY_POPULATION,
    CLEAR_FILTERS,
    GET_ACTIVITIES,
    GET_COUNTRIES,
    POST_ACTIVITY,
    GET_DETAIL,
    BY_ACTIVITY,
    LOADING,
    SET_ERROR,
} from '../Actions/Constantes'

const initialFilters = {
    search: '',
    continent: 'All',
    activity: 'All',
    sortType: '',
    sortOrder: '',
}

const initialState = {
    allCountries: [],
    countries: [],
    activities: [],
    detail: null,
    loading: false,
    error: '',
    filters: initialFilters,
}

function applyFilters(allCountries, filters) {
    let filteredCountries = [...allCountries]

    if (filters.search) {
        const search = filters.search.toLowerCase()
        filteredCountries = filteredCountries.filter((country) =>
            country.name.toLowerCase().includes(search)
        )
    }

    if (filters.continent && filters.continent !== 'All') {
        filteredCountries = filteredCountries.filter((country) => country.continent === filters.continent)
    }

    if (filters.activity && filters.activity !== 'All') {
        filteredCountries = filteredCountries.filter((country) =>
            country.activities?.some((activity) => activity.name === filters.activity)
        )
    }

    if (filters.sortType === 'name') {
        filteredCountries = [...filteredCountries].sort((a, b) => {
            if (filters.sortOrder === 'Desc') return b.name.localeCompare(a.name)
            return a.name.localeCompare(b.name)
        })
    }

    if (filters.sortType === 'population') {
        filteredCountries = [...filteredCountries].sort((a, b) => {
            const firstPopulation = Number(a.population) || 0
            const secondPopulation = Number(b.population) || 0

            if (filters.sortOrder === 'Max') return secondPopulation - firstPopulation
            return firstPopulation - secondPopulation
        })
    }

    return filteredCountries
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES: {
            const nextFilters = { ...state.filters }
            return {
                ...state,
                error: '',
                loading: false,
                allCountries: action.payload,
                countries: applyFilters(action.payload, nextFilters),
            }
        }
        case GET_ACTIVITIES:
            return {
                ...state,
                error: '',
                activities: action.payload,
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
                loading: false,
                error: '',
            }
        case BY_NAME: {
            const nextFilters = {
                ...state.filters,
                search: action.payload,
            }
            return {
                ...state,
                error: action.results?.length === 0 ? 'País no encontrado' : '',
                loading: false,
                filters: nextFilters,
                allCountries: state.allCountries.length ? state.allCountries : action.results || [],
                countries: applyFilters(state.allCountries.length ? state.allCountries : action.results || [], nextFilters),
            }
        }
        case BY_ORDER: {
            const nextFilters = {
                ...state.filters,
                sortType: action.payload === 'Select' ? '' : 'name',
                sortOrder: action.payload === 'Select' ? '' : action.payload,
            }
            return {
                ...state,
                filters: nextFilters,
                countries: applyFilters(state.allCountries, nextFilters),
            }
        }
        case BY_POPULATION: {
            const nextFilters = {
                ...state.filters,
                sortType: action.payload === 'Select' ? '' : 'population',
                sortOrder: action.payload === 'Select' ? '' : action.payload,
            }
            return {
                ...state,
                filters: nextFilters,
                countries: applyFilters(state.allCountries, nextFilters),
            }
        }
        case BY_CONTINENT: {
            const nextFilters = {
                ...state.filters,
                continent: action.payload || 'All',
            }
            return {
                ...state,
                filters: nextFilters,
                countries: applyFilters(state.allCountries, nextFilters),
            }
        }
        case BY_ACTIVITY: {
            const nextFilters = {
                ...state.filters,
                activity: !action.payload || action.payload === 'Select' ? 'All' : action.payload,
            }
            return {
                ...state,
                filters: nextFilters,
                countries: applyFilters(state.allCountries, nextFilters),
            }
        }
        case POST_ACTIVITY:
            return {
                ...state,
                error: '',
                activities: [...state.activities, action.payload],
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                error: '',
                filters: initialFilters,
                countries: applyFilters(state.allCountries, initialFilters),
            }
        case LOADING:
            return {
                ...state,
                loading: true,
                error: '',
            }
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                error: Array.isArray(action.payload) ? action.payload.join(', ') : action.payload,
            }
        default: return state;
    }
}

export default reducer;
export { applyFilters, initialState };
