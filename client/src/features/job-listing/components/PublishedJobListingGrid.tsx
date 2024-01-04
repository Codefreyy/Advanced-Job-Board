import { EyeOffIcon, Heart } from "lucide-react"
import { JobListing } from "../constants/types"
import JobListingCard from "./JobListingCard"
import JobListingDetailDialog from "./JobListingDetailDialog"
import JobListingGrid from "./JobListingGrid"

const PublishedJobListingGrid = ({
  jobListing,
}: {
  jobListing: JobListing[]
}) => {
  console.log("job", jobListing)
  return (
    <JobListingGrid>
      {jobListing?.map((job) => (
        <PublishedJobCard jobListing={job} key={job.id} />
      ))}
    </JobListingGrid>
  )
}

function PublishedJobCard({ jobListing }: { jobListing: JobListing }) {
  return (
    <JobListingCard
      headerDetails={
        <div className="flex gap-4">
          <EyeOffIcon className="w-5 h-5 cursor-pointer" />
          <Heart className="w-5 h-5 cursor-pointer" />
        </div>
      }
      job={jobListing}
      footerBtns={<JobListingDetailDialog job={jobListing} />}
    ></JobListingCard>
  )
}

export default PublishedJobListingGrid
