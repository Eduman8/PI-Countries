import axios from 'axios'
import {
    BY_ACTIVITY,
    BY_CONTINENT,
    BY_NAME,
    BY_ORDER,
    BY_POPULATION,
    CLEAR_FILTERS,
    GET_ACTIVITIES,
    GET_COUNTRIES,
    POST_ACTIVITY,
    GET_DETAIL,
    LOADING,
    SET_ERROR,
} from './Constantes'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

function getErrorMessage(error) {
    return error.response?.data?.error || error.message || 'Unexpected error'
}

export function getCountries() {
    return async function (dispatch) {
        dispatch({ type: LOADING })
        try {
            const res = await axios.get(`${API_URL}/countries`)
            return dispatch({
                type: GET_COUNTRIES,
                payload: res.data
            })
        } catch (error) {
            return dispatch({
                type: SET_ERROR,
                payload: getErrorMessage(error)
            })
        }
    }
}

export function getActivities() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`${API_URL}/activities`)
            return dispatch({
                type: GET_ACTIVITIES,
                payload: res.data
            })
        } catch (error) {
            return dispatch({
                type: SET_ERROR,
                payload: getErrorMessage(error)
            })
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        dispatch({ type: LOADING })
        try {
            const res = await axios.get(`${API_URL}/countries/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: GET_DETAIL,
                payload: null
            })
            return dispatch({
                type: SET_ERROR,
                payload: getErrorMessage(error)
            })
        }
    }
}

export function postActivity(payload) {
    return async function (dispatch) {
        try {
            const res = await axios.post(`${API_URL}/activities`, payload)
            dispatch({
                type: POST_ACTIVITY,
                payload: res.data
            })
            return res.data
        } catch (error) {
            const message = getErrorMessage(error)
            dispatch({
                type: SET_ERROR,
                payload: message
            })
            throw new Error(Array.isArray(message) ? message.join(', ') : message)
        }
    }
}

export function byOrder(payload) {
    return {
        type: BY_ORDER,
        payload
    }
}

export function byPopulation(payload) {
    return {
        type: BY_POPULATION,
        payload
    }
}

export function byContinent(payload) {
    return {
        type: BY_CONTINENT,
        payload
    }
}

export function byActivity(payload) {
    return {
        type: BY_ACTIVITY,
        payload
    }
}

export function clearFilters() {
    return {
        type: CLEAR_FILTERS
    }
}

export function getByName(name) {
    return async function (dispatch) {
        const query = name.trim()

        if (!query) {
            return dispatch({
                type: BY_NAME,
                payload: ''
            })
        }

        dispatch({ type: LOADING })
        try {
            const res = await axios.get(`${API_URL}/countries?name=${query}`)
            return dispatch({
                type: BY_NAME,
                payload: query,
                results: res.data
            })
        } catch (error) {
            return dispatch({
                type: SET_ERROR,
                payload: getErrorMessage(error)
            })
        }
    }
}
