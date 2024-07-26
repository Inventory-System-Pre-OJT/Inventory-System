import "./App.css";
import { Toaster } from "react-hot-toast";
import { LandingLayout } from "./layout";
import { Login, Inventory, ProductAdd } from "./pages";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const roles = {
  USER: "user",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
};

const client = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/add" element={<ProductAdd />} />
      </Route>
    </>
  )
);
function App() {
  return (
    <>
        <QueryClientProvider client={client}>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </QueryClientProvider>
    </>
  );
}

export default App;