import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { loader } from "./loader"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import {
  JobListingSkeletonGrid,
  MyJobListingGrid,
} from "@/features/job-listing"

export function MyJobListingsPage() {
  const { jobListingsPromise } = useDeferredLoaderData<typeof loader>()

  return (
    <>
      <PageHeader
        btnSection={
          <Button variant="outline" asChild className="whitespace-nowrap">
            <Link to="/jobs/new">Create Listing</Link>
          </Button>
        }
      >
        My Job Listings
      </PageHeader>
      <Suspense fallback={<JobListingSkeletonGrid amount={6} />}>
        <Await resolve={jobListingsPromise}>
          {(jobListings) => {
            return <MyJobListingGrid jobListings={jobListings} />
          }}
        </Await>
      </Suspense>
    </>
  )
}
