import { jwtDecode } from "jwt-decode";
import { BASE_URL, BASE_URL_AUTH } from "../../assets/constants";
import { saveData, saveDataWithoutToken } from "../assets/corpServices";

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
    let userData = await jwtDecode(token);
    localStorage.setItem("AUTHHEADER_CORP_EXECUTION", token);
    localStorage.setItem("authHeader_local_CORP_SALES", token);
    localStorage.setItem("ROLE_CORP_SALES", userData?.role);
    localStorage.setItem("BRANCH_ID_CORP_SALES", userData?.userID);
    localStorage.setItem("BRANCH_ID_UNIQUE_CORP_SALES", userData?.userID);
    localStorage.setItem("CLINIC_ID_CORP_SALES", userData?.clinicId);
    localStorage.setItem("BRANCH_NAME_CORP_SALES", userData?.branchName);
    localStorage.setItem("USER_NAME_CORP_SALES", userData?.name);
    localStorage.setItem("USER_MOBILE_CORP_SALES", userData?.mobile);
    localStorage.setItem("USER_ID_CORP_SALES", userData?.id);
    localStorage.setItem("PORTAL_CORP_SALES", userData?.portal);
    localStorage.setItem("ROLES_CORP_SALES", userData?.roles);
    localStorage.setItem(
      "PERMISSION_CORP_SALES",
      userData?.permissions ? JSON.stringify(userData?.permissions) : null
    );
    // if (
    //   userData.role === "CORPSALES_ADMIN" ||
    //   userData.role === "CORPSALES_USER"
    // ) {
    //   navigate("/corp/home");
    //   enqueueSnackbar("Successfully Logged In", {
    //     variant: "success",
    //   });
    // } else {
    //   localStorage.clear();
    //   navigate("/");
    // enqueueSnackbar("You are not authorized to login", {
    //   variant: "error",
    // });
    // }

    navigate("/corp/home");
  }
};

export const sendOTP = async (payload, enqueueSnackbar, setOtpSent) => {
  setOtpSent(true);
  const url = BASE_URL_AUTH + "authenticate?sendOtp=true";
  const otpData = await saveDataWithoutToken(url, payload);
  if (otpData?.data) {
    enqueueSnackbar("OTP Send to your registered mobile number.", {
      variant: "success",
    });
  } else {
    enqueueSnackbar("OTP generation failed.", {
      variant: "error",
    });
  }
};

export const authenticateMobileUser = async (
  payload,
  navigate,
  enqueueSnackbar
) => {
  const url = BASE_URL_AUTH + "authenticate?authOnOTP=true";
  const response = await saveDataWithoutToken(url, payload);
  if (response.error) {
    console.log({ error: response.error });
    enqueueSnackbar(`${response.error.response.data.message}`, {
      variant: "error",
    });
  } else {
    let token = await response?.data?.token;
    let userData = await jwtDecode(token);
    localStorage.setItem("AUTHHEADER_CORP_EXECUTION", token);
    localStorage.setItem("authHeader_local_CORP_SALES", token);
    localStorage.setItem("ROLE_CORP_SALES", userData?.role);
    localStorage.setItem("BRANCH_ID_CORP_SALES", userData?.userID);
    localStorage.setItem("BRANCH_ID_UNIQUE_CORP_SALES", userData?.userID);
    localStorage.setItem("CLINIC_ID_CORP_SALES", userData?.clinicId);
    localStorage.setItem("BRANCH_NAME_CORP_SALES", userData?.branchName);
    localStorage.setItem("USER_NAME_CORP_SALES", userData?.name);
    localStorage.setItem("USER_MOBILE_CORP_SALES", userData?.mobile);
    localStorage.setItem("USER_ID_CORP_SALES", userData?.id);
    localStorage.setItem("PORTAL_CORP_SALES", userData?.portal);
    localStorage.setItem("ROLES_CORP_SALES", userData?.roles);
    localStorage.setItem(
      "PERMISSION_CORP_SALES",
      userData?.permissions ? JSON.stringify(userData?.permissions) : null
    );
    if (
      userData.role === "CORPSALES_ADMIN" ||
      userData.role === "CORPSALES_USER"
    ) {
      navigate("/corp/home");
      enqueueSnackbar(`${response.error.response.data.message}`, {
        variant: "success",
      });
    } else {
      localStorage.clear();
      navigate("/");
      enqueueSnackbar(`${response.error.response.data.message}`, {
        variant: "error",
      });
    }
    navigate("/corp/home");
  }
};
