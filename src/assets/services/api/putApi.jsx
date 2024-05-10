import axios from "axios";
import { Resolver } from "../resolver/resolver";

export async function updateDataPutGlobal(url, data, token) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  return await Resolver(
    axios.put(url, data, { headers }).then((res) => res.data)
  );
}

export async function updatePutGlobalUploadFile(url, formData, token) {
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
