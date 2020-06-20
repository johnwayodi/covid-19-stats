import humps from 'humps';
import { forEach } from 'lodash';
import { Action, Effects } from './dispatch';
import { ApiService } from '../services/api.service';
import { CountryState, WeekTrendChartType } from './interfaces';
import moment from 'moment';

const initialState: CountryState = {
  countrySlug: '',
  countryName: '',
  weekSummary: [],
  weekTrendStats: [],
};

export default {
  namespace: 'country',
  state: initialState,
  effects: {
    *fetchWeekSummary({ payload }: Action, { call, put }: Effects) {
      let weekData: WeekTrendChartType[] = [];
      const { slug } = payload;
      try {
        yield put({ type: 'setCountrySlug', payload: slug });
        const response = yield call(ApiService.getCountrySummary, slug);
        if (response) {
          const data: any = humps.camelizeKeys(response);
          console.log('COUNTRY SUMMARY', data);
          if (data.length) {
            forEach(data, (item, index) => {
              const { active, confirmed, deaths, recovered } = item;
              const formattedDate = moment(item.date).format('L');
              weekData = [...weekData, { date: formattedDate, value: active, type: 'active' }];
              weekData = [...weekData, { date: formattedDate, value: confirmed, type: 'confirmed' }];
              weekData = [...weekData, { date: formattedDate, value: deaths, type: 'deaths' }];
              weekData = [...weekData, { date: formattedDate, value: recovered, type: 'recovered' }];
            });
            console.log('Formatted Data', weekData);
            yield put({ type: 'setCountryName', payload: data[0].country });
            yield put({ type: 'setWeekSummary', payload: data });
            yield put({ type: 'setChartValues', payload: weekData });
          }
        }
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
    setWeekSummary(state: CountryState, { payload }: Action): CountryState {
      return { ...state, weekSummary: payload };
    },
    setChartValues(state: CountryState, { payload }: Action): CountryState {
      return { ...state, weekTrendStats: payload };
    },
    setDefault(state: CountryState): CountryState {
      return { ...state, ...initialState };
    },
  },
};
