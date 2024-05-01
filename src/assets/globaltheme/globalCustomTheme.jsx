import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
const defaultTheme = createTheme();
const GlobalCustomTheme = createTheme({
  palette: {
    primary: {
      main: "#127DDD",
      border: "#777777",
    },
    secondary: {
      main: "#127DDD",
    },
    customLight: defaultTheme.palette.augmentColor({
      color: { main: "#FFFFFF" },
      name: "customLight",
    }),
    customDark: defaultTheme.palette.augmentColor({
      color: { main: "#127DDD" },
      name: "customDark",
    }),
    action: {
      selectedOpacity: 0.75,
    },
  },

  components: {
    ///header global custumization

    MuiButton: {
      styleOverrides: {
        outlined: {
          padding: "12px 26px",
          borderRadius: "10px",
          color: defaultTheme.palette.primary.main,
          fontSize: "14px",
          textTransform: "capitalize",
          fontFamily: "Roboto",
        },
        contained: {
          padding: "8px 26px",
          borderRadius: "10px",
          background: defaultTheme.palette.primary.main,
          color: "#fff",
          fontSize: "14px",
          textTransform: "capitalize",
          fontFamily: "Roboto",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: defaultTheme.palette.primary.border,
          },
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: defaultTheme.palette.primary.border,
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: defaultTheme.palette.primary.border,
            },
          "& .MuiOutlinedInput-input": {
            color: defaultTheme.palette.primary.border,
          },
          "&:hover .MuiOutlinedInput-input": {
            color: defaultTheme.palette.primary.border,
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: defaultTheme.palette.primary.border,
          },
          "& .MuiInputLabel-outlined": {
            color: defaultTheme.palette.primary.border,
            paddingTop: "0px",
          },
          "&:hover .MuiInputLabel-outlined": {
            color: defaultTheme.palette.primary.border,
          },
          "& .MuiInputLabel-outlined.Mui-focused": {
            color: defaultTheme.palette.primary.border,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "35px",
        },
      },
    },
  },

  typography: {
    MuiLink: {
      color: "#000",
    },
  },
});

export default GlobalCustomTheme;
