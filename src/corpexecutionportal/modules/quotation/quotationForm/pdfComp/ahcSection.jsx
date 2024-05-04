import { Font, Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

// Register Hyphenation Callback
Font.registerHyphenationCallback((word) => {
  return [word]; // No hyphenation applied
});

const CustomTextTableHeader = ({ children, style }) => {
  return (
    <Text
      style={{
        fontSize: "10px",
        color: "#FFFFFF",
        fontWeight: "bold",
      }}
    >
      {children}
    </Text>
  );
};

const AhcSection = ({ data }) => {
  return (
    <View
      style={{ marginVertical: "10px" }}
      break={
        data?.quotationTableDataVMS?.filter(
          (quote) => quote?.quotationDataType === "AHC"
        )[0]?.isAHCTableNextPage === true
          ? true
          : false
      }
    >
      <View style={{ marginVertical: "10px" }}>
        <Text style={{ fontSize: "10px" }}>
          {
            data?.quotationTableDataVMS?.filter(
              (quote) => quote?.quotationDataType === "AHC"
            )[0]?.details
          }
        </Text>
      </View>
      {data?.quotationTableDataVMS?.filter(
        (quote) => quote?.quotationDataType === "AHC"
      )[0]?.tableUrl === "" ||
      data?.quotationTableDataVMS?.filter(
        (quote) => quote?.quotationDataType === "AHC"
      )[0]?.tableUrl === null ? (
        <View style={{ border: "1px solid #DDD" }}>
          <View style={{ padding: "3px", borderBottom: "1px solid #DDD" }}>
            <Text
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#0000FF",
              }}
            >
              {data?.quotationTableDataVMS?.filter(
                (quote) => quote?.quotationDataType === "AHC"
              )[0]?.tableTitle || ""}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottom: "1px solid #DDD",
              backgroundColor: "#4682E6",
            }}
          >
            <View
              style={{
                width: "10%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Sno</CustomTextTableHeader>
            </View>
            <View
              style={{
                width: "25%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Package</CustomTextTableHeader>
            </View>
            <View
              style={{
                width: "35%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Test List</CustomTextTableHeader>
            </View>
            <View
              style={{
                width: "10%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>No Of Emp</CustomTextTableHeader>
            </View>
            <View
              style={{
                width: "10%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Cost Per Emp</CustomTextTableHeader>
            </View>
            <View
              style={{
                width: "10%",
                padding: "3px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Total Cost</CustomTextTableHeader>
            </View>
          </View>

          {data.quotationTableDataVMS
            ?.filter((quote) => quote.quotationDataType === "AHC")[0]
            ?.quotationDataVMS?.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{ flexDirection: "row", borderBottom: "1px solid #DDD" }}
              >
                <View
                  style={{
                    width: "10%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: "8px" }}>{rowIndex + 1}</Text>
                </View>
                <View
                  style={{
                    width: "25%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "10px",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    {row.packageName}
                  </Text>
                </View>
                <View
                  style={{
                    width: "35%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {row?.testList?.map((test, index) => (
                    <Text
                      key={index}
                      style={{ fontSize: "8px", marginVertical: "2px" }}
                    >
                      {test.testName}
                    </Text>
                  ))}
                </View>
                <View
                  style={{
                    width: "10%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: "8px" }}>{row.noOfEmp}</Text>
                </View>
                <View
                  style={{
                    width: "10%",
                    padding: "3px",
                    borderRight: "1px solid #DDD",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: "8px" }}>{row.pricePerEmp}</Text>
                </View>
                <View
                  style={{
                    width: "10%",
                    padding: "3px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: "8px" }}>{row.finalPrice}</Text>
                </View>
              </View>
            ))}
          <View
            style={{
              borderBottom: "1px solid #DDD",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: "10px",
              paddingVertical: "5px",
            }}
          >
            <Text
              style={{
                fontSize: "8px",
                fontWeight: "bold",
              }}
            >
              Total Cost
            </Text>
            <Text
              style={{
                fontSize: "8px",
                fontWeight: "bold",
              }}
            >
              {data.quotationTableDataVMS?.filter(
                (quote) => quote.quotationDataType === "AHC"
              )[0]?.quotationDataVMS.length > 0
                ? `Rs ${
                    data.quotationTableDataVMS
                      ?.filter((quote) => quote.quotationDataType === "AHC")[0]
                      ?.quotationDataVMS?.reduce(
                        (total, item) => total + item.finalPrice,
                        0
                      ) || ""
                  }`
                : null}
            </Text>
          </View>
          <View style={{ paddingHorizontal: "5px", paddingVertical: "7px" }}>
            <Text
              style={{
                fontSize: "8px",
              }}
            >
              {data?.quotationTableDataVMS?.filter(
                (quote) => quote.quotationDataType === "AHC"
              )[0]?.disclaimer || ""}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          {data?.quotationTableDataVMS?.filter(
            (quote) => quote?.quotationDataType === "AHC"
          )[0]?.tableUrl && (
            <Image
              style={{ width: "100%" }}
              src={
                data?.quotationTableDataVMS?.filter(
                  (quote) => quote?.quotationDataType === "AHC"
                )[0]?.tableUrl
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

export default AhcSection;
