import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { loader } from "./loader"

export function MyJobListingPage() {
  const { jobListings } = useDeferredLoaderData<typeof loader>()
  return (
    <PageHeader
      btnSection={
        <Button variant="outline">
          <Link to="/jobs/new">Create Listing</Link>
        </Button>
      }
    >
      <Suspense fallback="LOADING...">
        <Await resolve={jobListings}>
          {(jobListings) => jobListings.length}
        </Await>
      </Suspense>
    </PageHeader>
  )
}
