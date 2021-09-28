import moment from 'moment';
import { DailyReport } from '../models/interfaces';

export const formatWeekTrendData = (confirmed: any[], deaths: any[]) => {
  let data: DailyReport[] = [];
  let i = 1;

  const name = confirmed[0].country;
  for (i = 1; i < confirmed.length; i++) {
    data = [
      ...data,
      {
        date: moment(confirmed[i].date).format('DD-MM-YYYY'),
        confirmed: Math.abs(confirmed[i].cases - confirmed[i - 1].cases),
        deaths: Math.abs(deaths[i].cases - deaths[i - 1].cases),
      },
    ];
  }

  return [data, name];
};
