export const useDisableMasterPdfCreation = (
  allSelectedEmployees = [],
  selectedReport = [],
  openDialog
) => {
  // Clear reasons and disabledEmployees when openDialog is false
  console.log({ allSelectedEmployees, selectedReport, openDialog });

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

  allSelectedEmployees.forEach((item) => {
    if (item.isVitalsErrorData === true) {
      vitalsErrorEmployees.push(item);
    }
    if (selectedReport.includes("BLOODTEST") && item.isBloodParsed !== true) {
      bloodErrorEmployees.push(item);
    }
    if (
      selectedReport.includes("AUDIOMETRY") &&
      item.isAudiometryParsed !== true
    ) {
      audiometryErrorEmployees.push(item);
    }
    if (
      selectedReport.includes("PFT") &&
      (item.isPftParsed !== true || item.isPftParsed === null)
    ) {
      pftErrorEmployees.push(item);
    }
  });

  const reasons = [];
  const disabledEmployees = [
    ...vitalsErrorEmployees,
    ...bloodErrorEmployees,
    ...audiometryErrorEmployees,
    ...pftErrorEmployees,
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
    reasons.push(`Employees without blood not parsed: ${empDetails}`);
  }
  if (audiometryErrorEmployees.length > 0) {
    const empDetails = audiometryErrorEmployees
      .map((emp) => `${emp.empId}`)
      .join(",");
    reasons.push(`Employees without audiometry not parsed: ${empDetails}`);
  }
  if (pftErrorEmployees.length > 0) {
    const empDetails = pftErrorEmployees.map((emp) => `${emp.empId}`).join(",");
    reasons.push(`Employees without PFT not parsed: ${empDetails}`);
  }

  const isDisabled =
    allSelectedEmployees.length === 0 ||
    selectedReport.length === 0 ||
    disabledEmployees.length > 0;

  return {
    isDisabled,
    reasons,
    disabledEmployees,
  };
};
