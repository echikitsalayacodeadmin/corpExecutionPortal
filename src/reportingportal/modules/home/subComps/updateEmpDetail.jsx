// import {
//   Box,
//   Grid,
//   IconButton,
//   Modal,
//   Portal,
//   TextField,
//   Typography,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import React, { Fragment } from "react";
// import CustomButtonBlue from "../../../../assets/customButtonBlue";
// import PropTypes from "prop-types";
// import { IMaskInput } from "react-imask";
// import { BASE_URL } from "../../../../assets/constants";
// import { updateData } from "../../../assets/reportingServices";
// import { useSnackbar } from "notistack";

// const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
//   const { onChange, ...other } = props;
//   return (
//     <IMaskInput
//       {...other}
//       mask="000/000"
//       definitions={{
//         "#": /[1-9]/,
//       }}
//       inputRef={ref}
//       onAccept={(value) => onChange({ target: { name: props?.name, value } })}
//       overwrite
//     />
//   );
// });

// TextMaskCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// const UpdateEmpDetail = ({
//   openEmpForm,
//   setOpenEmpForm,
//   empFormData,
//   setEmpFormData,
//   corpId = localStorage.getItem("CORP_ID_REPORTING"),
// }) => {
//   const { enqueueSnackbar } = useSnackbar();

//   const handleSubmit = async () => {
//     const obj = {
//       name: empFormData.name,
//       age: empFormData.age || null,
//       mobile: empFormData.mobileNo || null,
//       tokenNumber: empFormData.tokenNumber || null,
//       bp: empFormData.bp || null,
//       height: empFormData.height || null,
//       weight: empFormData.weight || null,
//     };
//     const url =
//       BASE_URL + `org/emp/details/update/${empFormData.empId}?corpId=${corpId}`;
//     const result = await updateData(url, obj);
//     if (result?.data) {
//       enqueueSnackbar("Successfully Saved!", {
//         variant: "success",
//       });
//       setOpenEmpForm(false);
//     } else {
//       enqueueSnackbar("An error occured.", {
//         variant: "error",
//       });
//     }
//   };

//   return (
//     <Fragment>
//       <Portal>
//         <Modal
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           open={openEmpForm}
//           onClose={() => {
//             setOpenEmpForm(false);
//           }}
//           sx={{
//             "& .MuiBackdrop-root": {
//               backgroundColor: "rgba(187, 187, 187, 0.1)",
//             },
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: "#fff",
//               boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
//               borderRadius: "5px",
//               padding: "15px",
//               width: "90vh",
//             }}
//           >
//             <Box display="flex" justifyContent="flex-end">
//               <IconButton
//                 onClick={() => {
//                   setOpenEmpForm(false);
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </Box>

//             <Typography
//               gutterBottom
//               sx={{
//                 textAlign: "center",
//                 fontWeight: "600",
//                 fontSize: "13px",
//                 lineHeight: "15px",
//                 color: "#000000",
//                 marginTop: "-25px",
//                 marginBottom: "10px",
//               }}
//             >
//               Confirm!
//             </Typography>

//             <Grid container spacing={1}>
//               <Grid item xs={6} lg={6}>
//                 <TextField
//                   size="small"
//                   fullWidth
//                   label="Name"
//                   placeholder="Enter name"
//                   value={empFormData.name || ""}
//                   onChange={(e) => {
//                     setEmpFormData({ ...empFormData, name: e.target.value });
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={2.5} lg={3}>
//                 <TextField
//                   size="small"
//                   fullWidth
//                   label="Age"
//                   placeholder="Enter age"
//                   value={empFormData.age || ""}
//                   onChange={(e) => {
//                     if (!isNaN(e.target.value) && e.target.value.length <= 2) {
//                       setEmpFormData({ ...empFormData, age: e.target.value });
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={3.5} lg={3}>
//                 <TextField
//                   size="small"
//                   fullWidth
//                   label="#Token"
//                   placeholder="#Token"
//                   value={empFormData.tokenNumber || ""}
//                   onChange={(e) => {
//                     if (!isNaN(e.target.value)) {
//                       setEmpFormData({
//                         ...empFormData,
//                         tokenNumber: e.target.value,
//                       });
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={6} lg={3}>
//                 <TextField
//                   size="small"
//                   fullWidth
//                   label="Mobile"
//                   placeholder="Enter mobile"
//                   value={empFormData.mobileNo || ""}
//                   onChange={(e) => {
//                     if (
//                       (!isNaN(e.target.value) && e.target.value.length <= 10) ||
//                       e.target.value === ""
//                     ) {
//                       setEmpFormData({
//                         ...empFormData,
//                         mobileNo: e.target.value || "",
//                       });
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={6} lg={3}>
//                 <TextField
//                   size="small"
//                   fullWidth
//                   label="BP(mmhg)"
//                   placeholder="Enter bp"
//                   value={empFormData.bp || ""}
//                   onChange={(e) => {
//                     setEmpFormData({ ...empFormData, bp: e.target.value });
//                   }}
//                   id="formatted-numberformat-input"
//                   InputProps={{
//                     inputComponent: TextMaskCustom,
//                   }}
//                   error={
//                     empFormData.bp
//                       ? !/^\d{1,3}\/\d{1,3}$/.test(empFormData.bp)
//                       : false
//                   }
//                   helperText={
//                     empFormData.bp
//                       ? /^\d{1,3}\/\d{1,3}$/.test(empFormData.bp)
//                         ? ""
//                         : "Enter valid Values!"
//                       : ""
//                   }
//                 />
//               </Grid>
//               <Grid item xs={6} lg={3}>
//                 <TextField
//                   size="small"
//                   fullWidth
//                   label="Height(cm)"
//                   placeholder="Enter height"
//                   value={empFormData.height || ""}
//                   onChange={(e) => {
//                     if (!isNaN(e.target.value)) {
//                       setEmpFormData({
//                         ...empFormData,
//                         height: e.target.value,
//                       });
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={6} lg={3}>
//                 <TextField
//                   size="small"
//                   fullWidth
//                   label="Weight(kg)"
//                   placeholder="Enter weight"
//                   value={empFormData.weight || ""}
//                   onChange={(e) => {
//                     if (!isNaN(e.target.value)) {
//                       setEmpFormData({
//                         ...empFormData,
//                         weight: e.target.value,
//                       });
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid
//                 item
//                 xs={12}
//                 lg={12}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <CustomButtonBlue
//                   onClick={() => handleSubmit()}
//                   title="Update"
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         </Modal>
//       </Portal>
//     </Fragment>
//   );
// };

// export default UpdateEmpDetail;

import {
  Box,
  Grid,
  IconButton,
  Modal,
  Portal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { Fragment, useEffect, useState } from "react";
import CustomButtonBlue from "../../../../assets/customButtonBlue";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import { BASE_URL } from "../../../../assets/constants";
import { updateData } from "../../../assets/reportingServices";
import { useSnackbar } from "notistack";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000/000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props?.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const UpdateEmpDetail = ({
  openEmpForm,
  setOpenEmpForm,
  empFormData,
  setEmpFormData,
  corpId = localStorage.getItem("CORP_ID_REPORTING"),
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    if (openEmpForm) {
      // Make a deep copy of empFormData to initialData
      setInitialData(JSON.parse(JSON.stringify(empFormData)));
    }
  }, [openEmpForm]);

  const handleSubmit = async () => {
    const changedData = {};
    for (let key in empFormData) {
      if (empFormData[key] !== initialData[key]) {
        changedData[key] = empFormData[key];
      }
    }

    console.log("Initial Data:", initialData);
    console.log("Current Data:", empFormData);
    console.log("Changed Data:", changedData);

    if (Object.keys(changedData).length === 0) {
      enqueueSnackbar("No changes detected.", { variant: "info" });
      return;
    }

    const url =
      BASE_URL + `org/emp/details/update/${empFormData.empId}?corpId=${corpId}`;
    const result = await updateData(url, changedData);
    if (result?.data) {
      enqueueSnackbar("Successfully Saved!", {
        variant: "success",
      });
      setOpenEmpForm(false);
    } else {
      enqueueSnackbar("An error occurred.", {
        variant: "error",
      });
    }
  };

  return (
    <Fragment>
      <Portal>
        <Modal
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={openEmpForm}
          onClose={() => {
            setOpenEmpForm(false);
          }}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(187, 187, 187, 0.1)",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              padding: "15px",
              width: "90vh",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                onClick={() => {
                  setOpenEmpForm(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Typography
              gutterBottom
              sx={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "13px",
                lineHeight: "15px",
                color: "#000000",
                marginTop: "-25px",
                marginBottom: "10px",
              }}
            >
              Confirm!
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={6} lg={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Name"
                  placeholder="Enter name"
                  value={empFormData.name || ""}
                  onChange={(e) => {
                    setEmpFormData({ ...empFormData, name: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={2.5} lg={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Age"
                  placeholder="Enter age"
                  value={empFormData.age || ""}
                  onChange={(e) => {
                    if (!isNaN(e.target.value) && e.target.value.length <= 2) {
                      setEmpFormData({ ...empFormData, age: e.target.value });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={3.5} lg={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="#Token"
                  placeholder="#Token"
                  value={empFormData.tokenNumber || ""}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      setEmpFormData({
                        ...empFormData,
                        tokenNumber: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6} lg={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Mobile"
                  placeholder="Enter mobile"
                  value={empFormData.mobileNo || ""}
                  onChange={(e) => {
                    if (
                      (!isNaN(e.target.value) && e.target.value.length <= 10) ||
                      e.target.value === ""
                    ) {
                      setEmpFormData({
                        ...empFormData,
                        mobileNo: e.target.value || "",
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6} lg={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="BP(mmhg)"
                  placeholder="Enter bp"
                  value={empFormData.bp || ""}
                  onChange={(e) => {
                    setEmpFormData({ ...empFormData, bp: e.target.value });
                  }}
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: TextMaskCustom,
                  }}
                  error={
                    empFormData.bp
                      ? !/^\d{1,3}\/\d{1,3}$/.test(empFormData.bp)
                      : false
                  }
                  helperText={
                    empFormData.bp
                      ? /^\d{1,3}\/\d{1,3}$/.test(empFormData.bp)
                        ? ""
                        : "Enter valid Values!"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6} lg={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Height(cm)"
                  placeholder="Enter height"
                  value={empFormData.height || ""}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      setEmpFormData({
                        ...empFormData,
                        height: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6} lg={3}>
                <TextField
                  size="small"
                  fullWidth
                  label="Weight(kg)"
                  placeholder="Enter weight"
                  value={empFormData.weight || ""}
                  onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                      setEmpFormData({
                        ...empFormData,
                        weight: e.target.value,
                      });
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomButtonBlue
                  onClick={() => handleSubmit()}
                  title="Update"
                />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default UpdateEmpDetail;
