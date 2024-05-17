import { Box } from "@mui/material";
import { Fragment, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { _fetchEmployeeByEmpIdQRReader } from "./service";

const QRReaderMain = () => {
  const [stopDecoding, setStopDecoding] = useState(false);
  const [employee, setEmployee] = useState({});

  let navigate = useNavigate();

  const handleScanner = async (value) => {
    setStopDecoding(true);
    setTimeout(() => {
      // _fetchEmployeeByEmpIdQRReader(
      //   corpId,
      //   value?.EMP_ID,
      //   setEmployee,
      //   navigate,
      //   value
      // );

      navigate(
        `/corp/employeedetail/${value?.EMP_ID}?VITALS_ID=${value?.VITALS_ID}&NAME=${value?.NAME}`
      );
    }, 3000);
  };

  return (
    <Fragment>
      <Box
        sx={{
          width: 555,
        }}
      >
        <Scanner
          scanDelay={1000}
          onResult={(result) => {
            let tempData = {};
            const parsedData = result
              .replace("{", "")
              .replace("}", "")
              .split(",");
            const parsedData2 = parsedData.map((item) => {
              let newFormValues = {};
              newFormValues[item.split("=")[0].trim()] = item
                .split("=")[1]
                .trim();
              tempData = { ...tempData, ...newFormValues };
              return newFormValues;
            });

            console.log({
              parsedData,
              tempData,
              parsedData2: Object.entries(parsedData2),
              result: result.replace("=", ":"),
            });
            handleScanner(tempData);
          }}
          onError={(error) => console.log(error?.message)}
          stopDecoding={true}
        />
      </Box>
    </Fragment>
  );
};

export default QRReaderMain;
