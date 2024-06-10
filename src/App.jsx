import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./error-page";
import { Fragment, useContext, useEffect, useState } from "react";
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
import ReportingAuthLayout from "./reportingportal/global/templates/reportingAuthLayout";
import SelectCorp from "./reportingportal/pages/selectCorp";
import CreateCorpCredentials from "./reportingportal/pages/createCorpCredentials";
import Assignkam from "./reportingportal/pages/assignkam";
import BulkUploadReporting from "./reportingportal/pages/bulkUploadReporting";
import ManagePermissionsReporting from "./reportingportal/pages/managePermissionsReporting";
import MainReporting from "./reportingportal/pages/mainReporting";
import MasterDataReporting from "./reportingportal/pages/masterDataReporting";
import SequenceReporting from "./reportingportal/pages/sequenceReporting";
import PdfMasterDownload from "./reportingportal/pages/pdfMasterDownload";
import PdfMasterRequest from "./reportingportal/pages/pdfMasterRequest";
import UploadReportCloud from "./reportingportal/pages/uploadReportCloud";
import RefreshDataIndex from "./reportingportal/pages/refreshDataIndex";
import HealthRegisterIndex from "./reportingportal/pages/healthRegisterIndex";
import ReportAnalysis from "./reportingportal/pages/reportAnalysis";
import UploadReport from "./reportingportal/pages/uploadReport";
import UploadReportMain from "./reportingportal/modules/uploadReport/uploadReportMain";
import Form21Reporting from "./reportingportal/pages/form21Reporting";
import LogoutReporting from "./reportingportal/pages/logoutReporting";
import OrgAnalysisRootLayout from "./organalysis/global/templates/orgAnalysisRootLayout";
import OrgAnalysisAuthLayout from "./organalysis/global/templates/orgAnalysisAuthLayout";
import SelectCorpOrgAnalysis from "./organalysis/pages/selectCorpOrgAnalysis";
import HomeIndexOrgAnalysis from "./organalysis/pages/homeIndexOrgAnalysis";
import LoginReporting from "./reportingportal/pages/loginReporting";
import LoginOrgAnalysis from "./organalysis/pages/loginOrgAnalysis";
import ReportingRootLayout from "./reportingportal/global/templates/reportingRootLayout";
import GenericTicketingSystemIndex from "./corpexecutionportal/pages/genericTicketingSystemIndex";
import EngagementCorp from "./corpexecutionportal/pages/engagementCorp";
import SessionInfoCorp from "./corpexecutionportal/pages/sessionInfoCorp";
import CalenderInfoCorp from "./corpexecutionportal/pages/calenderInfoCorp";
import TicketViewIndex from "./corpexecutionportal/pages/ticketViewIndex";

function App() {
  const [corpName, setCorpName] = useState(
    localStorage.getItem("CORP_NAME_SALES_OPS") || ""
  );
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Fragment>
        <Route
          path="/"
          errorElement={<ErrorPage />}
          element={<GlobalRootLayout />}
        >
          <Route index element={<Landing />} />
          <Route path="corp/login" element={<LoginCorp />} />
          <Route path="reporting/login" element={<LoginReporting />} />
          <Route path="org-analysis/login" element={<LoginOrgAnalysis />} />
        </Route>

        <Route
          path="/corp"
          errorElement={<ErrorPage />}
          element={<CorpRootLayout />}
        >
          <Route index element={<HomeCorp />} />
          <Route element={<CorpAuthLayout />}>
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
            <Route path="tickets" element={<GenericTicketingSystemIndex />} />
            <Route path="ticketview" element={<TicketViewIndex />} />

            <Route path="logout" element={<LogoutCorp />} />

            <Route path="analysis" element={<QRAnalysisIndex />} />

            <Route
              path="employeedetail/:empid"
              element={<EmployeeDetailIndex />}
            />

            {/* Update location Corpsales */}
            <Route path="updatelocation" element={<UpdateLocation />} />
            {/* Engagement */}
            <Route path="engagement" element={<EngagementCorp />} />

            <Route
              path="engagement/sessioninfo"
              element={<SessionInfoCorp />}
            />
            <Route
              path="engagement/calendarinfo"
              element={<CalenderInfoCorp />}
            />
          </Route>
        </Route>

        <Route
          path="/reporting"
          errorElement={<ErrorPage />}
          element={<ReportingRootLayout />}
        >
          <Route element={<ReportingAuthLayout />}>
            <Route path="select-corp" element={<SelectCorp />} />
            <Route
              path="create-corp-credentials"
              element={<CreateCorpCredentials />}
            />
            <Route path="assign-kam" element={<Assignkam />} />
            <Route path="bulkupload" element={<BulkUploadReporting />} />
            <Route
              path="managepermissions"
              element={<ManagePermissionsReporting />}
            />
            <Route path="reporting-main" element={<MainReporting />}>
              <Route path="" element={<MasterDataReporting />} />
              <Route path="master-data" element={<MasterDataReporting />} />
              <Route path="upload-sequence" element={<SequenceReporting />} />
              <Route
                path="master-pdf-download"
                element={<PdfMasterDownload />}
              />
              <Route path="master-pdf-request" element={<PdfMasterRequest />} />
              <Route
                path="upload-reports-cloud"
                element={<UploadReportCloud />}
              />
              <Route path="refresh-data" element={<RefreshDataIndex />} />
              <Route path="health-register" element={<HealthRegisterIndex />} />
              <Route path="report-analysis" element={<ReportAnalysis />} />

              <Route path="upload-reports" element={<UploadReport />}>
                <Route path="" element={<UploadReportMain />} />
                <Route path="form21" element={<Form21Reporting />} />
              </Route>
            </Route>
            <Route path="logout" element={<LogoutReporting />} />
          </Route>
        </Route>

        <Route
          path="/org-analysis"
          errorElement={<ErrorPage />}
          element={<OrgAnalysisRootLayout />}
        >
          <Route element={<OrgAnalysisAuthLayout />}>
            <Route path="select-corp" element={<SelectCorpOrgAnalysis />} />
            <Route path="home" element={<HomeIndexOrgAnalysis />} />
          </Route>
        </Route>
      </Fragment>
    )
  );

  useEffect(() => {
    localStorage.setItem("CORP_NAME_SALES_OPS", corpName);
  }, [corpName]);

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
