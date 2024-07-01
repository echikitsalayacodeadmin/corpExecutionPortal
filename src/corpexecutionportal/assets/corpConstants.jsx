import HWI from "../../assets/images/ticketingSystem/aware seesion 1.png";
import CAI from "../../assets/images/ticketingSystem/Corp admin 1.png";
import CEI from "../../assets/images/ticketingSystem/corp employee 1.png";
import INTI from "../../assets/images/ticketingSystem/Internal 1.png";
import PHAI from "../../assets/images/ticketingSystem/pharmacy 1.png";
import PEI from "../../assets/images/ticketingSystem/pre employment 1.png";
import SRI from "../../assets/images/ticketingSystem/service req 1.png";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RecommendIcon from "@mui/icons-material/Recommend";

export const CorpName = "TEST";

export const FILE_TYPE = [
  { value: "XRAY", label: "Xray" },
  { value: "AUDIOMETRY", label: "Audiometry" },
  { value: "BLOODTEST", label: "Blood Test" },
  { value: "PFT", label: "PFT" },
  { value: "ECG", label: "Ecg" },
];

export const MACHINE_NUMBER = [
  { value: "machine1", label: "Machine 1" },
  { value: "machine2", label: "Machine 2" },
  { value: "machine3", label: "Machine 3" },
  { value: "machine4", label: "Machine 4" },
  { value: "machine5", label: "Machine 5" },
];

export const DATASHEET_SEQ = [
  "createGoogleSheet",
  "pasteLink",
  "tabHrData",
  "uploadHrList",
  "tabSmdToggle",
  "copySmdToggle",
  "tabDefectExecution",
  "copyDefectExecution",
  "tabSmdUpload",
  "copySmdUpload",
  "tabDefectUpload",
  "copyDefectUpload",
  "tabSmdFinal",
  "copySmdFinal",
  "tabDefectFinal",
  "copyDefectFinal",
  "tabAnchorSequence",
  "tabSnop",
];

export const DISPATCH_SEQ = [
  "boxing",
  "scan",
  "dowloadIndex",
  "printIndex",
  "pasteIndex",
  "errorReport",
  "generateSnopMail",
  "sendMail",
  "createInvoice",
  "sendDelivery",
];

export const UPLOAD_SEQ = [
  "pftReport",
  "audiometryReport",
  "bloodTestReport",
  "ecgReport",
  "xrayReport",
];
export const REPORTING = [
  "anchorReport",
  "uploadAnchorSeq",
  "mpAnchorSeq",
  "mpNonAnchorSeq",
  "form21",
  "qcManualReport",
  "qcTech",
  "qcTechReport",
];

export const CORPORATE_SERVICES = [
  "Digitisation of Health records",
  "Annual Health camps",
  "Occupational health centre management",
  "Pre Employment health tests",
  "Care assistance for surgeries and emergencies",
  "Group/Individual Insurence",
  "CSR",
  "Health awareness sessions",
  "Ambulance services",
];

export const StatusList = [
  {
    id: 0,
    label: "All",
    value: "ALL",
  },
  {
    id: 1,
    label: "Pending for confirmation",
    value: "TICKET_RAISED",
    color: "#e2435c",
    icon: <NotificationsIcon fontSize="10" sx={{ color: "#fff" }} />,
  },
  {
    id: 2,
    label: "Booking Confirmed",
    value: "BOOKING_CONFIRMED",
    color: "#eab676",
    icon: <RecommendIcon fontSize="10" sx={{ color: "#fff" }} />,
  },
  {
    id: 3,
    label: "Completed",
    value: "COMPLETED",
    color: "#3caf4a",
    icon: <TaskAltIcon fontSize="10" sx={{ color: "#fff" }} />,
  },
];

export const StatusListForNonFilter = [
  {
    id: 1,
    label: "Pending for confirmation",
    value: "TICKET_RAISED",
    color: "#e2435c",
    icon: <NotificationsIcon fontSize="10" sx={{ color: "#fff" }} />,
  },
  {
    id: 2,
    label: "Booking Confirmed",
    value: "BOOKING_CONFIRMED",
    color: "#eab676",
    icon: <RecommendIcon fontSize="10" sx={{ color: "#fff" }} />,
  },
  {
    id: 3,
    label: "Completed",
    value: "COMPLETED",
    color: "#3caf4a",
    icon: <TaskAltIcon fontSize="10" sx={{ color: "#fff" }} />,
  },
];

export const TicketCategoryList = [
  {
    id: 1,
    title: "Awareness Session",
    label: "Awareness Session",
    imageUrl: HWI,
    ticketType: "HEALTH_AWARENESS",
  },
  {
    id: 2,
    title: "Pre Employment",
    label: "Pre Employment",
    imageUrl: PEI,
    ticketType: "PRE_EMPLOYMENT",
  },
  {
    id: 3,
    title: "Emergency",
    label: "Emergency",
    imageUrl: CAI,
    ticketType: "EMERGENCY",
  },
  {
    id: 4,
    title: "New Service Inquiry",
    label: "New Service Inquiry",
    imageUrl: CEI,
    ticketType: "NEW_SERVICE_INQUIRY",
  },
  {
    id: 5,
    title: "Query on active/completed service",
    label: "Query on active/completed service",
    imageUrl: INTI,
    ticketType: "SERVICE_ISSUE",
  },

  {
    id: 7,
    title: "Tech Internal",
    label: "Tech Internal",
    imageUrl: PHAI,
    ticketType: "TECH_INTERNAL",
  },

  {
    id: 7,
    title: "Ops-Tech",
    label: "Ops-Tech",
    imageUrl: PHAI,
    ticketType: "OPS_TECH",
  },

  {
    id: 7,
    title: "Sales-ops",
    label: "Sales-ops",
    imageUrl: PHAI,
    ticketType: "SALES_OPS",
  },
];

export const productList = [
  {
    id: 1,
    label: "Client Portal",
    value: "Client Portal",
  },
  {
    id: 1,
    label: "Mobile app",
    value: "Mobile app",
  },

  {
    id: 1,
    label: "Camp portal",
    value: "Camp portal",
  },

  {
    id: 1,
    label: "Feedback portal",
    value: "Feedback portal",
  },

  {
    id: 1,
    label: "Attendance portal",
    value: "Attendance portal",
  },

  {
    id: 1,
    label: "Sales",
    value: "Sales",
  },

  {
    id: 1,
    label: "Reporting & Delivery",
    value: "Reporting & Delivery",
  },

  {
    id: 1,
    label: "MIS",
    value: "MIS",
  },
  {
    id: 1,
    label: "Tickets",
    value: "Tickets",
  },

  {
    id: 1,
    label: "Tech Reporting",
    value: "Tech Reporting",
  },
  {
    id: 1,
    label: "Clinic",
    value: "Clinic",
  },
  {
    id: 1,
    label: "Organalysis portal",
    value: "Organalysis portal",
  },
];

export const backendOwner = [
  {
    id: 1,
    label: "Vardhan",
    value: "Vardhan",
  },
  {
    id: 1,
    label: "Anurag",
    value: "Anurag",
  },

  {
    id: 1,
    label: "Akash",
    value: "Akash",
  },
  {
    id: 1,
    label: "Sabarinathan",
    value: "Sabarinathan",
  },
];

export const frontendOwner = [
  {
    id: 1,
    label: "Akash",
    value: "Akash",
  },
  {
    id: 1,
    label: "Ayush",
    value: "Ayush",
  },
];

export const ServiceList = [
  {
    id: 1,
    label: "Periodic Health Checkup",
    value: "Periodic Health Checkup",
  },
  {
    id: 1,
    label: "Pre-employment Check Up",
    value: "Pre-employment Check Up",
  },
  {
    id: 1,
    label: "Ambulance Service",
    value: "Ambulance Service",
  },
  {
    id: 1,
    label: "Emergency tie up",
    value: "Emergency tie up",
  },
  {
    id: 1,
    label: "Staff/Doctors for OHC",
    value: "Staff/Doctors for OHC",
  },
  {
    id: 1,
    label: "OHC design & construction",
    value: "OHC design & construction",
  },
  {
    id: 1,
    label: "Medicine purchase",
    value: "Medicine purchase",
  },
  {
    id: 1,
    label: "Insurance",
    value: "Insurance",
  },
  {
    id: 1,
    label: "Employee Wellness Program",
    value: "Employee Wellness Program",
  },
  {
    id: 1,
    label: "Corporate Social Responsibility",
    value: "Corporate Social Responsibility",
  },
  {
    id: 1,
    label: "First Aid Training",
    value: "First Aid Training",
  },
  {
    id: 1,
    label: "Awareness Sessions",
    value: "Awareness Sessions",
  },
];
