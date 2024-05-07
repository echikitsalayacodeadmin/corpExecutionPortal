import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/corpServices";

const sortArrayBySequence = (array) =>
  array.sort((a, b) => a.sequence - b.sequence);

const calculateSystemPricePerEmployee = (formValues) => {
  return formValues?.ahc?.map((ahcItem) => {
    const noOfEmployees = parseInt(ahcItem.noOfEmp) || 1; // Handle empty string as 0
    const sumOfTotalTestsBestPrice = ahcItem.tableData.reduce(
      (total, test) => total + parseInt(test.bestPrice || 0),
      0
    );
    const sumOfTotalTestsQuotePrice = ahcItem.tableData.reduce(
      (total, test) => total + parseInt(test.quotePrice || 0),
      0
    );
    const systemPricePerEmployee = sumOfTotalTestsBestPrice;
    const finalPricePerEmployee = sumOfTotalTestsQuotePrice;
    const totalSystemPrice = noOfEmployees * systemPricePerEmployee || "";
    const finalPrice =
      ahcItem.finalPricePerEmployee === ""
        ? parseInt(ahcItem.finalPrice) || ""
        : finalPricePerEmployee * noOfEmployees || "";

    return {
      ...ahcItem,
      systemPricePerEmployee:
        Math.round(systemPricePerEmployee).toString() || "",
      systemPrice: Math.round(totalSystemPrice).toString() || "",
      finalPrice: Math.round(finalPrice).toString() || "",
      finalPricePerEmployee: Math.round(finalPricePerEmployee).toString() || "",
    };
  });
};

export const fetchItemListAHC = async (setItemList, setRows, setIsLoading) => {
  const url = BASE_URL + "quotation/list";

  const response = await getData(url);
  if (response?.data) {
    const sortedData = sortArrayBySequence(
      response?.data?.filter((item) => item.quotationDataType === "AHC")
    );
    setItemList(sortedData);
    setRows(sortedData);
    setIsLoading(false);
  } else {
    console.error("Error fetching data:", response?.error);
    setIsLoading(false);
  }
};

export const fetchItemListOHC = async (setItemList, setRows, setIsLoading) => {
  const url = BASE_URL + "quotation/list";

  const response = await getData(url);
  if (response?.data) {
    const sortedData = sortArrayBySequence(
      response?.data?.filter((item) => item.quotationDataType === "OHC")
    );
    setItemList(sortedData);
    setRows(sortedData);
    setIsLoading(false);
  } else {
    console.error("Error fetching data:", response?.error);
    setIsLoading(false);
  }
};

export const fetchItemListNew = async (
  quotationDataType,
  field,
  tableIndex,
  formValues,
  setFormValues,
  setItemList,
  setIsLoading
) => {
  const url = BASE_URL + "quotation/list";
  const response = await getData(url);
  if (response?.data) {
    const handleRecalculateSystemPrices = () => {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        ahc: calculateSystemPricePerEmployee(prevFormValues),
      }));
    };
    const sortedData = sortArrayBySequence(
      quotationDataType === "AHC"
        ? response?.data
            ?.filter((item) => item.quotationDataType === "AHC")
            .map((item, index) => {
              let marginPercent = Math.floor(
                ((parseFloat(item.quotePrice) - parseFloat(item.bestPrice)) /
                  parseFloat(item.quotePrice)) *
                  100
              );
              let revenue = 0;
              if (item.noOfEmp) {
                revenue = item.quotePrice * item.noOfEmp;
              }

              return {
                id: item.id,
                testName: item.testName,
                description: item.description,
                bestPrice: item.bestPrice,
                throwAwayPrice: item.throwAwayPrice,
                quotePrice: item.quotePrice,
                quotationDataType: "AHC",
                sequence: item.sequence,
                revenue: revenue,
                marginPercent: marginPercent,
                noOfEmp: item.noOfEmp,
              };
            })
        : quotationDataType === "OHC"
        ? response.data
            ?.filter((item) => item.quotationDataType === "OHC")
            ?.map((item, index) => ({
              id: item.id,
              sequence: item.sequence,
              ohcPackageType: item.ohcPackageType,
              description: item.description,
              bestPrice: parseInt(item.bestPrice) || "",
              quotePrice: parseInt(item.quotePrice) || "",
              quantity: parseInt(item.quantity) || "",
              totalCost: item.quotePrice
                ? parseInt(item.quotePrice) * parseInt(item.quantity) || ""
                : parseInt(item.bestPrice) * parseInt(item.quantity) || "",
              quotationDataType: "OHC",
            }))
        : []
    );
    setItemList(sortedData);
    if (formValues?.[field]?.[tableIndex]?.tableData?.length === 0) {
      setFormValues((prevFormValues) => {
        if (!prevFormValues || !prevFormValues[field]) {
          return prevFormValues;
        }
        const updatedHc = [...prevFormValues[field]];
        if (tableIndex >= 0 && tableIndex < updatedHc.length) {
          // Check if existing data exists in tableData
          if (
            !updatedHc[tableIndex].tableData ||
            updatedHc[tableIndex].tableData.length === 0
          ) {
            updatedHc[tableIndex].tableData = sortedData;
          } else {
            console.log(
              "tableData already contains existing data, sortedData not set."
            );
          }
        } else {
          console.error("Invalid tableIndex:", tableIndex);
        }
        return {
          ...prevFormValues,
          [field]: updatedHc,
        };
      });
    }
    setIsLoading(false);
    handleRecalculateSystemPrices();
  } else {
    console.error("Error fetching data:", response?.error);
    setIsLoading(false);
  }
};

export const fetchItemListNew2 = async (setItemList) => {
  const url = BASE_URL + "quotation/list";
  const response = await getData(url);
  if (response?.data) {
    setItemList(
      sortArrayBySequence(
        response?.data.filter((item) => item.quotationDataType === "AHC")
      )
    );
  } else {
    console.error("Error fetching data:", response?.error);
    setItemList([]);
  }
};
export const fetchItemListOhc2 = async (setItemList) => {
  const url = BASE_URL + "quotation/list";
  const response = await getData(url);
  if (response?.data) {
    setItemList(
      sortArrayBySequence(
        response?.data.filter((item) => item.quotationDataType === "OHC")
      )
    );
  } else {
    console.error("Error fetching data:", response?.error);
    setItemList([]);
  }
};
