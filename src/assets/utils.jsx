import Papa from "papaparse";

export function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date}`;
}

export function getCurrentDateFormatted(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let m = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthStr = m[month - 1];

  return `${date}${separator}${monthStr}${separator}${year}`;
}

export function getDelay(time) {
  let str = "";

  if (time !== null && typeof time !== "undefined") {
    let delay = 0;
    let newDate_current = new Date();
    let hour_current = newDate_current.getHours();
    let minutes_current = newDate_current.getMinutes();

    let d = time.split(":");
    let d1 = d[1].split(" ");

    let th = parseInt(d[0]);
    let tm = parseInt(d1[0]);
    let tp = d1[1];

    if (tp === "PM") {
      th = th + 12;
    }

    delay = (hour_current - th) * 60 + (minutes_current - tm);

    if (delay < 0) {
      delay = (th - hour_current) * 60 + (tm - minutes_current);
      const h = Math.floor(delay / 60);
      const m = delay % 60;
      str = h + "h " + m + "m to start";
    } else {
      delay = (hour_current - th) * 60 + (minutes_current - tm);
      const h = Math.floor(delay / 60);
      const m = delay % 60;
      str = h + "h " + m + "m overdue";
    }
  }

  return str;
}

export const getFormattedDayAndDate = (date) => {
  const d = new Date(date).toUTCString().split(" ");
  const nd = d[0] + " " + d[1] + " " + d[2] + " " + d[3];
  return nd;
};

export const getFormattedDDMonthYYYY = (date) => {
  const d = new Date(date).toUTCString().split(" ");
  const nd = d[1] + " " + d[2] + " " + d[3];
  return nd;
};

export const filterUniqueEmployeesByEmpId = (array) => {
  return (
    array?.filter(
      (employee, index, self) =>
        employee?.empId !== null &&
        employee?.empId !== "" &&
        self.findIndex((e) => e?.empId === employee?.empId) === index
    ) || []
  );
};

export const formatColumnName = (columnName) => {
  return columnName?.replace(/([A-Z])/g, " $1")?.toUpperCase();
};

export const getFileType = (url) => {
  const extension = url?.split(".")?.pop()?.toLowerCase();
  console.log({ extension });
  if (extension === "pdf") {
    return "pdf";
  } else if (
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "gif"
  ) {
    return "image";
  }
  return "";
};

export const sortDataByDateTime = (data) => {
  const sortedData = data.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });

  return sortedData;
};

export const sortDataByName = (data) => {
  const dataCopy = [...data];
  const sortedData = dataCopy?.sort((a, b) => {
    const nameA = a.name?.toUpperCase();
    const nameB = b.name?.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return sortedData;
};

export const sortArrayBySno = (dataArray) => {
  const dataCopy = [...dataArray];
  const sortedData = dataCopy.sort((a, b) => a.sno - b.sno);
  return sortedData;
};

export const downloadCsv = (jsonData, csvname) => {
  const csv = Papa.unparse(jsonData);
  const csvData = new Blob([csv], { type: "text/csv" });
  const csvUrl = window.URL.createObjectURL(csvData);
  const hiddenElement = document.createElement("a");
  hiddenElement.href = csvUrl;
  hiddenElement.target = "_blank";
  hiddenElement.download = csvname;
  hiddenElement.click();
};

export const showNumber = (val) => {
  return val ? val : val === 0 ? 0 : "na";
};

export const getUniqueArrayFromFields = (data, fieldName) => {
  if (!data || data?.length === 0) {
    console.log({ Error: "Undefined Data" });
    return [];
  }
  const fieldExists = data?.some((item) => item.hasOwnProperty(fieldName));
  if (!fieldExists) {
    console.log({ Error: `Field "${fieldName}" does not exist in the data` });
    return [];
  }
  const uniqueValues = data
    ?.filter((obj) => obj[fieldName] !== null) // Filter out objects with null values for the specified field
    ?.map((obj) => obj[fieldName]) // Extract the field values
    ?.filter((value, index, self) => self.indexOf(value) === index); // Filter out duplicate field values
  return uniqueValues;
};

export const getColumnWidth = (key) => {
  const width =
    key === "isActive"
      ? 80
      : key === "id" || key === "corpId"
      ? 340
      : key === "empId"
      ? 120
      : key === "empName" || key === "nameInReport"
      ? 300
      : key === "matching"
      ? 200
      : key === "genderInReport" || key === "genderInDB"
      ? 150
      : key === "ageInReport" || key === "empIdInReport"
      ? 150
      : key === "tokenNumberInReport"
      ? 250
      : key === "fileName"
      ? 580
      : key === "fileUrl"
      ? 630
      : key === "uploaded"
      ? 100
      : key === "alreayUploaded"
      ? 160
      : key === "alreadyUploadedUrl"
      ? 200
      : key === "interpretation"
      ? 170
      : key === "date"
      ? 130
      : key === "orgReportProcessingField"
      ? 250
      : key === "orgReportProcessingField" ||
        key === "orgEmployeeFileType" ||
        key === "orgReportUploadStatus"
      ? 250
      : 170;

  return width;
};

export const sortBySequence = (data, sequence) =>
  data.sort((a, b) => sequence.indexOf(a.itemId) - sequence.indexOf(b.itemId));

export const sortArrayByDateTime = (arr) => {
  return arr.sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`);
    const dateTimeB = new Date(`${b.date}T${b.time}`);
    return dateTimeB - dateTimeA;
  });
};

export const getMonthFromDate = (dateString) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthNumber = date.getMonth();
  const monthName = monthNames[monthNumber];
  return monthName;
};

export const formatTime = (date) => {
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
  return date.toLocaleTimeString("en-US", timeOptions);
};

export const sortArrayByLastModifiedDate = (array) => {
  const sortedArray = array.sort(
    (a, b) => new Date(b.lastModifiedDate) - new Date(a.lastModifiedDate)
  );
  return sortedArray;
};

export const sortArrayBySequence = (array) => {
  return array.sort((a, b) => a.sequence - b.sequence);
};

export const generateRandomId = (existingIdsArray) => {
  const min = 100000; // Minimum value for a six-digit number
  const max = 999999; // Maximum value for a six-digit number
  let newId;
  do {
    newId = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (existingIdsArray?.some((obj) => obj.id === newId));
  return newId;
};

export const capitalizeEachWord = (sentence) => {
  const words = sentence.split(" ");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(" ");
};

// export const getColorOfNextVisitDate = (nextVisitDate) => {
//   if (!nextVisitDate) {
//     return "#000000";
//   }
//   const currentDate = new Date();
//   const nextVisit = new Date(nextVisitDate);
//   if (currentDate > nextVisit) {
//     console.log("red");
//     return "red";
//   }
//   const difference = Math.abs(nextVisit - currentDate);
//   const differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
//   console.log({ differenceInDays });
//   if (differenceInDays >= 3) {
//     return "green";
//   } else if (differenceInDays <= 2 && differenceInDays > 0) {
//     return "orange";
//   }
// };

// export const getColorOfNextVisitDateInVisitDetail = (nextVisitDate) => {
//   if (!nextVisitDate) {
//     return "#000000";
//   }
//   const currentDate = new Date();
//   const nextVisit = new Date(nextVisitDate);
//   console.log({ currentDate, nextVisit });
//   if (currentDate > nextVisit) {
//     console.log("red");
//     return "red";
//   } else if (currentDate === nextVisit) {
//     return "green";
//   }
//   const difference = Math.abs(nextVisit - currentDate);
//   const differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
//   console.log({ differenceInDays });
//   if (differenceInDays >= 3) {
//     return "green";
//   } else if (differenceInDays <= 2 && differenceInDays > 0) {
//     return "green";
//   }
// };

// export const assignColors = (visits) => {
//   if (visits.length === 0) {
//     return [];
//   }
//   // Convert date strings to Date objects
//   visits.forEach((visit) => {
//     visit.nextVisitDate = new Date(visit.nextVisitDate);
//     visit.visitDate = new Date(visit.visitDate);
//   });

//   // Assign colors based on comparisons starting from the second visit
//   for (let i = 1; i < visits.length; i++) {
//     const prevVisitDate = visits[i - 1].visitDate;
//     const currentNextVisitDate = visits[i].nextVisitDate;
//     if (
//       prevVisitDate.toISOString().slice(0, 10) >
//       currentNextVisitDate.toISOString().slice(0, 10)
//     ) {
//       visits[i].color = "red";
//     } else if (
//       prevVisitDate.toISOString().slice(0, 10) ===
//       currentNextVisitDate.toISOString().slice(0, 10)
//     ) {
//       // visits[i].color = "orange";
//       visits[i].color = "green";
//     } else {
//       visits[i].color = "green";
//     }
//   }
//   console.log({ visits });
//   // Assign color for the most recent visit
//   visits[0].color = getColorOfNextVisitDateInVisitDetail(
//     visits[0].nextVisitDate
//   );

//   // Convert Date objects back to strings
//   visits.forEach((visit) => {
//     visit.nextVisitDate = visit.nextVisitDate.toISOString().slice(0, 10);
//     visit.visitDate = visit.visitDate.toISOString().slice(0, 10);
//   });

//   return visits;
// };

export const getColorOfNextVisitDate = (nextVisitDate) => {
  if (!nextVisitDate) {
    return "#000000";
  }
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
  const nextVisit = new Date(nextVisitDate);
  nextVisit.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
  if (currentDate > nextVisit) {
    console.log("red");
    return "red";
  }
  const difference = Math.abs(nextVisit - currentDate);
  const differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
  console.log({ differenceInDays });
  if (differenceInDays >= 3) {
    return "green";
  } else if (differenceInDays <= 2 && differenceInDays > 0) {
    return "orange";
  }
};

export const getColorOfNextVisitDateInVisitDetail = (nextVisitDate) => {
  if (!nextVisitDate) {
    return "#000000";
  }
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
  const nextVisit = new Date(nextVisitDate);
  nextVisit.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
  console.log({ currentDate, nextVisit });
  if (currentDate > nextVisit) {
    console.log("red");
    return "red";
  } else if (currentDate.getTime() === nextVisit.getTime()) {
    return "green";
  }
  const difference = Math.abs(nextVisit - currentDate);
  const differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
  console.log({ differenceInDays });
  if (differenceInDays >= 3) {
    return "green";
  } else if (differenceInDays <= 2 && differenceInDays > 0) {
    return "green";
  }
};

export const assignColors = (visits) => {
  if (visits.length === 0) {
    return [];
  }
  // Convert date strings to Date objects
  visits.forEach((visit) => {
    visit.nextVisitDate = new Date(visit.nextVisitDate);
    visit.visitDate = new Date(visit.visitDate);
    visit.nextVisitDate.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
    visit.visitDate.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
  });

  // Assign colors based on comparisons starting from the second visit
  for (let i = 1; i < visits.length; i++) {
    const prevVisitDate = visits[i - 1].visitDate;
    const currentNextVisitDate = visits[i].nextVisitDate;
    if (prevVisitDate > currentNextVisitDate) {
      visits[i].color = "red";
    } else if (prevVisitDate.getTime() === currentNextVisitDate.getTime()) {
      // visits[i].color = "orange";
      visits[i].color = "green";
    } else {
      visits[i].color = "green";
    }
  }
  console.log({ visits });
  // Assign color for the most recent visit
  visits[0].color = getColorOfNextVisitDateInVisitDetail(
    visits[0].nextVisitDate
  );

  // Convert Date objects back to strings
  visits.forEach((visit) => {
    visit.nextVisitDate = visit.nextVisitDate.toISOString().slice(0, 10);
    visit.visitDate = visit.visitDate.toISOString().slice(0, 10);
  });

  return visits;
};
