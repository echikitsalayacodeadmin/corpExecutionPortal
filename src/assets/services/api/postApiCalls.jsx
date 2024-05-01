import axios from "axios";
import { Resolver } from "../resolver/resolver";

export async function saveDataGlobal(url, obj, token) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  return await Resolver(
    axios.post(url, obj, { headers }, { timeout: 5000 }).then((res) => res.data)
  );
}
export async function saveDataWithoutTokenGlobal(url, obj) {
  const headers = {
    "Content-Type": "application/json",
  };
  return await Resolver(
    axios.post(url, obj, { headers }, { timeout: 5000 }).then((res) => res.data)
  );
}

export async function uploadFileGlobal(url, formData, token) {
  return await Resolver(
    axios(url, {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.data)
  );
}
