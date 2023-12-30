import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { Navigate, RouteObject } from "react-router-dom"
import { AuthLayout, LoginForm, SignupForm } from "./features/authentication"
import { editJobListingRoute } from "./pages/jobs/edit"
import { myJobListingsRoute } from "./pages/jobs/my-listings"
import { NewJobListingPage } from "./pages/jobs/new/NewJobListingPage"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/tasks" replace />,
          },
          {
            path: "tasks",
            children: [
              { index: true, element: <TaskListPage /> },
              { path: "new", element: <NewTaskPage /> },
            ],
          },
          {
            path: "jobs",
            children: [
              { path: "my-listings", ...myJobListingsRoute },
              {
                path: "new",
                element: <NewJobListingPage />,
              },
              {
                path: ":id/edit",
                ...editJobListingRoute,
              },
            ],
          },
          {
            element: <AuthLayout />,
            children: [
              {
                path: "login",
                children: [
                  {
                    index: true,
                    element: <LoginForm />,
                  },
                ],
              },
              {
                path: "signup",
                children: [
                  {
                    index: true,
                    element: <SignupForm />,
                  },
                ],
              },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
