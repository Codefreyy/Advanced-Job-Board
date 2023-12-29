import { loader } from "./loader"
import { MyJobListingsPage } from "./Page"
loader

export const myJobListingsRoute = {
  loader,
  element: <MyJobListingsPage />,
}
