import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { loader } from "./Loader"
import { Suspense } from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import {
  JobListingSkeletonGrid,
  PublishedJobListingGrid,
} from "@/features/job-listing"

export function JobListings() {
  const { jobListingPromise } = useDeferredLoaderData<typeof loader>()
  return (
    <>
      <PageHeader
        btnSection={
          <Button variant="outline" asChild className="whitespace-nowrap">
            <Link to="/jobs/new">Create Listing</Link>
          </Button>
        }
      >
        Job Listings
      </PageHeader>
      <Suspense fallback={<JobListingSkeletonGrid amount={6} />}>
        <Await resolve={jobListingPromise}>
          {(jobListings) => {
            return <PublishedJobListingGrid jobListing={jobListings} />
          }}
        </Await>
      </Suspense>
    </>
  )
}
