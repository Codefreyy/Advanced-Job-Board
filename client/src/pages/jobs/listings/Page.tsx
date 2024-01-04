import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import {
  JobListingSkeletonGrid,
  PublishedJobListingGrid,
} from "@/features/job-listing"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loader } from "./Loader"

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
