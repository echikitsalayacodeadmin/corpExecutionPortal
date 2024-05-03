import axios from "axios";
import { Resolver } from "../resolver/resolver";

export async function deleteDataGlobal(url, token) {
  return await Resolver(
    axios(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.data)
  );
}

export async function deleteDataWithObjectGlobal(url, payload, token) {
  return await Resolver(
    axios(url, {
      method: "DELETE",
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.data)
  );
}
