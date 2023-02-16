import axios from 'axios'
import {
    BY_ACTIVITY,
    BY_CONTINENT,
    BY_NAME,
    BY_ORDER,
    BY_POPULATION,
    GET_COUNTRIES,
    POST_ACTIVITY,
    GET_DETAIL,
    LOADING,
} from './Constantes'

const url = "http://localhost:3001"

export function getCountries() {
    return async function (dispatch) {
        try {
            const res = await axios.get(`${url}/countries`)
            return dispatch({
                type: GET_COUNTRIES,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export function getDetail(id) {
    return async function (dispatch) {
        try {
            dispatch({
                type: LOADING
            })
            const res = await axios.get(`${url}/countries/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postActivity(payload) {
    return async function (dispatch) {
        try {
            const res = await axios.post(`${url}/activities`, payload)
            return dispatch({
                type: POST_ACTIVITY,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
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

export function getByName(name) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`${url}/countries?name=${name}`)
            return dispatch({
                type: BY_NAME,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}