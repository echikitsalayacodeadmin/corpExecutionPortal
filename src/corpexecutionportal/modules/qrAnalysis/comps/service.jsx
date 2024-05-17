import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { getData } from "../../../assets/corpServices";

export const _fetchEmployeeByEmpIdQRReader = async (
  corpId,
  employeeId,
  setEmployee,
  navigate,
  value
) => {
  const campCycleId =
    localStorage.getItem("CAMP_ID_CORP_EXECUTION") === "null"
      ? null
      : localStorage.getItem("CAMP_ID_CORP_EXECUTION");
  const url =
    BASE_URL +
    `org/detailed/campcycle/${employeeId}?corpId=${corpId}&campCycleId=${
      campCycleId || ""
    }`;

  const empData = await getData(url);
  if (empData.error) {
    enqueueSnackbar(empData?.error?.response?.data?.message, {
      variant: "error",
    });
    setEmployee({});
  } else {
    setEmployee(empData.data);
    navigate(
      `/camp/employeedetail/${employeeId}?VITALS_ID=${value?.VITALS_ID}&NAME=${value?.NAME}`
    );
  }
};
