import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./error-page";
import { Fragment, useState } from "react";
import Landing from "./landing/routes/landing";
import CorpRootLayout from "./corpexecutionportal/global/templates/corpRootLayout";
import CorpAuthLayout from "./corpexecutionportal/global/templates/corpAuthLayout";
import GlobalRootLayout from "./assets/globalLayouts/globalRootLayout";
import LoginCorp from "./corpexecutionportal/pages/loginCorp";
import HomeCorp from "./corpexecutionportal/pages/homeCorp";
import LogoutCorp from "./corpexecutionportal/pages/logoutCorp";
import DeliveryOrchestratorCorp from "./corpexecutionportal/pages/deliveryOrchestratorCorp";
import StatusSummaryCorp from "./corpexecutionportal/pages/statusSummaryCorp";
import DataSheetCorp from "./corpexecutionportal/pages/dataSheetCorp";
import UploadCorp from "./corpexecutionportal/pages/uploadCorp";
import ReportingCorp from "./corpexecutionportal/pages/reportingCorp";
import DispatchCorp from "./corpexecutionportal/pages/dispatchCorp";
import SalesVisitCorp from "./corpexecutionportal/pages/salesVisitCorp";
import QuotationCorp from "./corpexecutionportal/pages/quotationCorp";
import OrderConfirmedCorp from "./corpexecutionportal/pages/orderConfirmedCorp";
import ExecutionPlanningCorp from "./corpexecutionportal/pages/executionPlanningCorp";
import AccountReceivableCorp from "./corpexecutionportal/pages/accountReceivableCorp";
import SalesVisitDetailCorp from "./corpexecutionportal/pages/salesVisitDetailCorp";
import AddNewVisitCorp from "./corpexecutionportal/pages/addNewVisitCorp";
import EditVisitCorp from "./corpexecutionportal/pages/editVisitCorp";
import RegisterCorp from "./corpexecutionportal/pages/registerCorp";
import QuotationCreate from "./corpexecutionportal/pages/quotationCreate";
import QuotationUpdate from "./corpexecutionportal/pages/quotationUpdate";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        <Route
          path="/"
          errorElement={<ErrorPage />}
          element={<GlobalRootLayout />}
        >
          <Route index element={<Landing />} />
        </Route>

        <Route
          path="/corp"
          errorElement={<ErrorPage />}
          element={<CorpRootLayout />}
        >
          <Route index element={<HomeCorp />} />
          <Route element={<CorpAuthLayout />}>
            <Route path="login" element={<LoginCorp />} />
            <Route path="home" element={<HomeCorp />} />
            <Route
              path="deliveryorchestrator"
              element={<DeliveryOrchestratorCorp />}
            />
            <Route
              path="deliveryorchestrator/statussummary/:itemId"
              element={<StatusSummaryCorp />}
            />
            <Route
              path="deliveryorchestrator/datasheet/:itemId"
              element={<DataSheetCorp />}
            />
            <Route
              path="deliveryorchestrator/upload/:itemId"
              element={<UploadCorp />}
            />
            <Route
              path="deliveryorchestrator/reporting/:itemId"
              element={<ReportingCorp />}
            />
            <Route
              path="deliveryorchestrator/dispatch/:itemId"
              element={<DispatchCorp />}
            />

            <Route path="salesvisit" element={<SalesVisitCorp />} />
            <Route
              path="salesvisit/detail/:itemId"
              element={<SalesVisitDetailCorp />}
            />
            <Route path="registercorp" element={<RegisterCorp />} />
            <Route path="addnewvisit/:itemId" element={<AddNewVisitCorp />} />
            <Route path="editvisit/:itemId" element={<EditVisitCorp />} />

            <Route path="quotation" element={<QuotationCorp />} />
            <Route
              path="quotation/quotationcreate/:itemId"
              element={<QuotationCreate />}
            />
            <Route
              path="quotation/quotationupdate/:itemId"
              element={<QuotationUpdate />}
            />

            <Route path="orderconfirmed" element={<OrderConfirmedCorp />} />
            <Route
              path="executionplanning"
              element={<ExecutionPlanningCorp />}
            />
            <Route
              path="accountreceivable"
              element={<AccountReceivableCorp />}
            />
            <Route path="logout" element={<LogoutCorp />} />
          </Route>
        </Route>
      </Fragment>
    )
  );

  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }

  return <RouterProvider router={router} />;
}

export default App;
