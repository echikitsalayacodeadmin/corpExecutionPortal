import axios from "axios";
import { Resolver } from "../resolver/resolver";

export async function updateDataGlobal(url, payload, token) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return await Resolver(
    axios.patch(url, payload, { headers }).then((res) => res.data)
  );
}
export async function updateFormDataGlobal(url, formData, token) {
  return await Resolver(
    axios(url, {
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.data)
  );
}
