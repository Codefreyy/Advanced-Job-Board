import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import { MyJobListingGrid } from "@/features/job-listing"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { loader } from "./loader"

export function MyJobListingPage() {
  const { jobListings } = useDeferredLoaderData<typeof loader>()
  return (
    <>
      <PageHeader
        btnSection={
          <Button variant="outline" className="whitespace-nowrap">
            <Link to="/jobs/new">Create Listing</Link>
          </Button>
        }
      >
        My Job Listing
      </PageHeader>
      <Suspense fallback="LOADING...">
        <Await resolve={jobListings}>
          {(jobListings) => <MyJobListingGrid jobListings={jobListings} />}
        </Await>
      </Suspense>
    </>
  )
}
