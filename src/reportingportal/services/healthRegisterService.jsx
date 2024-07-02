import { BASE_URL } from "../../assets/constants";
import { filterUniqueEmployeesByEmpId } from "../../assets/utils";
import { getData } from "../assets/reportingServices";

// const modifyArray = (arr) => {
//   return arr.map((item, index) => ({
//     id: item.id,
//     name: item.name,
//     fathersName: item.fathersName,
//     empId: item.empId,
//     imageUrl: item.imageUrl,
//     department: item.department,
//     mobile: item.mobile,
//     dateOfBirth: item.dateOfBirth,
//     gender: item.gender,
//     genderTypeString: item.genderTypeString,
//     orgId: item.orgId,
//     age: item.age,
//     designation: item.designation,
//     city: item.city,
//     plant: item.plant,
//     corpId: item.corpId,
//     bloodGroup: item.bloodGroup,
//     employmentType: item.employmentType,
//     employmentTypeString: item.employmentTypeString,
//     preEmploymentStatus: item.preEmploymentStatus,
//     dateOfJoining: item.dateOfJoining,
//     dateOfJoiningTypeString: item.dateOfJoiningTypeString,
//     tokenNumber: item.tokenNumber,
//     packageName: item.packageName,
//     bp: item.bp,
//     sugar: item.sugar,
//     height: item.height,
//     weight: item.weight,
//     bmi: item.bmi,
//     glass: item.glass,
//     cataract: item.cataract,
//     hearing: item.hearing,
//     eyeTestUrl: item.eyeTestUrl,
//     xrayUrl: item.xrayUrl,
//     audiometryUrl: item.audiometryUrl,
//     bloodTestUrl: item.bloodTestUrl,
//     prescriptionUrl: item.prescriptionUrl,
//     miscellaneousUrl: item.miscellaneousUrl,
//     date: item.date,
//     status: item.status,
//     smoking: item.smoking,
//     alchohol: item.alchohol,
//     panChewing: item.panChewing,
//     gambling: item.gambling,
//     drugAddiction: item.drugAddiction,
//     bodyBuilt: item.bodyBuilt,
//     nails: item.nails,
//     hairs: item.hairs,
//     doctorsRemark: item.doctorsRemark,
//     eyeOperation: item.eyeOperation,
//     urineTestUrl: item.urineTestUrl,
//     bloodSampleCollected: item.bloodSampleCollected,
//     urineSampleCollected: item.urineSampleCollected,
//     audiometryDone: item.audiometryDone,
//     pft: item.pft,
//     pftUrl: item.pftUrl,
//     cbcUrl: item.cbcUrl,
//     fitnessCertificateUrl: item.fitnessCertificateUrl,
//     serumBilirubinUrl: item.serumBilirubinUrl,
//     stoolUrl: item.stoolUrl,
//     consolidatedReportUrl: item.consolidatedReportUrl,
//     vaccinationCertificateUrl: item.vaccinationCertificateUrl,
//     consolidatedReportUpload: item.consolidatedReportUpload,
//     display: item.display,
//     corpName: item.corpName,
//     stoolSampleCollected: item.stoolSampleCollected,
//     eyeTest: item.eyeTest,
//     fitToWork: item.fitToWork,
//     ecg: item.ecg,
//     ecgUrl: item.ecgUrl,
//     orgVitalsVm: item.orgVitalsVm,
//     summaryTestUrl: item.summaryTestUrl,
//     xrayFilmUrl: item.xrayFilmUrl,
//     eyeSightOk: item.eyeSightOk,
//     nearSighted: item.nearSighted,
//     farSighted: item.farSighted,
//     form32Url: item.form32Url,
//     form35Url: item.form35Url,
//     caseOnRollData: item.caseOnRollData,
//     dateOfPreviousAhc: item.dateOfPreviousAhc,
//     isAhcRequired: item.isAhcRequired,
//     nearLeftEyeSight: item.nearLeftEyeSight,
//     nearRightEyeSight: item.nearRightEyeSight,
//     farLeftEyeSight: item.farLeftEyeSight,
//     farRightEyeSight: item.farRightEyeSight,
//     vaccination: item.vaccination,
//     eyeSightWithGlasses: item.eyeSightWithGlasses,
//     sonographyUrl: item.sonographyUrl,
//     cholestrolData: item.cholestrolData,
//     urineProblemList: item.urineProblemList,
//     healthStatus: item.healthStatus,
//     xrayDone: item.xrayDone,
//     hbsAgPFSampleCollected: item.hbsAgPFSampleCollected,
//     hbsAgPFTestUrl: item.hbsAgPFTestUrl,
//   }));
// };

export const fetchHealthRegisterData = async (
  corpId,
  setIsLoading,
  setMasterData
) => {
  const campCycleId =
    localStorage.getItem("CAMP_ID_REPORTING") === "null"
      ? null
      : localStorage.getItem("CAMP_ID_REPORTING");
  const url =
    BASE_URL + `mis/corp?corpId=${corpId}&campCycleId=${campCycleId || ""}`;
  const response = await getData(url);
  if (response.data) {
    setIsLoading(false);

    const temp = response?.data?.map((item, index) => ({
      id: index + 1,
      ...item,
    }));
    setMasterData(temp);
  } else {
    console.log({ ERROR: response.error });
    setIsLoading(false);
    console.log({ ERROR: response.error });
    setMasterData([]);
  }
};
