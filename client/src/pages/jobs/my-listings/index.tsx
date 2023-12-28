import { loader } from "./loader"
import { MyJobListingPage } from "./Page"
loader

export const myJobListingsRoute = {
  loader,
  element: <MyJobListingPage />,
}
