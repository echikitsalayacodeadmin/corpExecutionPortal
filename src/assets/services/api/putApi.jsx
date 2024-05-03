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
