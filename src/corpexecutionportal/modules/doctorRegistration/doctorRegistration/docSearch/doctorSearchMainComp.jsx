import { Box, Button, Grid, Stack } from "@mui/material";
import { Fragment, useState } from "react";
import SearchDocByName from "./searchDocByName";
import SearchDocByPhone from "./searchDocByPhone";
import SearchResults from "./searchResults";

const DoctorSearchMainComp = (props) => {
  console.log({ "props.docList": props.docList });
  const [searchData, setSearchData] = useState(
    props.docList ? props.docList : []
  );
  const [docId, setDocId] = useState("");
  const [docList, setDocList] = useState([]);
  const searchDataHandler = (data) => {
    setSearchData(data);
  };
  const goBackHandler = () => {
    props.onClickAction("BACK");
  };

  const rowSelectHandler = (data, docList) => {
    setDocId(data[0]);
    setDocList(docList);
    console.log({ dfsdfsdfs: data[0] });
  };
  const editHandler = () => {
    props.onClickAction("EDIT", docId, docList);
  };
  return (
    <Fragment>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ p: 2, minHeight: "10vh" }}>
            <Grid container columnSpacing={3}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SearchDocByName getSearchData={searchDataHandler} />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SearchDocByPhone getSearchData={searchDataHandler} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ p: 0, minHeight: "63vh" }}>
            <Grid container columnSpacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <SearchResults
                  docList={searchData}
                  onRowSelect={rowSelectHandler}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box
            sx={{ minHeight: "5vh", p: 2, background: "#fff" }}
            component={Stack}
            direction="row"
            spacing={2}
            justifyContent={"center"}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ color: "white" }}
              onClick={goBackHandler}
            >
              Back
            </Button>
            <Button
              disabled={docId ? false : true}
              fullWidth
              variant="contained"
              sx={{ color: "white" }}
              onClick={editHandler}
            >
              Edit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DoctorSearchMainComp;
