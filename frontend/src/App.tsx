import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { appURL } from "./config/url";
import { DetailAttendance } from "./feature/attendance/detailPage";
import { Login } from "./feature/auth/page";
import { User } from "./feature/user/page";
import { DefaultLayout } from "./ui/layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Login />} />
      <Route element={<DefaultLayout />}>
        <Route path={appURL.user} element={<User />} />
        <Route path={appURL.shift} element={<p>attendance</p>} />
        <Route path={appURL.attendance} element={<p>shift</p>} />
        <Route path={appURL.detailAttendance} element={<DetailAttendance />} />
      </Route>
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
