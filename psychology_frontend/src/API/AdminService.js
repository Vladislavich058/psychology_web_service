import axios from "axios";
import getAuthHeader from "utils/getAuthHeader";
const API_URL = "http://localhost:8080/api/admin/";

export default class AdminService {
  static async getPsychologists() {
    const response = await axios.get(API_URL + "psychologists", {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async getSpecializations() {
    const response = await axios.get(API_URL + "specializations", {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async getOffices() {
    const response = await axios.get(API_URL + "offices", {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async getRecords() {
    const response = await axios.get(API_URL + "records", {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async getAnalitic(date) {
    const response = await axios.get(API_URL + "analitic", {
      headers: getAuthHeader(),
      params: {
        date: date,
      },
    });
    return response;
  }

  static async getCalls() {
    const response = await axios.get(API_URL + "calls", {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async deleteSpecializationById(id) {
    const response = await axios.delete(API_URL + "specialization/" + id, {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async deleteRecordById(id) {
    const response = await axios.delete(API_URL + "record/" + id, {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async callBackById(id) {
    const response = await axios.get(API_URL + "callBack/" + id, {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async addSpecialization({ specialization }) {
    const response = await axios.post(
      API_URL + "addSpecialization",
      specialization,
      {
        headers: getAuthHeader(),
      }
    );
    return response;
  }

  static async addPsychologist(formData) {
    const response = await axios.post(API_URL + "addPsychologist", formData, {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async editPsychologist(formData) {
    const response = await axios.patch(API_URL + "editPsychologist", formData, {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async deletePsychologistById(id) {
    const response = await axios.delete(API_URL + "psychologist/" + id, {
      headers: getAuthHeader(),
    });
    return response;
  }

  static async getPsychologistById(id) {
    const response = await axios.get(API_URL + "psychologist/" + id, {
      headers: getAuthHeader(),
    });
    return response;
  }
}
