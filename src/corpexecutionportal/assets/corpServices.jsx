import {
  deleteDataGlobal,
  deleteDataWithObjectGlobal,
} from "../../assets/services/api/deleteApi";
import { getDataGlobal } from "../../assets/services/api/getApiCalls";
import { updateDataGlobal } from "../../assets/services/api/patchApi";
import {
  saveDataGlobal,
  uploadFileGlobal,
} from "../../assets/services/api/postApiCalls";
import { updateDataPutGlobal } from "../../assets/services/api/putApi";

export const getData = async (url) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_CORP_EXECUTION");
  const response = await getDataGlobal(url, authHeader_local);

  return response;
};
export const saveData = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_CORP_EXECUTION");
  const response = await saveDataGlobal(url, payload, authHeader_local);

  return response;
};

export const updateData = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_CORP_EXECUTION");
  const response = await updateDataGlobal(url, payload, authHeader_local);

  return response;
};

export const uploadData = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_CORP_EXECUTION");
  const response = await uploadFileGlobal(url, payload, authHeader_local);

  return response;
};

export const uploadFile = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_CORP_EXECUTION");
  const response = await uploadFileGlobal(url, payload, authHeader_local);
  return response;
};

export const deleteData = async (url) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_CORP_EXECUTION");
  const response = await deleteDataGlobal(url, authHeader_local);

  return response;
};

export const deleteDataWithObj = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_CORP_EXECUTION");
  const response = await deleteDataWithObjectGlobal(
    url,
    payload,
    authHeader_local
  );

  return response;
};

export const updateDatePut = async (url, payload) => {
  let authHeader_local = localStorage.getItem("AUTHHEADER_CORP_EXECUTION");
  const response = await updateDataPutGlobal(url, payload, authHeader_local);

  return response;
};
