import dayjs from "dayjs";
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
  hiddenElement.download = csvname?.replaceAll(".", "");
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

export const getColorOfNextVisitDate = (nextVisitDate) => {
  if (!nextVisitDate) {
    return "#000000";
  }
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const nextVisit = new Date(nextVisitDate);
  nextVisit.setUTCHours(0, 0, 0, 0);
  if (currentDate > nextVisit) {
    return "red";
  }
  const difference = Math.abs(nextVisit - currentDate);
  const differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

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

  if (currentDate > nextVisit) {
    console.log("red");
    return "red";
  } else if (currentDate.getTime() === nextVisit.getTime()) {
    return "green";
  }
  const difference = Math.abs(nextVisit - currentDate);
  const differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (differenceInDays >= 3) {
    return "green";
  } else if (differenceInDays <= 2 && differenceInDays > 0) {
    return "green";
  }
};

// export const assignColors = (visits) => {
//   if (visits.length === 0) {
//     return [];
//   }
//   // Convert date strings to Date objects
//   visits.forEach((visit) => {
//     visit.nextVisitDate = new Date(visit.nextVisitDate);
//     visit.visitDate = new Date(visit.visitDate);
//     visit.nextVisitDate.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
//     visit.visitDate.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
//   });

//   // Assign colors based on comparisons starting from the second visit
//   for (let i = 1; i < visits.length; i++) {
//     const prevVisitDate = visits[i - 1].visitDate;
//     const currentNextVisitDate = visits[i].nextVisitDate;
//     if (prevVisitDate > currentNextVisitDate) {
//       visits[i].color = "red";
//     } else if (prevVisitDate.getTime() === currentNextVisitDate.getTime()) {
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

export const assignColors = (visits) => {
  if (visits.length === 0) {
    return [];
  }

  // Convert date strings to Date objects, handle null dates
  visits.forEach((visit) => {
    if (visit.nextVisitDate) {
      visit.nextVisitDate = new Date(visit.nextVisitDate);
      visit.nextVisitDate.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
    }
    if (visit.visitDate) {
      visit.visitDate = new Date(visit.visitDate);
      visit.visitDate.setUTCHours(0, 0, 0, 0); // Set UTC time components to zero
    }
  });

  // Assign colors based on comparisons starting from the second visit
  for (let i = 1; i < visits.length; i++) {
    const prevVisitDate = visits[i - 1].visitDate;
    const currentNextVisitDate = visits[i].nextVisitDate;

    if (!prevVisitDate || !currentNextVisitDate) {
      continue; // Skip this visit if any date is null
    }

    if (prevVisitDate > currentNextVisitDate) {
      visits[i].color = "red";
    } else if (prevVisitDate.getTime() === currentNextVisitDate.getTime()) {
      visits[i].color = "green";
    } else {
      visits[i].color = "green";
    }
  }

  // Assign color for the most recent visit
  if (visits[0].nextVisitDate) {
    visits[0].color = getColorOfNextVisitDateInVisitDetail(
      visits[0].nextVisitDate
    );
  }

  // Convert Date objects back to strings, handle null dates
  visits.forEach((visit) => {
    if (visit.nextVisitDate) {
      visit.nextVisitDate = visit.nextVisitDate.toISOString().slice(0, 10);
    }
    if (visit.visitDate) {
      visit.visitDate = visit.visitDate.toISOString().slice(0, 10);
    }
  });

  return visits;
};

export const stringToObject = (str) => {
  return str?.split(", ")?.reduce((acc, pair) => {
    const [key, value] = pair.split(": ");
    acc[key] = value === "True";
    return acc;
  }, {});
};

export const setAttendancePortalMetaData = (data, token) => {
  console.log({ data, token });
  localStorage.setItem("AUTHHEADER_ATTENDANCE", token);
  localStorage.setItem("ROLE_ATTENDANCE", data?.role);
  localStorage.setItem("BRANCH_ID_ATTENDANCE", data?.userID);
  localStorage.setItem("USER_NAME_ATTENDANCE", data?.name);
  localStorage.setItem("USER_MOBILE_ATTENDANCE", data?.mobile);
  localStorage.setItem("AUTH_ID_ATTENDANCE", data?.id);
  localStorage.setItem("PORTAL_ATTENDANCE", data?.portal);
  localStorage.setItem("ROLES_ATTENDANCE", data?.roles);
};

export const processStringForAudiometry = (str) => {
  if (str) {
    const words = str.trim().split(/\s+/);

    if (words.length === 2) {
      if (str.length > 20) {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        words[1] = words[1].charAt(0).toUpperCase();
        return words.join(" ");
      }
    } else if (words.length === 3) {
      if (str.length > 20) {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        words[1] = words[1].charAt(0).toUpperCase();
        words[2] = words[2].charAt(0).toUpperCase() + words[2].slice(1);
        return words.join(" ");
      }
    } else if (words.length > 3) {
      if (str.length > 20) {
        const middleIndex = Math.floor(words.length / 2);
        const middleWord = words[middleIndex].charAt(0).toUpperCase();

        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        words[words.length - 1] =
          words[words.length - 1].charAt(0).toUpperCase() +
          words[words.length - 1].slice(1);

        return words[0] + " " + middleWord + " " + words[words.length - 1];
      }
    }
    return str;
  }
};

export const shortenName = (employeeName, employeeId, testName) => {
  if (employeeName && employeeId && testName) {
    if (testName === "pft") {
      const words = employeeName?.trim().split(/\s+/);
      return words[0] + " " + employeeId;
    } else if (testName === "audiometry") {
      return processStringForAudiometry(employeeName);
    } else if (testName === "pathology") {
      return employeeName + " " + employeeId;
    } else if (testName === "xray") {
      return employeeName + " " + employeeId;
    }
  }
};

export const checkValue = (a, b) => {
  return a === b;
};

export const genderList = [
  {
    value: "MALE",
    label: "MALE",
  },
  {
    value: "FEMALE",
    label: "FEMALE",
  },
  {
    value: "OTHER",
    label: "OTHER",
  },
  {
    value: "DONOTDISCLOSE",
    label: "DONOTDISCLOSE",
  },
];

export const getUrlExtension = (url) => {
  try {
    return url.match(/^https?:\/\/.*[\\\/][^\?#]*\.([a-zA-Z0-9]+)\??#?/)[1];
  } catch (ignored) {
    return "";
  }
};

export const getFileNameWithExt = (name) => {
  const lastDot = name.lastIndexOf(".");
  const fileName = name.substring(0, lastDot);
  const ext = name.substring(lastDot + 1);

  return ext;
};

export const getHourAndMinuteFromTime = (time) => {
  if (time) {
    let timeArray = time.split(":");
    return { hour: timeArray[0], minute: timeArray[1] };
  }

  return null;
};

export const replaceCharacter = (text, ch1, ch2) => {
  if (text) {
    text = text.replaceAll(ch1, ch2);
    return text?.toLowerCase();
  }

  return null;
};

export const checkInTimeValidation = (data) => {
  let {
    checkInTimeStamp,
    shiftStartTime,
    currentTime = dayjs().format("hh:mm A"),
  } = data;

  let result = { text: "", color: "#000", fontcolor: "#000" };

  checkInTimeStamp = checkInTimeStamp
    ? dayjs(getHourAndMinuteFromTime(checkInTimeStamp))
    : "";
  shiftStartTime = shiftStartTime
    ? dayjs(getHourAndMinuteFromTime(shiftStartTime))
    : "";

  console.log({ data, checkInTimeStamp, shiftStartTime, currentTime });

  if (checkInTimeStamp) {
    let timeDIff = checkInTimeStamp.diff(shiftStartTime, "minutes", true);
    console.log({ timeDIff });
    result = {
      text: checkInTimeStamp.format("hh:mm A"),
      color: timeDIff < 30 ? "#90EE90" : "#FF7F7F",
      fontcolor: timeDIff < 30 ? "green" : "red",
    };
  } else {
    result = {
      text: dayjs().isBefore(dayjs(shiftStartTime))
        ? "Check In Pending"
        : "Check In Delay",
      color: dayjs().isBefore(dayjs(shiftStartTime)) ? "orange" : "#FF7F7F",
      fontcolor: dayjs().isBefore(dayjs(shiftStartTime)) ? "orange" : "red",
    };
  }

  console.log({ result });

  return result;
};

const getHourAndMinuteFromTime1 = (time) => {
  if (time) {
    let timeArray = time.split(":");
    return { hour: timeArray[0], minute: timeArray[1] };
  }

  return null;
};
