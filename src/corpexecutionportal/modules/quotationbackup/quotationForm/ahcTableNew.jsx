import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Paper,
  Portal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";

const headers = [
  {
    Header: "sno",
    accessor: "",
    width: "10%",
    visibilty: true,
  },
  {
    Header: "Package Name",
    accessor: "packageName",
    visibilty: true,
  },
  {
    Header: "Test List",
    accessor: "testList",
    visibilty: true,
  },
  {
    Header: "Price Per Employee",
    accessor: "pricePerEmp",
    visibilty: true,
  },
  {
    Header: "Total Cost",
    accessor: "finalPrice",
    width: "20%",
    visibilty: true,
  },
  {
    Header: "Actions",
    accessor: "",
    width: "20%",
    visibilty: true,
  },
];

const tableRow = [
  {
    id: 0,
    packageName: "General Employee Package",
    noOfEmp: "300",
    pricePerEmp: "610",
    finalPrice: "183000",
    testList: [
      {
        id: "1",
        testName: "CBC",
      },
      {
        id: "2",
        testName: "RANDOM BLOOD SUGAR",
      },
      {
        id: "3",
        testName: "URINE RM",
      },
      {
        id: "4",
        testName: "S BILIRUBIN",
      },
      {
        id: "5",
        testName: "PFT",
      },
      {
        id: "6",
        testName: "CHEST X RAY",
      },
      {
        id: "7",
        testName: "ECG",
      },
      {
        id: "8",
        testName: "AUDIOMETRY",
      },
      {
        id: "9",
        testName: "EYETEST",
      },
      {
        id: "11",
        testName: "PHYSICAL FITNESS",
      },
      {
        id: "12",
        testName: "AFIH DOCTOR APPROVED FORMS (FORM 32, 35 and 21)",
      },
    ],
  },
];

const ahcPackageList = [
  {
    headers: [
      {
        Header: "sno",
        accessor: "",
        width: "10%",
        visibilty: true,
      },
      {
        Header: "Package Name",
        accessor: "packageName",
        visibilty: true,
      },
      {
        Header: "Test List",
        accessor: "testList",
        visibilty: true,
      },
      {
        Header: "Price Per Employee",
        accessor: "pricePerEmp",
        visibilty: true,
      },
      {
        Header: "Total Cost",
        accessor: "finalPrice",
        width: "20%",
        visibilty: true,
      },
    ],
    rowData: [
      {
        id: 0,
        packageName: "General Employee Package",
        noOfEmp: "300",
        pricePerEmp: "610",
        finalPrice: "183000",
        testList: [
          {
            id: "1",
            testName: "CBC",
          },
          {
            id: "2",
            testName: "RANDOM BLOOD SUGAR",
          },
          {
            id: "3",
            testName: "URINE RM",
          },
          {
            id: "4",
            testName: "S BILIRUBIN",
          },
          {
            id: "5",
            testName: "PFT",
          },
          {
            id: "6",
            testName: "CHEST X RAY",
          },
          {
            id: "7",
            testName: "ECG",
          },
          {
            id: "8",
            testName: "AUDIOMETRY",
          },
          {
            id: "9",
            testName: "EYETEST",
          },
          {
            id: "11",
            testName: "PHYSICAL FITNESS",
          },
          {
            id: "12",
            testName: "AFIH DOCTOR APPROVED FORMS (FORM 32, 35 and 21)",
          },
        ],
      },
      {
        id: 0,
        packageName: "Package 2",
        noOfEmp: "300",
        pricePerEmp: "610",
        finalPrice: "183000",
        // testList: [
        //   {
        //     id: "1",
        //     testName: "CBC",
        //   },
        //   {
        //     id: "2",
        //     testName: "RANDOM BLOOD SUGAR",
        //   },
        //   {
        //     id: "3",
        //     testName: "URINE RM",
        //   },
        //   {
        //     id: "4",
        //     testName: "S BILIRUBIN",
        //   },
        //   {
        //     id: "5",
        //     testName: "PFT",
        //   },
        //   {
        //     id: "6",
        //     testName: "CHEST X RAY",
        //   },
        //   {
        //     id: "7",
        //     testName: "ECG",
        //   },
        //   {
        //     id: "8",
        //     testName: "AUDIOMETRY",
        //   },
        //   {
        //     id: "9",
        //     testName: "EYETEST",
        //   },
        //   {
        //     id: "11",
        //     testName: "PHYSICAL FITNESS",
        //   },
        //   {
        //     id: "12",
        //     testName: "AFIH DOCTOR APPROVED FORMS (FORM 32, 35 and 21)",
        //   },
        // ],
      },
      {
        id: 0,
        packageName: "Package 3",
        noOfEmp: "300",
        pricePerEmp: "610",
        finalPrice: "183000",
        // testList: [
        //   {
        //     id: "1",
        //     testName: "CBC",
        //   },
        //   {
        //     id: "2",
        //     testName: "RANDOM BLOOD SUGAR",
        //   },
        //   {
        //     id: "3",
        //     testName: "URINE RM",
        //   },
        //   {
        //     id: "4",
        //     testName: "S BILIRUBIN",
        //   },
        //   {
        //     id: "5",
        //     testName: "PFT",
        //   },
        //   {
        //     id: "6",
        //     testName: "CHEST X RAY",
        //   },
        //   {
        //     id: "7",
        //     testName: "ECG",
        //   },
        //   {
        //     id: "8",
        //     testName: "AUDIOMETRY",
        //   },
        //   {
        //     id: "9",
        //     testName: "EYETEST",
        //   },
        //   {
        //     id: "11",
        //     testName: "PHYSICAL FITNESS",
        //   },
        //   {
        //     id: "12",
        //     testName: "AFIH DOCTOR APPROVED FORMS (FORM 32, 35 and 21)",
        //   },
        // ],
      },
    ],
  },
];

const columns = [
  {
    field: "sno",
    headerName: "#",
    width: 40,
    align: "left",
    headerAlign: "left",
    editable: true,
  },
  { field: "testName", headerName: "Test Name", width: 170, editable: true },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    editable: true,
  },
  {
    field: "throwAwayPrice",
    type: "number",
    headerName: "Throw Away Price",
    align: "center",
    headerAlign: "center",
    width: 150,
    editable: true,
  },
  {
    field: "bestPrice",
    type: "number",
    headerName: "Best Price",
    align: "center",
    headerAlign: "center",
    width: 100,
    editable: true,
  },
  {
    field: "quotePrice",
    type: "number",
    headerName: "Quote Price",
    align: "center",
    headerAlign: "center",
    width: 100,
    editable: true,
  },
  {
    field: "noOfEmp",
    type: "number",
    headerName: "#Emp",
    align: "center",
    headerAlign: "center",
    width: 100,
    editable: true,
  },
  {
    field: "revenue",
    type: "number",
    headerName: "Revenue",
    align: "center",
    headerAlign: "center",
    width: 100,
    editable: true,
  },
  {
    field: "marginPercent",
    type: "number",
    headerName: "Margin Percent",
    align: "center",
    headerAlign: "center",
    width: 120,
    editable: true,
  },
];

const AhcTableNew = () => {
  const [formValues, setFormValues] = useState({
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    title: "string",
    details: "string",
    finalPrice: 0,
    systemPrice: 0,
    corpName: "string",
    corpAddress: "string",
    corpSpoc: "string",
    noOfEmp: "string",
    noOfStaff: "string",
    createdBy: 0,
    createdByName: "string",
    approvedBy: 0,
    approvedByName: "string",
    quotationDate: "2024-04-01",
    quotationExpirationDate: "2024-04-01",
    quotationStatus: "PENDING",
    quotationTableDataVMS: [
      {
        sequence: 0,
        tableTitle: "string",
        disclaimer: "string",
        quotationDataType: "AHC",
        noOfEmp: 0,
        systemPrice: 0,
        bestPrice: 0,
        quotationDataVMS: [
          {
            id: 0,
            packageName: "A",
            noOfEmp: 0,
            finalPrice: 0,
            pricePerEmp: 0,
            quotationDataType: "AHC",
            sequence: 0,
            testList: [
              {
                id: 0,
                testName: "string",
                description: "string",
                quantity: "string",
                ohcPackageType: "string",
                bestPrice: 0,
                quotationDataType: "AHC",
                sequence: 0,
                throwAwayPrice: 0,
                quotePrice: 0,
                revenue: 0,
                marginPercent: 0,
                noOfEmp: 0,
              },
            ],
          },
          {
            id: 0,
            packageName: "B",
            noOfEmp: 0,
            finalPrice: 0,
            pricePerEmp: 0,
            quotationDataType: "AHC",
            sequence: 0,
            testList: [
              {
                id: 0,
                testName: "string",
                description: "string",
                quantity: "string",
                ohcPackageType: "string",
                bestPrice: 0,
                quotationDataType: "AHC",
                sequence: 0,
                throwAwayPrice: 0,
                quotePrice: 0,
                revenue: 0,
                marginPercent: 0,
                noOfEmp: 0,
              },
            ],
          },
          {
            id: 0,
            packageName: "C",
            noOfEmp: 0,
            finalPrice: 0,
            pricePerEmp: 0,
            quotationDataType: "AHC",
            sequence: 0,
            testList: [
              {
                id: 0,
                testName: "string",
                description: "string",
                quantity: "string",
                ohcPackageType: "string",
                bestPrice: 0,
                quotationDataType: "AHC",
                sequence: 0,
                throwAwayPrice: 0,
                quotePrice: 0,
                revenue: 0,
                marginPercent: 0,
                noOfEmp: 0,
              },
            ],
          },
        ],
      },
    ],
    corpId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    quotationUrl: "string",
    createdDate: "2024-04-01T10:09:48.342Z",
    lastModifiedDate: "2024-04-01T10:09:48.342Z",
    isActive: true,
  });
  const [dataGridRow, setDataGridRow] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [itemList, setItemlist] = useState([]);
  const [currentTestList, setCurrentTestList] = useState([]);
  const [packageIndex, setPackageIndex] = useState("");
  useEffect(() => {
    fetchItemListNew2(setItemlist, setFormValues);
  }, []);
  const handleAddPackage = async () => {
    setOpen(true);
    setCurrentTestList(itemList);
  };

  console.log({ itemList });

  return (
    <Box>
      <Button onClick={() => handleAddPackage()}>Add New Package</Button>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers?.map((item, index) => (
                <TableCell key={index}>{item.Header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {formValues.quotationTableDataVMS
              ?.filter((quote) => quote.quotationDataType === "AHC")[0]
              ?.quotationDataVMS?.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.packageName}</TableCell>
                  <TableCell>
                    {row?.testList?.map((test) => `${test.testName}, `)}
                  </TableCell>
                  <TableCell>{row.pricePerEmp}</TableCell>
                  <TableCell>{row.finalPrice}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setCurrentTestList(row?.testList);
                        setOpen(true);
                        setPackageIndex(index);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Portal>
        <Dialog maxWidth={false} open={open} onClose={handleClose}>
          <DialogContent>
            <CustomDataGridLayout
              columns={columns}
              rows={currentTestList}
              rowHeight={40}
              Gridheight={"100%"}
              getRowId={(row) => row?.id}
              checkboxSelection={false}
              disableRowSelectionOnClick={true}
              slots={null}
            />
          </DialogContent>
        </Dialog>
      </Portal>
    </Box>
  );
};

export default AhcTableNew;
