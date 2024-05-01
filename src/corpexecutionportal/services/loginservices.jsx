import { jwtDecode } from "jwt-decode";
import { BASE_URL, BASE_URL_AUTH } from "../../assets/constants";
import { saveData } from "../assets/corpServices";

export const authenticateUser = async (payload, navigate, enqueueSnackbar) => {
  const url = BASE_URL_AUTH + `authenticate`;

  const response = await saveData(url, payload);
  if (response.error) {
    console.log({ error: response.error });
    enqueueSnackbar("Incorrect Username or Password!", {
      variant: "error",
    });
  } else {
    let token = await response?.data?.token;
    localStorage.setItem("AUTHHEADER_CORP_EXECUTION", token);
    enqueueSnackbar("Successfully Logged In", {
      variant: "success",
    });
    navigate("/corp/home");
  }
};
