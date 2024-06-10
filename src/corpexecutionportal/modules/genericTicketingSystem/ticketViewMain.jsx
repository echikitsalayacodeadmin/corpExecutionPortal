import { Fragment } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import TicketView from "./comps/ticketView";
import { useLocation, useParams } from "react-router-dom";

const TicketViewMain = () => {
  const { ticketId } = useParams();
  const { state } = useLocation();
  console.log({ ticketId, state });

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Tickets View">
        <TicketView data={state} />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default TicketViewMain;
