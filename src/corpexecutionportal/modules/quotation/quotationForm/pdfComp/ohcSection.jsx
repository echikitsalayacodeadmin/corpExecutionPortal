import { Font, Image, Text, View } from "@react-pdf/renderer";
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

const OhcSection = ({ data }) => {
  return (
    <View
      style={{ marginVertical: "10px" }}
      break={data?.ohcVM?.isOHCTableNextPage === true ? true : false}
    >
      <View style={{ marginVertical: "10px" }}>
        <Text style={{ fontSize: "10px" }}>{data?.ohcVM?.details}</Text>
      </View>
      {data.ohcVM.ohcTableUrl === "" || data.ohcVM.ohcTableUrl === null ? (
        <View style={{ border: "1px solid #DDD" }}>
          <View style={{ padding: "3px", borderBottom: "1px solid #DDD" }}>
            <Text
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#0000FF",
              }}
            >
              {data?.ohcVM?.title || ""}
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
                width: "30%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Package Name</CustomTextTableHeader>
            </View>
            <View
              style={{
                width: "30%",
                padding: "3px",
                borderRight: "1px solid #DDD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextTableHeader>Description</CustomTextTableHeader>
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
              <CustomTextTableHeader>No Of Staff</CustomTextTableHeader>
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
              <CustomTextTableHeader>Cost Per Month</CustomTextTableHeader>
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
              <CustomTextTableHeader>Total Cost / Month</CustomTextTableHeader>
            </View>
          </View>
          {data?.ohcVM?.ohcCategoryVMS?.map((category, rowIndex) => (
            <View key={rowIndex}>
              <View
                style={{
                  width: "100%",
                  padding: "3px",
                  borderBottom: "1px solid #DDD",
                  backgroundColor: "#FFF2CC",
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    textAlign: "center",
                    color: "#000000",
                    fontWeight: "bold",
                  }}
                >
                  {category.categoryTitle}
                </Text>
              </View>
              {category?.ohcPackageVMS?.map((pack, index) => (
                <View key={index}>
                  <View
                    style={{
                      width: "100%",
                      padding: "3px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottom: "1px solid #DDD",
                      backgroundColor: "#CFE3E0",
                    }}
                  >
                    <Text style={{ fontSize: "8px", fontWeight: "bold" }}>
                      {pack.packageTitle}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottom: "1px solid #DDD",
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
                      <Text style={{ fontSize: "8px" }}>{index + 1}</Text>
                    </View>
                    <View
                      style={{
                        width: "30%",
                        padding: "3px",
                        borderRight: "1px solid #DDD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: "8px" }}>
                        {pack.packageName}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "30%",
                        padding: "3px",
                        borderRight: "1px solid #DDD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: "8px" }}>
                        {pack.packageDescription}
                      </Text>
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
                      <Text style={{ fontSize: "8px" }}>{pack.noOfStaff}</Text>
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
                      <Text style={{ fontSize: "8px" }}>
                        {pack.perMonthCost}
                      </Text>
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
                      <Text style={{ fontSize: "8px" }}>
                        {pack.totalCostPerMonth}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
          <View style={{ padding: "3px" }}>
            <Text
              style={{
                fontSize: "8px",
                color: "red",
              }}
            >
              {data?.ohcVM.disclaimer || ""}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          {data?.ohcVM?.ohcTableUrl && (
            <Image style={{ width: "100%" }} src={data?.ohcVM?.ohcTableUrl} />
          )}
        </View>
      )}
    </View>
  );
};

export default OhcSection;
