import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./error-page";
import { Fragment, useContext, useState } from "react";
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
import RegisterCorp from "./corpexecutionportal/pages/registerCorp";
import QuotationCreate from "./corpexecutionportal/pages/quotationCreate";
import QuotationUpdate from "./corpexecutionportal/pages/quotationUpdate";
import QuotationListCorp from "./corpexecutionportal/pages/quotationListCorp";
import AddQuotationDataCorp from "./corpexecutionportal/pages/addQuotationDataCorp";
import OrderConfirmedDetailCorp from "./corpexecutionportal/pages/orderConfirmedDetailCorp";
import ServiceFormCorp from "./corpexecutionportal/pages/serviceFormCorp";
import ServiceLogsCorp from "./corpexecutionportal/pages/serviceLogsCorp";
import QRAnalysisIndex from "./corpexecutionportal/pages/qrAnalysisIndex";
import EmployeeDetailIndex from "./corpexecutionportal/pages/employeeDetailIndex";
import EditCorpDetail from "./corpexecutionportal/pages/editCorpDetail";
import MisCorp from "./corpexecutionportal/pages/misCorp";
import { CorpNameContext } from "./corpexecutionportal/global/context/usercontext";
import UpdateLocation from "./corpexecutionportal/pages/updateLocation";

function App() {
  const [corpName, setCorpName] = useState("");
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

            {/* Delivery Orchestrator */}

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

            {/* Sales Visit */}

            <Route path="salesvisit" element={<SalesVisitCorp />} />
            <Route
              path="salesvisit/detail/:itemId"
              element={<SalesVisitDetailCorp />}
            />
            <Route
              path="salesvisit/serviceform/:itemId"
              element={<ServiceFormCorp />}
            />
            <Route
              path="salesvisit/serviceslogs/:itemId"
              element={<ServiceLogsCorp />}
            />

            <Route
              path="salesvisit/quotationlist/:itemId"
              element={<QuotationListCorp />}
            />

            {/* Register Corp */}

            <Route path="registercorp" element={<RegisterCorp />} />

            {/* Add Visit in Corp */}
            <Route path="addnewvisit/:itemId" element={<AddNewVisitCorp />} />

            {/* Edit Corp Detail */}
            <Route path="editcorpdetail/:itemId" element={<EditCorpDetail />} />

            {/* Quotation */}
            <Route path="quotation" element={<QuotationCorp />} />
            <Route
              path="quotation/quotationcreate/:itemId"
              element={<QuotationCreate />}
            />
            <Route
              path="quotation/quotationupdate/:itemId"
              element={<QuotationUpdate />}
            />
            <Route
              path="quotation/addquotationdata"
              element={<AddQuotationDataCorp />}
            />

            {/* Order Confirmed */}
            <Route path="orderconfirmed" element={<OrderConfirmedCorp />} />
            <Route
              path="orderconfirmed/detailed/:itemId"
              element={<OrderConfirmedDetailCorp />}
            />

            {/* Execution Planning */}
            <Route
              path="executionplanning"
              element={<ExecutionPlanningCorp />}
            />

            {/* Account Receivable  */}
            <Route
              path="accountreceivable"
              element={<AccountReceivableCorp />}
            />

            {/* Mis */}

            <Route path="mis" element={<MisCorp />} />

            <Route path="logout" element={<LogoutCorp />} />

            <Route path="analysis" element={<QRAnalysisIndex />} />

            <Route
              path="employeedetail/:empid"
              element={<EmployeeDetailIndex />}
            />

            {/* Update location Corpsales */}
            <Route path="updatelocation" element={<UpdateLocation />} />
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

  return (
    <CorpNameContext.Provider value={{ corpName, setCorpName }}>
      <RouterProvider router={router} />
    </CorpNameContext.Provider>
  );
}

export default App;
