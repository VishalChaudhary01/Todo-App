import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { SignupPage } from "../pages/SignupPage";
import { AddTaskPage } from "../pages/AddTaskPage";


export const router = createBrowserRouter([
     {
          path: "/",
          element: <App />,
          children: [
               {
                    path: "/",
                    element: <HomePage />
               },
               {
                    path: "/add-task",
                    element: <AddTaskPage />
               },
               {
                    path: "/signup",
                    element: <SignupPage />
               }
          ]
     }
]);