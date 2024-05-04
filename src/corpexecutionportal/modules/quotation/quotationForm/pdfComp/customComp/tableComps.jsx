import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const TableWrapper = ({ children, style }) => {
  return <View style={[styles.tableWrapper, style]}>{children}</View>;
};

const TableHead = ({ children, style }) => {
  return <View style={[styles.tableHead, style]}>{children}</View>;
};

const TableBody = ({ children, style }) => {
  return <View style={[styles.tableBody, style]}>{children}</View>;
};

const TableRow = ({ children, style }) => {
  return <View style={[styles.tableRow, style]}>{children}</View>;
};

const TableCell = ({ children, style }) => {
  return <Text style={[styles.tableCell, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  tableWrapper: {},
  tableHead: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: "1px",
    borderBottomWidth: "1px",
    borderBottomColor: "#ddd",
  },
  tableBody: {},
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    fontSize: "10px",
    flex: 1,
    padding: "1px",
    borderBottom: "1px solid #ddd",
  },
});

export { TableWrapper, TableHead, TableBody, TableRow, TableCell };
