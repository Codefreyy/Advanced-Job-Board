import { PageHeader } from "@/components/ui/PageHeader"
import { createNewJobListing, JobListingForm } from "@/features/job-listing"
import { useNavigate } from "react-router-dom"

export function NewJobListingPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHeader>New Listing</PageHeader>
      <JobListingForm
        onSubmit={async (values) => {
          await createNewJobListing(values)
          navigate("/jobs/my-listings")
        }}
      />
    </>
  )
}
