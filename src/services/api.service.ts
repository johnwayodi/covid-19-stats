import humps from 'humps';
import moment from 'moment';
import request from 'umi-request';
import { ServerEnv } from '../env';

const serverEnv = ServerEnv();

export class ApiService {
  public static async getSummary() {
    try {
      const response = await request(`${serverEnv.apiUrl}/summary`, {
        method: 'get',
      });
      return humps.camelizeKeys(response);
    } catch (error) {
      console.log('Service Fail', error);
      return;
    }
  }

  public static async getCountrySummary(slug: string, status: string) {
    try {
      const fromDate = moment().startOf('day').subtract(30, 'days').toISOString();
      const toDate = moment().startOf('day').toISOString();
      const response = await request(`${serverEnv.apiUrl}/total/country/${slug}/status/${status}`, {
        method: 'get',
        params: {
          from: fromDate,
          to: toDate,
        },
      });
      return humps.camelizeKeys(response);
    } catch (error) {
      console.log('Service Fail', error);
      return;
    }
  }
}
