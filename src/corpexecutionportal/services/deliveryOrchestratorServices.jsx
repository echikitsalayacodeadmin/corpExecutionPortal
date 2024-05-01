import { BASE_URL } from "../../assets/constants";
import { downloadCsv, sortBySequence } from "../../assets/utils";
import { getData } from "../assets/corpServices";

export const fetchAllTaskList = async (
  corpId,
  setIsLoading,
  setMasterData,
  filterValue,
  sequence
) => {
  const campCycleId = "";

  // localStorage.getItem("CAMP_ID_CORP_EXECUTION") === "null"
  //   ? null
  //   : localStorage.getItem("CAMP_ID_CORP_EXECUTION");
  const url =
    BASE_URL + `task/all?corpId=${corpId}&campCycleId=${campCycleId || ""}`;
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);
    let temp = response.data.filter((obj) => obj.itemType === filterValue);
    setMasterData(
      filterValue !== undefined && sequence !== undefined
        ? sortBySequence(temp, sequence)
        : response.data
    );
  } else {
    setIsLoading(false);
    setMasterData([]);
  }
};

// const modifyArray = (arr) => {
//   return arr.map((item, index) => ({
//     empId: item.empId,
//     tokenNumber: item.tokenNumber ? parseInt(item?.tokenNumber) : "",
//     name: item.name,
//     employmentType: item.employmentType,
//     designation: item.designation,
//     department: item.department,
//     mobileNo: item.mobileNo,
//     age: item.age,
//     gender: item.gender,
//     height: item.height,
//     weight: item.weight,
//     bp: item.bp,
//     sugar: item.sugar,
//     packageName: item.packageName || "",
//     pft: item.pft ? "Yes" : item.pft === false ? "No" : "",
//     pftUrl: item.pftUrl,
//     pftUrlFileName:
//       item.pftUrl && typeof item.pftUrl === "string"
//         ? item?.pftUrl?.split("/").pop()
//         : "",
//     pftStatus: item?.pftStatus,
//     pftToggle: item.pftToggle ? "Yes" : item.pftToggle === false ? "No" : "",
//     audiometry: item.audiometry ? "Yes" : item.audiometry === false ? "No" : "",
//     audiometryUrl: item.audiometryUrl,
//     audiometryUrlFileName:
//       item.audiometryUrl && typeof item.audiometryUrl === "string"
//         ? item?.audiometryUrl?.split("/").pop()
//         : "",
//     audiometryStatus: item?.audiometryStatus,
//     audiometryToggle: item.audiometryToggle
//       ? "Yes"
//       : item.audiometryToggle === false
//       ? "No"
//       : "",
//     bloodTest: item.bloodTest ? "Yes" : item.bloodTest === false ? "No" : "",
//     bloodTestUrl: item.bloodTestUrl,
//     bloodTestUrlFileName:
//       item.bloodTestUrl && typeof item.bloodTestUrl === "string"
//         ? item?.bloodTestUrl?.split("/").pop()
//         : "",
//     bloodStatus: item?.bloodStatus,
//     bloodToggle: item.bloodToggle
//       ? "Yes"
//       : item.bloodToggle === false
//       ? "No"
//       : "",
//     eyeTest: item.eyeTest ? "Yes" : item.eyeTest === false ? "No" : "",
//     eyeTestUrl: item.eyeTestUrl,
//     eyeTestUrlFileName:
//       item.eyeTestUrl && typeof item.eyeTestUrl === "string"
//         ? item?.eyeTestUrl?.split("/").pop()
//         : "",
//     visionRemark: item.visionRemark,
//     xray: item.xray ? "Yes" : item.xray === false ? "No" : "",
//     xrayUrl: item.xrayUrl,
//     xrayUrlFileName:
//       item.xrayUrl && typeof item.xrayUrl === "string"
//         ? item?.xrayUrl?.split("/").pop()
//         : "",
//     xrayFilm: item.xrayFilm ? "Yes" : item.xrayFilm === false ? "No" : "",
//     xrayFilmUrl: item.xrayFilmUrl,
//     xrayFilmUrlFileName:
//       item.xrayFilmUrl && typeof item.xrayFilmUrl === "string"
//         ? item?.xrayFilmUrl?.split("/").pop()
//         : "",
//     xrayToggle: item.xrayToggle ? "Yes" : item.xrayToggle === false ? "No" : "",
//     ecg: item.ecg ? "Yes" : item.ecg === false ? "No" : "",
//     ecgUrl: item.ecgUrl,
//     ecgUrlFileName:
//       item.ecgUrl && typeof item.ecgUrl === "string"
//         ? item?.ecgUrl?.split("/").pop()
//         : "",
//     ecgStatus: item?.ecgStatus,
//     ecgToggle: item.ecgToggle ? "Yes" : item.ecgToggle === false ? "No" : "",
//     sonography: item.sonography ? "Yes" : item.sonography === false ? "No" : "",
//     sonographyUrl: item.sonographyUrl,
//     sonographyUrlFileName:
//       item.sonographyUrl && typeof item.sonographyUrl === "string"
//         ? item?.sonographyUrl?.split("/").pop()
//         : "",
//     urintTestDone: item.urintTestDone
//       ? "Yes"
//       : item.urintTestDone === false
//       ? "No"
//       : "",
//     urineToggle: item.urineToggle
//       ? "Yes"
//       : item.urineToggle === false
//       ? "No"
//       : "",
//     form32: item.form32 ? "Yes" : item.form32 === false ? "No" : "",
//     form32Url: item.form32Url,
//     fitnessCertificate: item.fitnessCertificate
//       ? "Yes"
//       : item.fitnessCertificate === false
//       ? "No"
//       : "",
//     fitnessCertificateUrl: item.fitnessCertificateUrl,
//     form35: item.form35 ? "Yes" : item.form35 === false ? "No" : "",
//     form35Url: item.form35Url,
//     physicalFitnessForm: item.physicalFitnessForm
//       ? "Yes"
//       : item.physicalFitnessForm === false
//       ? "No"
//       : "",
//     physicalFitnessFormUrl: item.physicalFitnessFormUrl,
//     vaccinationCertificate: item.vaccinationCertificate
//       ? "Yes"
//       : item.vaccinationCertificate === false
//       ? "No"
//       : "",
//     vaccinationCertificateUrl: item.vaccinationCertificateUrl,
//     medicalFitnessFood: item.medicalFitnessFood
//       ? "Yes"
//       : item.medicalFitnessFood === false
//       ? "No"
//       : "",
//     medicalFitnessFoodUrl: item.medicalFitnessFoodUrl,
//     firstAid:
//       item.firstAidUrl &&
//       (item.firstAidUrl !== "" ||
//         item.firstAidUrl !== null ||
//         item.firstAidUrl !== undefined)
//         ? "Yes"
//         : "",
//     firstAidUrl: item.firstAidUrl ? item.firstAidUrl : null,
//     firstAidUrlFileName:
//       item.firstAidUrl !== "" ||
//       item.firstAidUrl !== null ||
//       item.firstAidUrl !== undefined
//         ? item.firstAidUrl && typeof item.firstAidUrl === "string"
//           ? item?.firstAidUrl?.split("/").pop()
//           : ""
//         : "",
//     hwbsAllAbsent: item.hwbsAllAbsent
//       ? "Yes"
//       : item.hwbsAllAbsent === false
//       ? "No"
//       : "",
//     hwbsAllPresent: item.hwbsAllPresent
//       ? "Yes"
//       : item.hwbsAllPresent === false
//       ? "No"
//       : "",
//     hwbsAnyPresent: item.hwbsAnyPresent
//       ? "Yes"
//       : item.hwbsAnyPresent === false
//       ? "No"
//       : "",
//     vitalsPresent: item.vitalsPresent
//       ? "Yes"
//       : item.vitalsPresent === false
//       ? "No"
//       : "",
//     vitalsCreatedDate: item.vitalsCreatedDate,
//     empCreatedDate: item.empCreatedDate,
//   }));
// };

export const fetchSuperMasterData = async (
  corpId,
  setIsLoading,
  setMasterData
) => {
  const campCycleId =
    localStorage.getItem("CAMP_ID_CORP_EXECUTION") === "null"
      ? null
      : localStorage.getItem("CAMP_ID_CORP_EXECUTION");
  const url =
    BASE_URL +
    `org/superMasterData?corpId=${corpId}&campCycleId=${campCycleId || ""}`;
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);
    console.log({ SUCCESS: response.data });
    setMasterData(response.data);
  } else {
    console.log({ ERROR: response.error });
    setIsLoading(false);
    console.log({ ERROR: response.error });
    setMasterData([]);
  }
};

export const getDataSheetReports = async (corpId, fields) => {
  const campCycleId =
    localStorage.getItem("CAMP_ID_CORP_EXECUTION") === "null"
      ? null
      : localStorage.getItem("CAMP_ID_CORP_EXECUTION");
  const url =
    BASE_URL +
    `org/superMasterData?corpId=${corpId}&campCycleId=${campCycleId || ""}`;
  const response = await getData(url);
  if (response.data) {
    console.log({ SUCCESS: response.data });
    const filteredData = response.data.map((item) => {
      const filteredItem = {};
      fields.forEach((field) => {
        filteredItem[field] = item[field];
      });
      return filteredItem;
    });
    downloadCsv(filteredData, `Data.csv`);
  } else {
    console.log({ ERROR: response.error });
  }
};

export const fetchForm21Data = async (corpId, setIsLoading, setForm21Data) => {
  setIsLoading(true);
  const url = BASE_URL + `org/form21?corpId=${corpId}`;
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);
    const temp = response?.data?.map((item, index) => ({
      sno: index + 1,
      ...item,
    }));
    setForm21Data(temp);
  } else {
    setIsLoading(false);
    setForm21Data([]);
  }
};
