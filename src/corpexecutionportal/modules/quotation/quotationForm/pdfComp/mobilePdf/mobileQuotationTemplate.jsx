import React, { Fragment } from "react";
import header from "../../../../../../assets/images/header.png";
import footer from "../../../../../../assets/images/footer.png";
import { Box } from "@mui/material";
import Address from "./subComps/address";
import Dates from "./subComps/dates";
import QuotationTitle from "./subComps/quotationTitle";
import SpocName from "./subComps/spocName";
import Paragraph1 from "./subComps/paragraph1";
import AhcSection from "./subComps/ahcSection";
import OhcSection from "./subComps/ohcSection";
import Footer from "./subComps/footer";

const MobileQuotationTemplate = ({ data }) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <img
        src={header}
        alt="headerimg"
        style={{
          height: "110px",
          width: "100%",
        }}
      />
      <Address data={data} />
      <Dates data={data} />
      <QuotationTitle data={data} />
      <SpocName data={data} />
      <Paragraph1 data={data} />
      <br />
      <AhcSection data={data} />
      <br />

      <OhcSection data={data} />
      <Image
        src={footer}
        alt="footerimg"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      />
    </Box>
  );
};

export default MobileQuotationTemplate;
