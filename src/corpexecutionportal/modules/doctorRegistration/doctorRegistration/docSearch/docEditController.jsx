const DocEditController = (props) => {
  const goBackHandler = () => {
    props.onClickAction("BACK");
  };
  const editHandler = () => {
    props.onClickAction("BACK");
  };
  return (
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
  );
};
