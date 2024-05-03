import { Button, Typography } from "@mui/material";
import React from "react";

const CustomButtonBlue = ({
  onClick,
  title,
  disabled,
  styles,
  fullWidth,
  startIcon,
  endIcon,
}) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      size="small"
      fullWidth={fullWidth}
      sx={{ padding: "10px", borderRadius: "15px", ...styles }}
    >
      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: "600",
          color: "#FFF",
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};

export default CustomButtonBlue;
