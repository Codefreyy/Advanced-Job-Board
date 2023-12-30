import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { PageHeader } from "@/components/ui/PageHeader"
import { editJobListing, JobListingForm } from "@/features/job-listing"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { loader } from "./loader"

function DeleteJobListingPage() {
  const navigate = useNavigate()
  const { jobListingsPromise, id } = useDeferredLoaderData<typeof loader>()

  return (
    <>
      <PageHeader>Edit Listing</PageHeader>
      <Suspense fallback={<LoadingSpinner className="w-8 h-8" />}>
        <Await resolve={jobListingsPromise}>
          {(jobListings) => (
            <JobListingForm
              initialJobListing={jobListings[0]}
              onSubmit={async (jobListingValues) => {
                if (id) {
                  await editJobListing(id, jobListingValues)
                  navigate("/jobs/my-listings")
                }
              }}
            />
          )}
        </Await>
      </Suspense>
    </>
  )
}

export { DeleteJobListingPage }
