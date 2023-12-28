import { JobListing } from "../constants/types"
import JobListingCard from "./JobListingCard"
import JobListingGrid from "./JobListingGrid"

type MyJobListingGridProps = {
  jobListings: JobListing[]
}

const MyJobListingGrid = ({ jobListings }: MyJobListingGridProps) => {
  return (
    <JobListingGrid>
      {jobListings.map((job) => (
        <MyJobListingCard key={job.id} jobListing={job} />
      ))}
    </JobListingGrid>
  )
}

type MyJobListingCardProps = {
  jobListing: JobListing
}

function MyJobListingCard({ jobListing }: MyJobListingCardProps) {
  return <JobListingCard job={jobListing} />
}

export default MyJobListingGrid
