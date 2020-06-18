import request from 'umi-request';
import { ServerEnv } from '../env';

const serverEnv = ServerEnv();

export class ApiService {
  public static async getSummary() {
    try {
      const response = await request(`${serverEnv.apiUrl}/summary`, {
        method: 'get',
      });
      return response;
    } catch (error) {
      console.log('Service Fail', error);
      return;
    }
  }

  public static async getCountrySummary(slug: string) {
    try {
      const response = await request(`${serverEnv.apiUrl}/country/${slug}`, {
        method: 'get',
        params: {
          from: '2020-06-10T00:00:00Z',
          to: '2020-06-18T00:00:00Z',
        },
      });
      return response;
    } catch (error) {
      console.log('Service Fail', error);
      return;
    }
  }
}
