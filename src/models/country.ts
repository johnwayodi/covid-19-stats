import { Action, Effects } from './dispatch';
import { split } from 'lodash';
import { ApiService } from '../services/api.service';
import { CountryState } from './interfaces';
import { formatWeekTrendData } from '../utils/formatData';

const initialState: CountryState = {
  countrySlug: '',
  countryName: '',
  sortVisible: true,
  monthSummary: [],
};

export default {
  namespace: 'country',
  state: initialState,
  effects: {
    *fetchMonthSummary({ payload }: Action, { call, put }: Effects) {
      const { slug } = payload;
      try {
        yield put({ type: 'setSortVisible', payload: false });
        const countrySlug = split(slug, '/', 3)[2];
        yield put({ type: 'setCountrySlug', payload: countrySlug });
        const confirmed = yield call(ApiService.getCountrySummary, countrySlug, 'confirmed');
        const deaths = yield call(ApiService.getCountrySummary, countrySlug, 'deaths');

        const [result, name] = formatWeekTrendData(confirmed, deaths);

        yield put({ type: 'setCountryName', payload: name });
        yield put({ type: 'setMonthSummary', payload: result });
      } catch (error) {
        console.log('ERROR', error);
      }
    },

    *activateSort(action: Action, { put }: Effects) {
      yield put({ type: 'setSortVisible', payload: true });
    },
  },
  reducers: {
    setCountrySlug(state: CountryState, { payload }: Action): CountryState {
      return { ...state, countrySlug: payload };
    },
    setCountryName(state: CountryState, { payload }: Action): CountryState {
      return { ...state, countryName: payload };
    },
    setMonthSummary(state: CountryState, { payload }: Action): CountryState {
      return { ...state, monthSummary: payload };
    },
    setSortVisible(state: CountryState, { payload }: Action): CountryState {
      return { ...state, sortVisible: payload };
    },
    setDefault(state: CountryState): CountryState {
      return { ...state, ...initialState };
    },
  },
};
