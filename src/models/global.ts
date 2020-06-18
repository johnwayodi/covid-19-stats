import humps from 'humps';
import { forEach, lowerCase, startsWith, orderBy } from 'lodash';
import { Action, Effects } from './dispatch';
import { ApiService } from '../services/api.service';

export interface CountrySummary {
  country: string;
  countryCode: string;
  slug: string;
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
  date: string;
}

export interface GlobalSummary {
  newConfirmed: number;
  totalConfirmed: number;
  newDeaths: number;
  totalDeaths: number;
  newRecovered: number;
  totalRecovered: number;
}

export interface CountryDailyStat {
  active: number;
  city?: string;
  cityCode?: string;
  confirmed: number;
  country: string;
  countryCode: string;
  date: string;
  deaths: 100;
  lat: string;
  lon: string;
  province?: string;
  recovered: number;
}

export interface GlobalState {
  summary: GlobalSummary;
  countries: CountrySummary[];
  searchResults: CountrySummary[];
  countrySummary: CountryDailyStat[];
  date: string;
}

const initialState: GlobalState = {
  summary: {
    newConfirmed: 0,
    totalConfirmed: 0,
    newDeaths: 0,
    totalDeaths: 0,
    newRecovered: 0,
    totalRecovered: 0,
  },
  countries: [],
  searchResults: [],
  countrySummary: [],
  date: '',
};

export default {
  namespace: 'global',
  state: initialState,
  effects: {
    *fetchSummary(action: Action, { call, put }: Effects) {
      try {
        const response = yield call(ApiService.getSummary);
        if (response) {
          const data: any = humps.camelizeKeys(response);
          const { global, countries } = data;
          yield put({
            type: 'setSummary',
            payload: global,
          });
          yield put({
            type: 'setCountries',
            payload: orderBy(countries, ['totalDeaths'], ['desc']),
          });
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    },

    *searchCountry({ payload }: Action, { put, select }: Effects) {
      const { name } = payload;
      try {
        let results: any = [];
        const { countries } = yield select(({ global }: any): GlobalState => global);
        forEach(countries, (country) => {
          if (startsWith(lowerCase(country.country), lowerCase(name))) {
            results = [...results, country];
          }
        });
        yield put({
          type: 'setSearchResult',
          payload: orderBy(results, ['country']),
        });
      } catch (error) {
        console.log('ERROR', error);
      }
    },
    *sortCountries({ payload }: Action, { put, select }: Effects) {
      const { key } = payload;
      try {
        const { countries } = yield select(({ global }: any): GlobalState => global);
        yield put({
          type: 'setCountries',
          payload: orderBy(countries, [`${key}`], ['desc']),
        });
      } catch (error) {
        console.log('ERROR', error);
      }
    },
    *fetchCountrySummary({ payload }: Action, { call, put }: Effects) {
      const { slug } = payload;
      try {
        const response = yield call(ApiService.getCountrySummary, slug);
        if (response) {
          const data: any = humps.camelizeKeys(response);
          console.log('Country Data', data);
          // const { global, countries } = data;
          yield put({
            type: 'setCountryResult',
            payload: data,
          });
          // yield put({
          //   type: 'setCountries',
          //   payload: orderBy(countries, ['totalDeaths'], ['desc']),
          // });
        }
      } catch (error) {
        console.log('ERROR', error);
      }
    },
  },
  reducers: {
    setSummary(state: GlobalState, { payload }: Action): GlobalState {
      return { ...state, summary: payload };
    },

    setCountries(state: GlobalState, { payload }: Action): GlobalState {
      return { ...state, countries: payload };
    },
    setSearchResult(state: GlobalState, { payload }: Action): GlobalState {
      return { ...state, searchResults: payload };
    },
    setCountryResult(state: GlobalState, { payload }: Action): GlobalState {
      return { ...state, countrySummary: payload };
    },
  },
};
