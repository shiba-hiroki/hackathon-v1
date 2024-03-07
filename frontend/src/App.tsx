import {
  
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { DefaultLayout } from "./ui/layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<DefaultLayout />}>
      <Route index />
      <Route path="/user" element={<p>pp</p>} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
