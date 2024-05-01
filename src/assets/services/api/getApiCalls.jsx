import axios from "axios";
import { Resolver } from "../resolver/resolver";

export async function getDataGlobal(url, token) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  return await Resolver(axios.get(url, { headers }).then((res) => res.data));
}
