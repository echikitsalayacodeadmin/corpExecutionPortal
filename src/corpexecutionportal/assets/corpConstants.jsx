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
    title: "Corp Admin",
    label: "Corp Admin",
    imageUrl: CAI,
    ticketType: "CORP",
  },
  {
    id: 4,
    title: "Corp Employee",
    label: "Corp Employee",
    imageUrl: CEI,
    ticketType: "CORP_CONSUMABLES",
  },
  {
    id: 5,
    title: "Internal",
    label: "Internal",
    imageUrl: INTI,
    ticketType: "COUNSELLING_CAMP",
  },
  {
    id: 6,
    title: "Service Request",
    label: "Service Request",
    imageUrl: SRI,
    ticketType: "OUTSTATION_SERVICE",
  },
  {
    id: 7,
    title: "Pharmacy",
    label: "Pharmacy",
    imageUrl: PHAI,
    ticketType: "PHARMACY",
  },
];
