import {
    BY_CONTINENT,
    BY_NAME,
    BY_ORDER,
    BY_POPULATION,
    GET_COUNTRIES,
    POST_ACTIVITY,
    GET_DETAIL,
    BY_ACTIVITY,
    LOADING,
} from '../Actions/Constantes'

const initialState = {
    countries: [],
    allContinents: [],
    population: [],
    allActivities: [],
    activity: [],
    details: [],
    error: '',
    loading: false
}
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                error: '',
                countries: action.payload,
                allContinents: action.payload,
                population: action.payload,
                searchName: action.payload,
            }
        case GET_DETAIL:
            return {
                ...state,
                details: action.payload,
                loading: false
            }
        case BY_NAME:
            if (action.payload.length === 0) {
                return {
                    ...state,
                    error: 'Country not found'
                }
            } else {
                return {
                    ...state,
                    countries: action.payload,
                }
            }
        case BY_ORDER:
            const orderCountries = action.payload === 'Asc' ?
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: orderCountries
            }

        case BY_POPULATION:
            const orderPopulation = action.payload === 'Min' ?
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1
                    }
                    if (b.population > a.population) {
                        return 1
                    }
                    return 0;
                })
            return {
                ...state,
                population: orderPopulation
            }
        case BY_CONTINENT:
            const allContinents = state.allContinents;
            const continentFilter = action.payload === 'All' ? allContinents :
                allContinents.filter(i => i.continent === action.payload)
            return {
                ...state,
                countries: continentFilter
            }
        case BY_ACTIVITY:
            const countriesActivities = state.allActivities;
            const activityFilter = action.payload === 'All' ? countriesActivities : countriesActivities.filter(e =>
                e.activities?.map(el => el.name).includes(action.payload)
            );
            return {
                ...state,
                countries: activityFilter
            };
        case POST_ACTIVITY:
            return {
                ...state,
                allActivities: [...state.allActivities, action.payload]

            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        default: return state;
    }
}
export default reducer;