import reducer, { initialState } from './Index';
import { BY_ACTIVITY, BY_CONTINENT, BY_POPULATION, GET_ACTIVITIES, GET_COUNTRIES } from '../Actions/Constantes';

const countries = [
  {
    id: 'ARG',
    name: 'Argentina',
    continent: 'South America',
    population: 45,
    activities: [{ id: '1', name: 'Ski' }],
  },
  {
    id: 'BRA',
    name: 'Brazil',
    continent: 'South America',
    population: 200,
    activities: [],
  },
  {
    id: 'FRA',
    name: 'France',
    continent: 'Europe',
    population: 67,
    activities: [{ id: '2', name: 'Museum' }],
  },
];

test('orders countries without mutating the source arrays', () => {
  const loadedState = reducer(initialState, { type: GET_COUNTRIES, payload: countries });
  const originalCountries = loadedState.countries;
  const orderedState = reducer(loadedState, { type: BY_POPULATION, payload: 'Max' });

  expect(orderedState.countries.map((country) => country.id)).toEqual(['BRA', 'FRA', 'ARG']);
  expect(originalCountries.map((country) => country.id)).toEqual(['ARG', 'BRA', 'FRA']);
});

test('combines continent and activity filters from allCountries', () => {
  const loadedState = reducer(initialState, { type: GET_COUNTRIES, payload: countries });
  const byContinent = reducer(loadedState, { type: BY_CONTINENT, payload: 'South America' });
  const byActivity = reducer(byContinent, { type: BY_ACTIVITY, payload: 'Ski' });

  expect(byActivity.countries.map((country) => country.id)).toEqual(['ARG']);
});

test('stores activities fetched from the backend', () => {
  const activities = [{ id: '1', name: 'Ski', countries: ['ARG'] }];
  const state = reducer(initialState, { type: GET_ACTIVITIES, payload: activities });

  expect(state.activities).toEqual(activities);
});
