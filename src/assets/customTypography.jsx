import { Typography } from "@mui/material";

export const CustomTypography = ({ children }) => (
  <Typography
    sx={{
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: { lg: "1rem", xs: "1rem" },
      color: "#000",
    }}
  >
    {children}
  </Typography>
);

export const CustomTypographyBold = ({ children }) => (
  <Typography
    noWrap
    sx={{
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: { lg: "1rem", xs: "1rem" },
      color: "#000",
      textTransform: "capitalize",
    }}
  >
    {children}
  </Typography>
);

export const CustomTypographyBoldAlt = ({ children }) => (
  <Typography
    noWrap
    sx={{
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: 10,
      color: "#000",
    }}
  >
    {children}
  </Typography>
);

export const CustomTypographyHeading = ({ children }) => (
  <Typography
    variant="h6"
    sx={{
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "700",
      color: "#000",
      textTransform: "capitalize",
    }}
  >
    {children}
  </Typography>
);
