import { useLocalStorage } from "@/hooks/useLocalStorage"
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
  const [hideJobIds, setHideJobIds] = useLocalStorage(
    "hideIDs",
    JSON.stringify([])
  )

  const visibleJobListing = jobListing.filter((job) => {
    return !JSON.parse(hideJobIds).includes(job.id)
  })

  function handleJobHidden(id: string) {
    setHideJobIds((prevIds) => {
      return JSON.stringify([...JSON.parse(prevIds), id])
    })
  }

  if (!visibleJobListing || !visibleJobListing.length) {
    return <div className="text-slate-400">There is no jobs visible now.</div>
  }

  return (
    <JobListingGrid>
      {visibleJobListing?.map((job) => (
        <PublishedJobCard
          jobListing={job}
          key={job.id}
          onHideJobChange={handleJobHidden}
        />
      ))}
    </JobListingGrid>
  )
}

function PublishedJobCard({
  jobListing,
  onHideJobChange,
}: {
  jobListing: JobListing
  onHideJobChange: (jobId: string) => void
}) {
  return (
    <JobListingCard
      headerDetails={
        <div className="flex gap-4">
          <EyeOffIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => onHideJobChange(jobListing.id)}
          />
          <Heart className="w-5 h-5 cursor-pointer" />
        </div>
      }
      job={jobListing}
      footerBtns={<JobListingDetailDialog job={jobListing} />}
    ></JobListingCard>
  )
}

export default PublishedJobListingGrid
