import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/orgAnalysisServices";

export const fetchAllConsolidatedReport = async (
  corpId,
  setIsLoading,
  setMasterData
) => {
  const url = BASE_URL + `org/analysis/all?corpId=${corpId}`;
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);
    console.log({ SUCCESS: response.data });
    setMasterData(response.data);
  } else {
    console.log({ ERROR: response.error });
    setIsLoading(false);
    setMasterData([]);
  }
};
