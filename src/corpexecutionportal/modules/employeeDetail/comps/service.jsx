import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { getData } from "../../../assets/corpServices";

export const _fetchEmployeeByEmpIdNew = async (
  corpId,
  employeeId,
  setEmployee
) => {
  const campCycleId =
    localStorage.getItem("CAMP_ID") === "null"
      ? null
      : localStorage.getItem("CAMP_ID");
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
  }
};

export const _fetchEmployeeByVitalsId = async (
  vitalsId,
  setEmployee,
  setFormValues
) => {
  const url = BASE_URL + `org/reporting/masterPdfSummary/${vitalsId}`;

  const empData = await getData(url);
  if (empData.error) {
    enqueueSnackbar(empData?.error?.response?.data?.message, {
      variant: "error",
    });
    setEmployee({});
  } else {
    setEmployee(empData.data);
    setFormValues(Object.entries(empData.data?.qcDetails) || []);
  }
};
