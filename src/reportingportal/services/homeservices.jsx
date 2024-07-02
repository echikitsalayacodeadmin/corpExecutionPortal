import { BASE_URL } from "../../assets/constants";
import { getData } from "../assets/reportingServices";

const modifyArray = (arr) => {
  return arr.map((item, index) => ({
    reportingSno: item.reportingSno || "",
    empId: item.empId,
    tokenNumber: item.tokenNumber ? parseInt(item?.tokenNumber) : "",
    name: item.name,
    employmentType: item.employmentType,
    designation: item.designation,
    department: item.department,
    mobileNo: item.mobileNo,
    age: item.age,
    gender: item.gender,
    height: item.height,
    weight: item.weight,
    bp: item.bp,
    sugar: item.sugar,
    pft: item.pft ? "Yes" : item.pft === false ? "No" : "",
    pftUrl: item.pftUrl,
    pftUrlFileName:
      item.pftUrl && typeof item.pftUrl === "string"
        ? item?.pftUrl?.split("/").pop()
        : "",
    pftStatus: item?.pftStatus,
    pftToggle: item.pftToggle ? "Yes" : item.pftToggle === false ? "No" : "",
    audiometry: item.audiometry ? "Yes" : item.audiometry === false ? "No" : "",
    audiometryUrl: item.audiometryUrl,
    audiometryUrlFileName:
      item.audiometryUrl && typeof item.audiometryUrl === "string"
        ? item?.audiometryUrl?.split("/").pop()
        : "",
    audiometryStatus: item?.audiometryStatus,
    audiometryToggle: item.audiometryToggle
      ? "Yes"
      : item.audiometryToggle === false
      ? "No"
      : "",
    bloodTest: item.bloodTest ? "Yes" : item.bloodTest === false ? "No" : "",
    bloodTestUrl: item.bloodTestUrl,
    bloodTestUrlFileName:
      item.bloodTestUrl && typeof item.bloodTestUrl === "string"
        ? item?.bloodTestUrl?.split("/").pop()
        : "",
    bloodStatus: item?.bloodStatus,
    bloodToggle: item.bloodToggle
      ? "Yes"
      : item.bloodToggle === false
      ? "No"
      : "",

    stool:
      item.stoolUrl &&
      (item.stoolUrl !== "" ||
        item.stoolUrl !== null ||
        item.stoolUrl !== undefined)
        ? "Yes"
        : "",
    stoolSampleCollected: item.stoolSampleCollected
      ? "Yes"
      : item.stoolSampleCollected === false
      ? "No"
      : "",
    stoolUrl: item.stoolUrl || null,
    stoolUrlFileName:
      item.stoolUrl !== "" ||
      item.stoolUrl !== null ||
      item.stoolUrl !== undefined
        ? item.stoolUrl && typeof item.stoolUrl === "string"
          ? item?.stoolUrl?.split("/").pop()
          : ""
        : "",
    eyeTest: item.eyeTest ? "Yes" : item.eyeTest === false ? "No" : "",
    eyeTestUrl: item.eyeTestUrl,
    eyeTestUrlFileName:
      item.eyeTestUrl && typeof item.eyeTestUrl === "string"
        ? item?.eyeTestUrl?.split("/").pop()
        : "",
    eyeTestToggle: item.eyeTestToggle
      ? "Yes"
      : item.eyeTestToggle === false
      ? "No"
      : "",
    visionRemark: item.visionRemark,
    xray: item.xray ? "Yes" : item.xray === false ? "No" : "",
    xrayUrl: item.xrayUrl,
    xrayUrlFileName:
      item.xrayUrl && typeof item.xrayUrl === "string"
        ? item?.xrayUrl?.split("/").pop()
        : "",
    xrayFilm: item.xrayFilm ? "Yes" : item.xrayFilm === false ? "No" : "",
    xrayFilmUrl: item.xrayFilmUrl,
    xrayFilmUrlFileName:
      item.xrayFilmUrl && typeof item.xrayFilmUrl === "string"
        ? item?.xrayFilmUrl?.split("/").pop()
        : "",
    xrayToggle: item.xrayToggle ? "Yes" : item.xrayToggle === false ? "No" : "",
    ecg: item.ecg ? "Yes" : item.ecg === false ? "No" : "",
    ecgUrl: item.ecgUrl,
    ecgUrlFileName:
      item.ecgUrl && typeof item.ecgUrl === "string"
        ? item?.ecgUrl?.split("/").pop()
        : "",
    ecgStatus: item?.ecgStatus,
    ecgToggle: item.ecgToggle ? "Yes" : item.ecgToggle === false ? "No" : "",
    sonography: item.sonography ? "Yes" : item.sonography === false ? "No" : "",
    sonographyUrl: item.sonographyUrl,
    sonographyUrlFileName:
      item.sonographyUrl && typeof item.sonographyUrl === "string"
        ? item?.sonographyUrl?.split("/").pop()
        : "",
    urintTestDone: item.urintTestDone
      ? "Yes"
      : item.urintTestDone === false
      ? "No"
      : "",
    urineToggle: item.urineToggle
      ? "Yes"
      : item.urineToggle === false
      ? "No"
      : "",
    form32: item.form32 ? "Yes" : item.form32 === false ? "No" : "",
    form32Url: item.form32Url,
    fitnessCertificate: item.fitnessCertificate
      ? "Yes"
      : item.fitnessCertificate === false
      ? "No"
      : "",
    fitnessCertificateUrl: item.fitnessCertificateUrl,
    form35: item.form35 ? "Yes" : item.form35 === false ? "No" : "",
    form35Url: item.form35Url,
    physicalFitnessForm: item.physicalFitnessForm
      ? "Yes"
      : item.physicalFitnessForm === false
      ? "No"
      : "",
    physicalFitnessFormUrl: item.physicalFitnessFormUrl,
    vaccinationCertificate: item.vaccinationCertificate
      ? "Yes"
      : item.vaccinationCertificate === false
      ? "No"
      : "",
    vaccinationCertificateUrl: item.vaccinationCertificateUrl,
    medicalFitnessFood: item.medicalFitnessFood
      ? "Yes"
      : item.medicalFitnessFood === false
      ? "No"
      : "",
    medicalFitnessFoodUrl: item.medicalFitnessFoodUrl,
    firstAid:
      item.firstAidUrl &&
      (item.firstAidUrl !== "" ||
        item.firstAidUrl !== null ||
        item.firstAidUrl !== undefined)
        ? "Yes"
        : "",
    firstAidUrl: item.firstAidUrl ? item.firstAidUrl : null,
    firstAidUrlFileName:
      item.firstAidUrl !== "" ||
      item.firstAidUrl !== null ||
      item.firstAidUrl !== undefined
        ? item.firstAidUrl && typeof item.firstAidUrl === "string"
          ? item?.firstAidUrl?.split("/").pop()
          : ""
        : "",
    hwbsAllAbsent: item.hwbsAllAbsent
      ? "Yes"
      : item.hwbsAllAbsent === false
      ? "No"
      : "",
    hwbsAllPresent: item.hwbsAllPresent
      ? "Yes"
      : item.hwbsAllPresent === false
      ? "No"
      : "",
    hwbsAnyPresent: item.hwbsAnyPresent
      ? "Yes"
      : item.hwbsAnyPresent === false
      ? "No"
      : "",
    vitalsPresent: item.vitalsPresent
      ? "Yes"
      : item.vitalsPresent === false
      ? "No"
      : "",
    vitalsCreatedDate: item.vitalsCreatedDate,
    empCreatedDate: item.empCreatedDate,
    tmt:
      item.tmtUrl &&
      (item.tmtUrl !== "" || item.tmtUrl !== null || item.tmtUrl !== undefined)
        ? "Yes"
        : "",
    tmtUrl: item.tmtUrl || null,
    tmtUrlFileName:
      item.tmtUrl !== "" || item.tmtUrl !== null || item.tmtUrl !== undefined
        ? item.tmtUrl && typeof item.tmtUrl === "string"
          ? item?.tmtUrl?.split("/").pop()
          : ""
        : "",
    consolidatedReport:
      item.consolidatedRUrl &&
      (item.consolidatedRUrl !== "" ||
        item.consolidatedRUrl !== null ||
        item.consolidatedRUrl !== undefined)
        ? "Yes"
        : "",
    consolidatedRUrl: item.consolidatedRUrl || null,
    consolidatedRUrlFileName:
      item.consolidatedRUrl !== "" ||
      item.consolidatedRUrl !== null ||
      item.consolidatedRUrl !== undefined
        ? item.consolidatedRUrl && typeof item.consolidatedRUrl === "string"
          ? item?.consolidatedRUrl?.split("/").pop()
          : ""
        : "",
    annexure:
      item.annexureUrl &&
      (item.annexureUrl !== "" ||
        item.annexureUrl !== null ||
        item.annexureUrl !== undefined)
        ? "Yes"
        : "",
    annexureUrl: item.annexureUrl || null,
    annexureUrlFileName:
      item.annexureUrl !== "" ||
      item.annexureUrl !== null ||
      item.annexureUrl !== undefined
        ? item.annexureUrl && typeof item.annexureUrl === "string"
          ? item?.annexureUrl?.split("/").pop()
          : ""
        : "",
    packageName: item.packageName || "",
    missingTests: item.missingTests || null,
    pathPackageDetails: item.pathPackageDetails || null,
    testPresentDetails: item.testPresentDetails?.["PATH"] || {},
    vitalsErrorData: JSON.stringify(item?.vitalsErrorData) || {},
    isVitalsErrorData:
      item?.vitalsErrorData && Object.keys(item.vitalsErrorData).length > 0
        ? true
        : false,
    isBloodParsed: item?.cholestrolData?.["BLOODTEST_parsed"]
      ? true
      : item.bloodTestUrl && !item?.cholestrolData?.["BLOODTEST_parsed"]
      ? false
      : null,
    patientNameinBloodReport:
      item?.cholestrolData?.["BLOOD_PATIENT_NAME_REPORT"] || null,
    isPftParsed: item?.cholestrolData?.PFT_parsed || null,
    patientNameinPftReport:
      item?.cholestrolData?.["PFT_PATIENT_NAME_REPORT"] || null,
    isAudiometryParsed: item?.cholestrolData?.AUDIOMETRY_parsed || null,
    patientNameinAudiometryReport:
      item?.cholestrolData?.["AUDIOMETRY_PATIENT_NAME_REPORT"] || null,
  }));
};

export const fetchSuperMasterData = async (
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

    setMasterData(modifyArray(response.data));
    updateEmployeeList(
      modifyArray(
        response.data.filter(
          (employee, index, self) =>
            employee.empId !== null &&
            employee.empId !== "" &&
            self.findIndex((e) => e?.empId === employee?.empId) === index
        )
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
