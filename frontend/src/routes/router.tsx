import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { SignupPage } from "../pages/SignupPage";
import { SigninPage } from "../pages/SigninPage";
import { AddTaskPage } from "../pages/AddTaskPage";
import { PrivateRoute } from "../components/PrivateRoute";


export const router = createBrowserRouter(
     [
          {
               path: "/",
               element: <App />,
               children: [
                    {
                         path: "/",
                         element: <PrivateRoute />,
                         children: [
                              {
                                   path: "/",
                                   element: <HomePage />
                              },
                              {
                                   path: "/add-task",
                                   element: <AddTaskPage />
                              },
                         ]

                    },
                    {
                         path: "/signin",
                         element: <SigninPage />
                    },
                    {
                         path: "/signup",
                         element: <SignupPage />
                    },
                    {
                         path: '*',
                         element: <p className="font-blod 2xl">404 Error - Nothing here...</p>
                    }
               ]
          }
     ]
);