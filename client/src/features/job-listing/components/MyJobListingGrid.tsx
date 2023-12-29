import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { JobListing } from "../constants/types"
import { deleteListing } from "../services/jobs"
import DeleteJobListingDialog from "./DeleteJobListingDialog"
import JobListingCard from "./JobListingCard"
import JobListingGrid from "./JobListingGrid"

type MyJobListingGridProps = {
  jobListings: JobListing[]
}

const MyJobListingGrid = ({ jobListings }: MyJobListingGridProps) => {
  console.log("lsiting", jobListings)
  return (
    <JobListingGrid>
      {jobListings.map((job) => (
        <MyJobListingCard jobListing={job} key={job.id} />
      ))}
    </JobListingGrid>
  )
}

type MyJobListingCardProps = {
  jobListing: JobListing
}

function MyJobListingCard({ jobListing }: MyJobListingCardProps) {
  async function handleConfirm() {
    console.log(jobListing.id)
    await deleteListing(jobListing.id)
  }

  return (
    <JobListingCard
      job={jobListing}
      footerBtns={
        <>
          <DeleteJobListingDialog deleteListing={handleConfirm} />
          <Button variant="outline">
            <Link to={`/jobs/${jobListing.id}/edit`}>Edit</Link>
          </Button>
        </>
      }
    />
  )
}

export default MyJobListingGrid
