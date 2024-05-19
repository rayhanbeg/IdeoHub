import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Registration";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import ErrorPage from "../pages/ErrorPage";
import MyPostedJobs from "../pages/MyPostedJobs";
import UpdateJob from "../pages/UpdateJob";
import PrivateRoutes from "./PrivateRoutes";
import MyBids from "../pages/MyBids";
import BidRequests from "../pages/BidRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/job/:id",
        element: (
        <PrivateRoutes>
          <JobDetails />
        </PrivateRoutes>
        ),
        loader: ({ params }) => fetch(`http://localhost:5000/job/${params.id}`)
      },
      {
        path: "/addJob",
        element: (
          <PrivateRoutes>
            <AddJob />
          </PrivateRoutes>
        ),
      },
      {
        path: "/myPosted",
        element: (
          <PrivateRoutes>
            <MyPostedJobs />
          </PrivateRoutes>
        ),
      },
      {
        path: "/updateJob/:id",
        element: (
          <PrivateRoutes>
            <UpdateJob />
          </PrivateRoutes>
        ),

        loader: ({ params }) => fetch(`http://localhost:5000/job/${params.id}`),
      },
      {
        path: "/myBids",
        element: (
          <PrivateRoutes>
            <MyBids />
          </PrivateRoutes>
        ),

        // loader: ({ params }) => fetch(`http://localhost:5000/job/${params.id}`),
      },
      {
        path: "/bidRequests",
        element: (
          <PrivateRoutes>
            <BidRequests />
          </PrivateRoutes>
        ),

        // loader: ({ params }) => fetch(`http://localhost:5000/job/${params.id}`),
      },
    ],
  },
]);

export default router;
