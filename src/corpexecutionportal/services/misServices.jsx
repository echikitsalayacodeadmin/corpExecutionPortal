import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/corpServices";

export const fetchServices = async (setServices, setIsLoading) => {
  const url = BASE_URL + "corpSales/services";
  const result = await getData(url);
  if (result.data) {
    setIsLoading(false);
    setServices(result.data);
  } else {
    setIsLoading(false);
    console.log(result.error);
  }
};
