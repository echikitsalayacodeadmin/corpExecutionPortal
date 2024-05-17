import { Button, Box, Stack } from "@mui/material";
import { useState } from "react";
import Papa from "papaparse";

const allowedExtensions = ["csv", "xlsx"];

const strToBool = (str) => {
  return str === "YES" ? true : str === "NO" ? false : null;
};

const ParseCSV = ({ setList, corpId, setSavedFile }) => {
  const isValidUUID = (id) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  };
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
      console.log({ inputFile });
      setSavedFile(inputFile);
    }
  };

  const clearFile = () => {
    // setFile("");
    // setSavedFile("");
    // // Reset the input field value
    // const input = document.getElementById("csvInput");
    // if (input) {
    //   input.value = "";
    // }
    window.location.reload();
  };

  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return alert("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
        transformHeader: (header) =>
          header.trim()?.replaceAll(/\s/g, "").toLowerCase(),
      });
      const parsedData = csv?.data;
      const rows = Object.keys(parsedData[0]);

      const columns = Object.values(parsedData[0]);
      const res = rows.reduce((acc, e, i) => {
        //return [...acc, [[e], columns[i]]];
        return [...acc, e];
      }, []);
      console.log({ columns, res, parsedData });
      if (!res.includes("employeeid"))
        return alert("Employee header is missing.");

      setData(parsedData);
      setList(parsedData);
      //_uploadData(parsedData);
    };
    reader.readAsText(file);
  };

  //console.log({ DATA: data });

  return (
    <Box>
      <Stack
        direction={{ lg: "row", xs: "column" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button variant="contained" component="label">
          Upload File&nbsp;
          <input
            onChange={handleFileChange}
            id="csvInput"
            name="file"
            type="File"
          />
        </Button>
        <Button onClick={handleParse}>Preview</Button>
        {file && <Button onClick={clearFile}>Clear</Button>}
      </Stack>
    </Box>
  );
};

export default ParseCSV;
