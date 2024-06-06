import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import HWI from "../../../assets/images/ticketingSystem/aware seesion 1.png";
import CAI from "../../../assets/images/ticketingSystem/Corp admin 1.png";
import CEI from "../../../assets/images/ticketingSystem/corp employee 1.png";
import INTI from "../../../assets/images/ticketingSystem/Internal 1.png";
import PHAI from "../../../assets/images/ticketingSystem/pharmacy 1.png";
import PEI from "../../../assets/images/ticketingSystem/pre employment 1.png";
import SRI from "../../../assets/images/ticketingSystem/service req 1.png";

const TicketCategoryList = [
  {
    id: 1,
    title: "Awareness Session",
    imageUrl: HWI,
  },
  {
    id: 2,
    title: "Pre Employment",
    imageUrl: PEI,
  },
  {
    id: 3,
    title: "Corp Admin",
    imageUrl: CAI,
  },
  {
    id: 4,
    title: "Corp Employee",
    imageUrl: CEI,
  },
  {
    id: 5,
    title: "Internal",
    imageUrl: INTI,
  },
  {
    id: 6,
    title: "Service Request",
    imageUrl: SRI,
  },
  {
    id: 7,
    title: "Pharmacy",
    imageUrl: PHAI,
  },
];
const RaiseNewTicketMain = () => {
  return (
    <Fragment>
      <Box>
        <Grid
          container
          spacing={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {TicketCategoryList.map((value, index) => (
            <Grid item lg={4} key={index}>
              <Card sx={{ minWidth: 275, background: "#efefff" }}>
                <CardActionArea>
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <img height={120} width={200} src={value?.imageUrl} />

                      <Box
                        sx={{
                          position: "relative",
                          top: 60,
                          height: 200,
                          width: 200,
                          borderRadius: 100,
                          mt: 100,
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Word of the Day
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default RaiseNewTicketMain;
