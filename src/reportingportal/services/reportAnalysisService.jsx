import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/reportingServices";

export const fetchReportAnalysisData = async (
  corpId,
  setIsLoading,
  setMasterData
) => {
  const campCycleId =
    localStorage.getItem("CAMP_ID_REPORTING") === "null"
      ? null
      : localStorage.getItem("CAMP_ID_REPORTING");
  const url =
    BASE_URL +
    `org/ahcCountOfImportantParams/${corpId}?campCycleId=${campCycleId || ""}`;
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);
    console.log({ SUCCESS: response.data });
    setMasterData(response.data);
  } else {
    console.log({ ERROR: response.error });
    setIsLoading(false);
    console.log({ ERROR: response.error });
    setMasterData(null);
  }
};
