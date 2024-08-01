import { Fragment } from "react";
import { BASE_URL } from "../../../../assets/constants";
import { deleteData } from "../../../assets/corpServices";
import { enqueueSnackbar } from "notistack";
import { Button } from "@mui/material";

const DeleteInvoiceMain = ({ invoiceId, setIsDeleteInvoice }) => {
  const deleteInvoiceHandler = async () => {
    const url = BASE_URL + `invoice/deleteInvoice/${invoiceId}`;

    const res = await deleteData(url);

    if (res.error) {
      enqueueSnackbar("Failed to delete invoice!", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Successfully deleted invoice.", {
        variant: "success",
      });
    }
  };
  return (
    <Fragment>
      <Button
        size="small"
        variant="contained"
        onClick={() => setIsDeleteInvoice(true)}
        color="error"
        sx={{ background: "#d32f2f" }}
      >
        Delete Invoice
      </Button>
    </Fragment>
  );
};

export default DeleteInvoiceMain;
