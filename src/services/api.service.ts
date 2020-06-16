import request from "umi-request";
import { ServerEnv } from "../env";

const serverEnv = ServerEnv();

export class ApiService {
  public static async getSummary() {
    try {
      const response = await request(serverEnv.summaryUrl, {
        method: "get",
      });
      return response;
    } catch (error) {
      console.log("Service Fail", error);
      return;
    }
  }
}
