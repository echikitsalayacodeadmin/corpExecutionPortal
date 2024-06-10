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
import { Fragment, useState } from "react";
import HWI from "../../../assets/images/ticketingSystem/aware seesion 1.png";
import CAI from "../../../assets/images/ticketingSystem/Corp admin 1.png";
import CEI from "../../../assets/images/ticketingSystem/corp employee 1.png";
import INTI from "../../../assets/images/ticketingSystem/Internal 1.png";
import PHAI from "../../../assets/images/ticketingSystem/pharmacy 1.png";
import PEI from "../../../assets/images/ticketingSystem/pre employment 1.png";
import SRI from "../../../assets/images/ticketingSystem/service req 1.png";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import RaiseTicketDialog from "./comps/raiseTicketDialog";

export const TicketCategoryList = [
  {
    id: 1,
    title: "Awareness Session",
    imageUrl: HWI,
    ticketType: "HEALTH_AWARENESS",
  },
  {
    id: 2,
    title: "Pre Employment",
    imageUrl: PEI,
    ticketType: "HEALTH_AWARENESS",
  },
  {
    id: 3,
    title: "Corp Admin",
    imageUrl: CAI,
    ticketType: "HEALTH_AWARENESS",
  },
  {
    id: 4,
    title: "Corp Employee",
    imageUrl: CEI,
    ticketType: "HEALTH_AWARENESS",
  },
  {
    id: 5,
    title: "Internal",
    imageUrl: INTI,
    ticketType: "HEALTH_AWARENESS",
  },
  {
    id: 6,
    title: "Service Request",
    imageUrl: SRI,
    ticketType: "HEALTH_AWARENESS",
  },
  {
    id: 7,
    title: "Pharmacy",
    imageUrl: PHAI,
    ticketType: "HEALTH_AWARENESS",
  },
];
const RaiseNewTicketMain = ({
  authId = localStorage.getItem("USER_ID_CORP_SALES"),
}) => {
  console.log({ authId });
  const [open, setOpen] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState({});

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
              <Card
                sx={{ minWidth: 275, background: "#efefff" }}
                onClick={() => {
                  setOpen(true);
                  setSelectedTicketType(value);
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Stack direction="row" spacing={2}>
                      <img height={120} width={200} src={value?.imageUrl} />

                      <Box
                        sx={{
                          position: "absolute ",
                          top: 20,
                          right: -20,
                          height: 180,
                          width: 180,
                          borderRadius: 100,
                          mt: 100,
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Stack
                          direction="row"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {value.title}
                          </Typography>
                          <Box
                            sx={{
                              height: 30,
                              width: 30,
                              borderRadius: 15,
                              background: "#efefff",
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <ArrowRightAltIcon fontSize="10" />
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <RaiseTicketDialog
        open={open}
        setOpen={setOpen}
        selectedTicketType={selectedTicketType}
      />
    </Fragment>
  );
};

export default RaiseNewTicketMain;
