import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/reportingServices";

export const fetchSnopCorps = async (setIsLoading, setSnopCorpList) => {
  setIsLoading(true);
  const url = BASE_URL + "org/corpConfigInfo/unique";
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);
    console.log({ SUCCESS: response.data });
    setSnopCorpList(response.data);
  } else {
    setIsLoading(false);
    console.log({ ERROR: response.error });
    setSnopCorpList([]);
  }
};

export const fetchRegisteredCorps = async (setIsLoading, setCorpList) => {
  setIsLoading(true);
  const url = BASE_URL + "org/reporting/all/completeStatus";
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
