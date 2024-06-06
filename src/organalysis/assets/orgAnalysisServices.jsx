import { deleteDataGlobal } from "../../assets/services/api/deleteApi";
import { getDataGlobal } from "../../assets/services/api/getApiCalls";
import {
  updateDataGlobal,
  updateFormDataGlobal,
} from "../../assets/services/api/patchApi";
import {
  saveDataGlobal,
  saveDataWithoutTokenGlobal,
  uploadFileGlobal,
} from "../../assets/services/api/postApiCalls";

export const getData = async (url) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_ORG_ANALYSIS");
  const response = await getDataGlobal(url, authHeader_local);
  return response;
};

export const saveData = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_ORG_ANALYSIS");
  const response = await saveDataGlobal(url, payload, authHeader_local);
  return response;
};
export const saveDataWithoutToken = async (url, payload) => {
  const response = await saveDataWithoutTokenGlobal(url, payload);
  return response;
};

export const updateData = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_ORG_ANALYSIS");
  const response = await updateDataGlobal(url, payload, authHeader_local);
  return response;
};
export const updateMultipartData = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_ORG_ANALYSIS");
  const response = await updateFormDataGlobal(url, payload, authHeader_local);
  return response;
};

export const uploadFile = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_ORG_ANALYSIS");
  const response = await uploadFileGlobal(url, payload, authHeader_local);
  return response;
};

export const deleteData = async (url) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_ORG_ANALYSIS");
  const response = await deleteDataGlobal(url, authHeader_local);
  return response;
};
