import { Navigate, RouteObject } from "react-router-dom"
import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { AuthLayout, LoginForm, SignupForm } from "./features/authentication"

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
