import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import MyDocument from "./myDocument";
import { Dialog, DialogContent, Portal } from "@mui/material";

const PdfMain = ({ data }) => {
  return (
    <PDFViewer showToolbar={true} height={"100%"} width={"100%"}>
      <MyDocument data={data} />
    </PDFViewer>
  );
};

export default PdfMain;
