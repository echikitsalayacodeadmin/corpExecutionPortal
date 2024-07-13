import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/reportingServices";

const processCholestrolData = (data) => {
  // Destructure the relevant fields from data
  const {
    cholestrolData,
    healthyVitalsData,
    unhealthyVitalsData,
    vitalsErrorData,
  } = data;

  // Create a copy of the cholestrolData object to avoid mutating the original data
  const updatedCholestrolData = { ...cholestrolData };

  // Add status keys for healthy vitals
  Object.keys(healthyVitalsData).forEach((key) => {
    if (updatedCholestrolData.hasOwnProperty(key)) {
      updatedCholestrolData[`${key}Status`] = "Fit";
    }
  });

  // Add status keys for unhealthy vitals
  Object.keys(unhealthyVitalsData).forEach((key) => {
    if (updatedCholestrolData.hasOwnProperty(key)) {
      updatedCholestrolData[`${key}Status`] = "Unfit";
    }
  });

  // Add status keys for vitals errors
  Object.keys(vitalsErrorData).forEach((key) => {
    if (updatedCholestrolData.hasOwnProperty(key)) {
      updatedCholestrolData[`${key}Status`] = "Error";
    }
  });

  // Return the updated data with the processed cholestrolData
  return {
    ...data,
    cholestrolData: updatedCholestrolData,
  };
};

export const fetchVitalsDataError = async (
  corpId,
  setIsLoading,
  setMasterData,
  updateEmployeeList
) => {
  const campCycleId =
    localStorage.getItem("CAMP_ID_REPORTING") === "null"
      ? null
      : localStorage.getItem("CAMP_ID_REPORTING");
  const url =
    BASE_URL +
    `org/superMasterData?corpId=${corpId}&campCycleId=${campCycleId || ""}`;
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);

    const temp = response.data
      .filter(
        (item) =>
          item.cholestrolData ||
          item.vitalsErrorData ||
          item.unhealthyVitalsData ||
          item.healthyVitalsData
      )
      .map((item, index) => {
        // Destructure cholestrolData to exclude the URINE_PROBLEMS field
        const { URINE_PROBLEMS, ...filteredCholestrolData } =
          item?.cholestrolData || "";
        return {
          empId: item?.empId,
          name: item?.name,
          age: item?.age,
          gender: item?.gender,
          tokenNumber: item?.tokenNumber || "",
          vitalsCreatedDate: item?.vitalsCreatedDate || "",
          cholestrolData: filteredCholestrolData || "",
          healthyVitalsData: item?.healthyVitalsData || "",
          unhealthyVitalsData: item?.unhealthyVitalsData || "",
          vitalsErrorData: item?.vitalsErrorData || "",
          urineProblem: item?.cholestrolData?.["URINE_PROBLEMS"] || "",
          bloodTestUrl: item?.bloodTestUrl ? item?.bloodTestUrl : "",
        };
      })
      .map((item) => processCholestrolData(item));

    setMasterData(temp);
    updateEmployeeList(
      temp.filter(
        (employee, index, self) =>
          employee.empId !== null &&
          employee.empId !== "" &&
          self.findIndex((e) => e?.empId === employee?.empId) === index
      )
    );
  } else {
    console.log({ ERROR: response.error });
    setIsLoading(false);
    console.log({ ERROR: response.error });
    setMasterData([]);
    updateEmployeeList([]);
  }
};
