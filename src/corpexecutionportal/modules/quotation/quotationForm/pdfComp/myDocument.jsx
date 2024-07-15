import {
  Document,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React, { Fragment } from "react";
import Header from "./header";
import Footer from "./footer";
import Address from "./address";
import Dates from "./dates";
import QuotationTitle from "./quotationTitle";
import SpocName from "./spocName";
import Paragraph1 from "./paragraph1";
import AhcSection from "./ahcSection";
import OhcSection from "./ohcSection";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
  },
});

const MyDocument = ({ data }) => {
  console.log({ MyDocument: data });
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Header />
        <View style={{ padding: "20px" }}>
          {/* <Address data={data} />
          <Dates data={data} />
          <QuotationTitle data={data} />
          <SpocName data={data} />
          <Paragraph1 data={data} /> */}
          <AhcSection data={data} />
          <OhcSection data={data} />
        </View>
        <Footer />
      </Page>
    </Document>
  );
};

export default MyDocument;
