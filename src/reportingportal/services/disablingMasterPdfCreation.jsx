export const useDisableMasterPdfCreation = (
  // originalEmployeeList = [],
  allSelectedEmployees = [],
  selectedReport = [],
  openDialog,
  excludeEmpIdArray = []
) => {
  // Clear reasons and disabledEmployees when openDialog is false
  console.log({
    // originalEmployeeList
    allSelectedEmployees,
    selectedReport,
    openDialog,
    excludeEmpIdArray,
  });

  if (!openDialog) {
    return {
      isDisabled: false,
      reasons: [],
      disabledEmployees: [],
    };
  }

  const vitalsErrorEmployees = [];
  const bloodErrorEmployees = [];
  const audiometryErrorEmployees = [];
  const pftErrorEmployees = [];

  // originalEmployeeList
  //   ?.filter((item) => item.vitalsCreatedDate)
  allSelectedEmployees.forEach((item) => {
    if (excludeEmpIdArray.includes(item.empId?.toUpperCase().trim())) {
      return;
    }

    if (item.isVitalsErrorData === true) {
      vitalsErrorEmployees.push(item);
    }

    // if (
    //   selectedReport.includes("BLOODTEST") &&
    //   item.bloodToggle === true
    // ||
    // (selectedReport.includes("AUDIOMETRY") &&
    //   item.audometryToggle === true) ||
    // (selectedReport.includes("PFT") && item.pftToggle === true)
    // ) {
    if (
      selectedReport.includes("BLOODTEST") &&
      item.isBloodParsed === false
      // &&
      // item.bloodTestUrl === "Yes"
    ) {
      bloodErrorEmployees.push(item);
    }
    // if (
    //   selectedReport.includes("AUDIOMETRY") &&
    //   item.isAudiometryParsed !== true &&
    //   item.audiometryUrl === "Yes"
    // ) {
    //   audiometryErrorEmployees.push(item);
    // }
    // if (
    //   selectedReport.includes("PFT") &&
    //   item.isPftParsed !== true &&
    //   item.pftUrl === "Yes"
    // ) {
    //   pftErrorEmployees.push(item);
    // }
    // }
  });

  const reasons = [];
  const disabledEmployees = [
    ...vitalsErrorEmployees,
    ...bloodErrorEmployees,
    // ...audiometryErrorEmployees,
    // ...pftErrorEmployees,
  ];

  if (vitalsErrorEmployees.length > 0) {
    const empDetails = vitalsErrorEmployees
      .map((emp) => `${emp.empId}`)
      .join(",");
    reasons.push(`Employees with vitals data errors: ${empDetails}`);
  }
  if (bloodErrorEmployees.length > 0) {
    const empDetails = bloodErrorEmployees
      .map((emp) => `${emp.empId}`)
      .join(",");
    reasons.push(
      `Employees with Blood Test Url Present But Blood not parsed : ${empDetails}`
    );
  }
  if (audiometryErrorEmployees.length > 0) {
    const empDetails = audiometryErrorEmployees
      .map((emp) => `${emp.empId}`)
      .join(",");
    reasons.push(
      `Employees with AUDIOMETRY Url Present But AUDIOMETRY not parsed: ${empDetails}`
    );
  }
  if (pftErrorEmployees.length > 0) {
    const empDetails = pftErrorEmployees.map((emp) => `${emp.empId}`).join(",");
    reasons.push(
      `Employees with PFT Url Present But PFT not parsed: ${empDetails}`
    );
  }

  const excludedEmpNotInSelected = excludeEmpIdArray.filter(
    (empId) =>
      !allSelectedEmployees.some(
        (emp) =>
          emp.empId?.toUpperCase()?.trim() === empId?.toUpperCase()?.trim()
      )
  );

  if (excludedEmpNotInSelected.length > 0) {
    const empDetails = excludedEmpNotInSelected.join(",");
    reasons.push(`Excluded Employees not in selected list: ${empDetails}`);
  }

  const isDisabled =
    // originalEmployeeList.length === 0 ||
    allSelectedEmployees.length === 0 ||
    selectedReport.length === 0 ||
    disabledEmployees.length > 0;

  console.log({
    isDisabled,
    reasons,
    disabledEmployees,
  });

  return {
    isDisabled,
    reasons,
    disabledEmployees,
  };
};
