import { Fragment } from "react";
import MainPageLayoutWithBack from "../../global/templates/mainPageLayoutWithBack";
import TicketView from "./comps/ticketView";

const TicketViewMain = () => {
  return (
    <Fragment>
      <MainPageLayoutWithBack title="Tickets View">
        <TicketView />
      </MainPageLayoutWithBack>
    </Fragment>
  );
};

export default TicketViewMain;
