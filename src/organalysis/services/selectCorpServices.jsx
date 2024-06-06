import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/reportingServices";

export const fetchCorps = async (setIsLoading, setCorpList) => {
  setIsLoading(true);
  const url = BASE_URL + "org/reporting/all";
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);
    console.log({ SUCCESS: response.data });
    setCorpList(response.data);
  } else {
    setIsLoading(false);
    console.log({ ERROR: response.error });
    setCorpList([]);
  }
};
