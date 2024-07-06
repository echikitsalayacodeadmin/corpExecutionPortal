import { Fragment } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import { useLocation, useParams } from "react-router-dom";
import ViewTicketMainComp from "./viewTicket/viewTicketMainComp";

const TicketViewMain = () => {
  const { ticketId } = useParams();
  const { state } = useLocation();
  console.log({ ticketId, state });

  return (
    <Fragment>
      <MainPageLayoutWithBack title="Tickets View">
        <ViewTicketMainComp data={state} />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default TicketViewMain;
