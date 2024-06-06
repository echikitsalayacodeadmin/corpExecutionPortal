import { BASE_URL_AUTH } from "../../assets/constants";
import { saveDataWithoutToken } from "../assets/orgAnalysisServices";

export const authenticateUser = async (
  setAuthToken,
  payload,
  enqueueSnackbar,
  navigate
) => {
  const url = BASE_URL_AUTH + `authenticate`;

  const response = await saveDataWithoutToken(url, payload);
  if (response.error) {
    console.log({ error: response.error });
    enqueueSnackbar("Incorrect Username or Password!", {
      variant: "error",
    });
  } else {
    let token = await response?.data?.token;
    localStorage.setItem("AUTHHEADER_ORG_ANALYSIS", token);
    setAuthToken(token);
    enqueueSnackbar("User Successfully logged in!", {
      variant: "success",
    });
    navigate("/org-analysis/select-corp");
  }
};
