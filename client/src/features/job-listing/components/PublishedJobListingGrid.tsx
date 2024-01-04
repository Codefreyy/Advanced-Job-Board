import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
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

  const { toast } = useToast()

  function handleJobHidden(id: string, jobTitle: string) {
    setHideJobIds((prevIds) => {
      return JSON.stringify([...JSON.parse(prevIds), id])
    })
    toast({
      title: "Job hidden",
      description: `${jobTitle} will no longer be shown`,
      action: (
        <ToastAction
          onClick={() => {
            setHideJobIds((prevIds) => {
              return JSON.stringify(
                [...JSON.parse(prevIds)].filter((jobId) => jobId != id)
              )
            })
          }}
          altText="Undo"
        >
          Undo
        </ToastAction>
      ),
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
  onHideJobChange: (jobId: string, jobTitle: string) => void
}) {
  return (
    <JobListingCard
      headerDetails={
        <div className="flex gap-4">
          <EyeOffIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => onHideJobChange(jobListing.id, jobListing.title)}
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
