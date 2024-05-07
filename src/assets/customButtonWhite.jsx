import { Button, Typography } from "@mui/material";
import React from "react";

const CustomButtonWhite = ({
  onClick,
  title,
  disabled,
  styles,
  fullWidth,
  textColor,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant="outlined"
      size="small"
      fullWidth={fullWidth}
      sx={{ padding: "10px", borderRadius: "15px", ...styles }}
    >
      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: "600",
          color: textColor || "#127DDD",
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};

export default CustomButtonWhite;
