import { enqueueSnackbar } from "notistack";
import { BASE_URL_AUTH } from "../../assets/constants";
import { saveData } from "../assets/reportingServices";
import { jwtDecode } from "jwt-decode";

export const authenticateUser = async (navigate, payload) => {
  const url = BASE_URL_AUTH + `authenticate`;
  const response = await saveData(url, payload);
  if (response.error) {
    console.log({ error: response.error.response.data.message });
    enqueueSnackbar(`${response.error.response.data.message}`, {
      variant: "error",
    });
  } else {
    let token = await response?.data?.token;
    let decodeToken = jwtDecode(token);
    let role = await decodeToken.role;
    localStorage.setItem("REPORTING_ROLE", role);
    localStorage.setItem("AUTHHEADER_REPORTING", token);

    if (
      role === "REPORTING_ADMIN" ||
      role === "REPORTING" ||
      role === "REPORTING_OPS"
    ) {
      enqueueSnackbar("User Successfully logged in!", {
        variant: "success",
      });
    }
    navigate("/reporting/select-corp");
  }
};
