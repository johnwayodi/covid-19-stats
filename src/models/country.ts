import { Action, Effects } from './dispatch';
import { ApiService } from '../services/api.service';
import { CountryState } from './interfaces';
import { formatWeekTrendData } from '../utils/formatData';

const initialState: CountryState = {
  countrySlug: '',
  countryName: '',
  monthSummary: [],
};

export default {
  namespace: 'country',
  state: initialState,
  effects: {
    *fetchMonthSummary({ payload }: Action, { call, put, select }: Effects) {
      const { slug } = payload;
      try {
        yield put({ type: 'setCountrySlug', payload: slug });
        const confirmed = yield call(ApiService.getCountrySummary, slug, 'confirmed');
        const recovered = yield call(ApiService.getCountrySummary, slug, 'recovered');
        const deaths = yield call(ApiService.getCountrySummary, slug, 'deaths');

        const [result, name] = formatWeekTrendData(confirmed, recovered, deaths);

        yield put({ type: 'setCountryName', payload: name });
        yield put({ type: 'setMonthSummary', payload: result });
      } catch (error) {
        console.log('ERROR', error);
      }
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
    setDefault(state: CountryState): CountryState {
      return { ...state, ...initialState };
    },
  },
};
