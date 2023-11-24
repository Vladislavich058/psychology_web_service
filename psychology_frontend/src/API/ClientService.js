import axios from "axios";
const API_URL = "http://localhost:8080/api/";

export default class ClientService {
  static async getPsychologists() {
    const response = await axios.get(API_URL + "psychologists");
    return response;
  }

  static async getOffices() {
    const response = await axios.get(API_URL + "offices");
    return response;
  }

  static async getFreeTimes(id, date) {
    const response = await axios.get(API_URL + "times/" + id, {
      params: {
        date: date,
      },
    });
    return response;
  }

  static async getFreeOffices(date, time, duration) {
    const response = await axios.get(API_URL + "freeOffices", {
      params: {
        date: date,
        time: time,
        duration: duration,
      },
    });
    return response;
  }

  static async addRecord({ record }) {
    const response = await axios.post(API_URL + "addRecord", record);
    return response;
  }

  static async addCall({ call }) {
    const response = await axios.post(API_URL + "addCall", call);
    return response;
  }
}
