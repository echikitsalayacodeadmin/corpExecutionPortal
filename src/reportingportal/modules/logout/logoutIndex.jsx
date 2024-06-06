import { Box, Button, Typography } from "@mui/material";
import { logoutUser } from "../../services/logoutservices";
import { useNavigate } from "react-router-dom";

const LogoutIndex = () => {
  let navigate = useNavigate();

  return (
    <Box>
      <Button onClick={() => logoutUser(navigate)}>Logout</Button>
    </Box>
  );
};

export default LogoutIndex;
