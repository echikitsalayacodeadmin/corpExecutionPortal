export const logoutUser = (navigate) => {
  localStorage.clear();
  console.log("Logout");
  navigate("/");
};
