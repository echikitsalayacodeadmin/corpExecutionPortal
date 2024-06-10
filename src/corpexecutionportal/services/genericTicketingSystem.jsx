import { enqueueSnackbar } from "notistack";
import { BASE_URL } from "../../assets/constants";
import { getData, saveData } from "../assets/corpServices";

export const getAllTickets = async (date, userId, setTicketList) => {
  const url =
    BASE_URL + `org/getTickets/${date}?userId=${userId}&endDate=${date}`;

  const response = await getData(url);

  if (response.error) {
    console.warn({ error: response.error });
    setTicketList([]);
  } else {
    console.log({ success: response.data });
    setTicketList(response.data);
  }
};

export const raiseTicket = async (data, handleClose) => {
  const url = BASE_URL + `org/v2/raiseTicket`;

  const payload = {
    raisedBy: data.name,
    raisedById: data.userId,
    raisedByMobileNo: data.mobile,

    ticketType: data.selectedTicketType?.ticketType,
    date: new Date(data.date).toISOString().split("T")[0],

    corpId: data.company?.corpId,
    corpName: data.company?.orgName,

    ticketStatusStage: data.sessionType?.sessionName,
  };
  const res = await saveData(url, payload);
  if (res.error) {
    console.warn({ error: res.error });
    enqueueSnackbar("Failed to raise ticket!", {
      variant: "error",
    });
  } else {
    console.log({ success: res.data });
    enqueueSnackbar("Successfully raised ticket.", {
      variant: "success",
    });
    handleClose();
  }
};

export const getSessionTypeList = async (setSessionTypeList) => {
  const url = BASE_URL + `org/awarenessSessions/list`;

  const res = await getData(url);

  if (res.error) {
    console.warn({ error: res.error });
    setSessionTypeList([]);
  } else {
    console.log({ success: res.data });
    setSessionTypeList(res.data);
  }
};

export const getCompanyList = async (setCompanyList) => {
  const url = BASE_URL + `org/reporting/all`;

  const res = await getData(url);

  if (res.error) {
    console.warn({ error: res.error });
    setCompanyList([]);
  } else {
    console.log({ success: res.data });
    setCompanyList(res.data);
  }
};
