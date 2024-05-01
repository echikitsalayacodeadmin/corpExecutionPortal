// import React, { Fragment, useEffect, useState } from "react";
// import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   Grid,
//   Stack,
// } from "@mui/material";
// import { CustomTypographyBold } from "../../../../assets/customTypography";
// import CustomAutocomplete from "../../../../assets/customAutocomplete";
// import MarkStatusBtn from "../subComp/markStatusBtn";
// import { isDesktop } from "react-device-detect";
// import { fetchAllTaskList } from "../../../services/deliveryOrchestratorServices";
// import { updateData } from "../../../assets/corpServices";
// import { useSnackbar } from "notistack";
// import { BASE_URL } from "../../../../assets/constants";
// import { DISPATCH_SEQ } from "../../../assets/corpConstants";
// import { sortBySequence } from "../../../../assets/utils";

// const getActionableType = (itemId) => {
//   return itemId === "boxing" ||
//     itemId === "pasteIndex" ||
//     itemId === "printIndex" ||
//     itemId === "sendMail" ||
//     itemId === "createInvoice" ||
//     itemId === "sendDelivery"
//     ? "status"
//     : itemId === "scan"
//     ? "copy"
//     : "download";
// };

// const RowComp = ({ data, selectedStatus, setSelectedStatus }) => {
//   const isUrl =
//     (data?.url !== null || data?.url !== "") &&
//     typeof data?.url === "string" &&
//     data?.url.match(/^https?:\/\/\S+/);
//   return (
//     <Fragment>
//       <Grid container>
//         <Grid
//           item
//           xs={12}
//           lg={4}
//           sx={{ p: 2, borderRight: isDesktop && "1px solid #000" }}
//         >
//           <CustomTypographyBold>{data.itemName}</CustomTypographyBold>
//         </Grid>

//         <Grid
//           item
//           xs={6}
//           lg={4}
//           sx={{ p: 2, display: "flex", justifyContent: "center" }}
//         >
//           {getActionableType(data.itemId) !== "status" ? (
//             <Button size="small" sx={{ width: "120px" }} variant="contained">
//               {(getActionableType(data.itemId) === "copy" && "Copy Link") ||
//                 (getActionableType(data.itemId) === "download" && "Download")}
//             </Button>
//           ) : null}
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           lg={4}
//           sx={{
//             p: 2,
//             display: "flex",
//             justifyContent: "center",
//             borderLeft: isDesktop && "1px solid #000",
//           }}
//         >
//           <MarkStatusBtn
//             selectedStatus={selectedStatus}
//             setSelectedStatus={setSelectedStatus}
//           />
//         </Grid>
//       </Grid>
//     </Fragment>
//   );
// };

// const DispatchMain = ({ corpId = "2751db43-138d-4be9-8720-30e3b9130548" }) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [dispatchData, setDispachData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     fetchAllTaskList(
//       corpId,
//       setIsLoading,
//       setDispachData,
//       "DISPATCH",
//       DISPATCH_SEQ
//     );
//   }, []);

//   if (isLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Fragment>
//       <MainPageLayoutWithBack title="Dispatch">
//         <Container
//           maxWidth={false}
//           disableGutters
//           sx={{
//             backgroundColor: "#F5F5F5",
//             minHeight: "80vh",
//             borderRadius: 5,
//           }}
//         >
//           <Box sx={{ p: 2 }}>
//             <Grid
//               container
//               sx={{ border: "1px solid #000", borderRadius: "15px" }}
//             >
//               <Grid
//                 item
//                 xs={12}
//                 lg={12}
//                 sx={{ p: 2, borderBottom: "1px solid #000" }}
//               >
//                 <CustomTypographyBold>Dispatch</CustomTypographyBold>
//               </Grid>
//               {dispatchData.map((item, index) => (
//                 <Grid
//                   key={index}
//                   item
//                   xs={12}
//                   lg={12}
//                   sx={{ borderBottom: "1px solid #000" }}
//                 >
//                   <RowComp
//                     data={item}
//                     selectedStatus={statusSelections[item.itemId]}
//                     setSelectedStatus={(newValue) =>
//                       handleStatusChange(item.itemId, newValue)
//                     }
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         </Container>
//       </MainPageLayoutWithBack>
//     </Fragment>
//   );
// };

// export default DispatchMain;

import React, { Fragment, useEffect, useState } from "react";
import MainPageLayoutWithBack from "../../../global/templates/mainPageLayoutWithBack";
import { Box, Button, CircularProgress, Container, Grid } from "@mui/material";
import { CustomTypographyBold } from "../../../../assets/customTypography";
import MarkStatusBtn from "../subComp/markStatusBtn";
import { isDesktop } from "react-device-detect";
import { fetchAllTaskList } from "../../../services/deliveryOrchestratorServices";
import { updateData } from "../../../assets/corpServices";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../../../assets/constants";
import { DISPATCH_SEQ } from "../../../assets/corpConstants";
import { useParams } from "react-router-dom";

const getActionableType = (itemId) => {
  return itemId === "boxing" ||
    itemId === "pasteIndex" ||
    itemId === "printIndex" ||
    itemId === "sendMail" ||
    itemId === "createInvoice" ||
    itemId === "sendDelivery"
    ? "status"
    : itemId === "scan"
    ? "copy"
    : "download";
};

const RowComp = ({ data, handleChange }) => {
  return (
    <Fragment>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ p: 2, borderRight: isDesktop && "1px solid #000" }}
        >
          <CustomTypographyBold>{data.itemName}</CustomTypographyBold>
        </Grid>

        <Grid
          item
          xs={6}
          lg={4}
          sx={{ p: 2, display: "flex", justifyContent: "center" }}
        >
          {getActionableType(data.itemId) !== "status" ? (
            <Button size="small" sx={{ width: "120px" }} variant="contained">
              {(getActionableType(data.itemId) === "copy" && "Copy Link") ||
                (getActionableType(data.itemId) === "download" && "Download")}
            </Button>
          ) : null}
        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            borderLeft: isDesktop && "1px solid #000",
          }}
        >
          <MarkStatusBtn
            selectedStatus={data.status}
            setSelectedStatus={(newValue) => {
              handleChange(data.itemId, newValue);
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const DispatchMain = () => {
  let { itemId } = useParams();
  const corpId = itemId;
  const { enqueueSnackbar } = useSnackbar();
  const [dispatchData, setDispatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllTaskList(
      corpId,
      setIsLoading,
      setDispatchData,
      "DISPATCH",
      DISPATCH_SEQ
    );
  }, []);

  const handleChange = async (itemId, newValue) => {
    // setIsLoading(true);

    const updateDispatchData = dispatchData.map((item, index) =>
      item.itemId === itemId ? { ...item, status: newValue } : item
    );
    setDispatchData(updateDispatchData);

    const itemIndex = dispatchData.findIndex((item) => item.itemId === itemId);

    const updatedItem = { ...updateDispatchData[itemIndex], status: newValue };
    const url = BASE_URL + `task/item`;
    const response = await updateData(url, updatedItem);

    if (response.error) {
      // setIsLoading(false);
      enqueueSnackbar("An Error Occurred!", { variant: "error" });
    } else {
      // setIsLoading(false);
      enqueueSnackbar("Status Updated Successfully!", { variant: "success" });
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Dispatch">
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            backgroundColor: "#F5F5F5",
            minHeight: "80vh",
            borderRadius: 5,
          }}
        >
          <Box sx={{ p: 2 }}>
            <Grid
              container
              sx={{ border: "1px solid #000", borderRadius: "15px" }}
            >
              <Grid
                item
                xs={12}
                lg={12}
                sx={{ p: 2, borderBottom: "1px solid #000" }}
              >
                <CustomTypographyBold>Dispatch</CustomTypographyBold>
              </Grid>
              {dispatchData.map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  lg={12}
                  sx={{ borderBottom: "1px solid #000" }}
                >
                  <RowComp data={item} handleChange={handleChange} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default DispatchMain;
