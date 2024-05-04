import { Box, Typography } from "@mui/material";
import React from "react";

const Address = ({ data }) => {
  const styles = {
    addressBox: {
      maxWidth: "100%",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      border: "1.5px solid #000",
      height: "90px",
    },
  };
  return (
    <Box sx={styles.addressBox}>
      <Box
        sx={{
          borderRight: "1.5px solid #000",
          paddingInline: "5px",
          width: "50%",
          padding: "10px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
          Quotation by:
        </Typography>
        <Typography sx={{ fontSize: "15px" }}>
          Uno care (Mysticdoc Healthcare Pvt Ltd) Regd. Office: 253, Shri
          Krishna Avenue, Phase-1, Limbodi Khandwa Road, Indore-452001
        </Typography>
      </Box>
      <Box sx={{ paddingInline: "5px", width: "50%", padding: "10px" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
          Quotation For:
        </Typography>
        <Typography sx={{ fontSize: "15px" }}>
          {data?.corpName} {data?.corpAddress}
        </Typography>
      </Box>
    </Box>
  );
};

export default Address;
