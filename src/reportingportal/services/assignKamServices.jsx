import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/reportingServices";

export const fetchKamList = async (setIsLoading, setKAMList) => {
  const url = BASE_URL + "patient/role?role=KAM";
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);

    setKAMList(response.data);
  } else {
    setIsLoading(false);
    console.log({ ERROR: response.error });
    setKAMList([]);
  }
};
export const fetchCorpKamList = async (setIsLoading, setCorpKamList) => {
  const url = BASE_URL + "org/kam/all";
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);

    setCorpKamList(response.data);
  } else {
    setIsLoading(false);
    console.log({ ERROR: response.error });
    setCorpKamList([]);
  }
};
