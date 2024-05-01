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
