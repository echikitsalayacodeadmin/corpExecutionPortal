export const logoutUser = (navigate) => {
  localStorage.removeItem("AUTHHEADER_ORG_ANALYSIS");
  localStorage.removeItem("CORP_NAME_ORG_ANALYSIS");
  localStorage.removeItem("CORP_ID_ORG_ANALYSIS");
  navigate("/org-analysis/login");
};
