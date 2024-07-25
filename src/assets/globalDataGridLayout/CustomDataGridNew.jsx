import { Box, Grid, PaginationItem, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import {
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useWindowDimensions from "../customHooks/customhooks";
import { StyledDataGrid } from "./CustomStyledDatagrid";
import { PhotoViewer } from "../customPhotoViewer/photoViewer";

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
      renderItem={(item) => (
        <PaginationItem
          type="last"
          slots={{
            previous: () => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArrowBackIcon />
                <Typography sx={{ marginLeft: "10px" }}>Previous</Typography>
              </Box>
            ),
            next: () => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ marginRight: "10px" }}>Next</Typography>
                <ArrowForwardIcon />
              </Box>
            ),
          }}
          {...item}
        />
      )}
    />
  );
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const CustomDataGridNew = (params) => {
  const { height, width } = useWindowDimensions();
  let { adjustHeight = 200 } = { ...params };

  return (
    <Fragment>
      <Box>
        <Grid container spacing={1}>
          <Grid item lg={12}>
            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                minHeight: 200,
                height: height - adjustHeight,
                "& .super-app-theme--header": {
                  backgroundColor: "#F5F5FF",
                },
              }}
            >
              <StyledDataGrid
                {...params}
                sx={{
                  "&, [class^=MuiDataGrid]": { border: "none" },
                  border: "none",
                  borderRadius: 3,
                  boxShadow: "0px 0px 6px 0px rgba(108, 120, 221, 0.40);",
                }}
                columnHeaderHeight={45}
                rowHeight={39}
                disableRowSelectionOnClick
                getRowClassName={(params) => `super-app-theme--Normal`}
                pagination
                slots={{
                  pagination: CustomPagination,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default CustomDataGridNew;
