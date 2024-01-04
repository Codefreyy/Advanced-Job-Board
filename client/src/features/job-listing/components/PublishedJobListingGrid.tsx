import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { EyeOffIcon, Heart } from "lucide-react"
import { JobListing } from "../constants/types"
import JobListingCard from "./JobListingCard"
import JobListingDetailDialog from "./JobListingDetailDialog"
import JobListingGrid from "./JobListingGrid"

// type jobListingFilter = {
//   title: string
//   location: string
//   type: string
//   salary: number
//   experienceLevel: (typeof JOB_LISTING_EXPERIENCE_LEVELS)[number]
// }

const PublishedJobListingGrid = ({
  jobListing,
}: {
  jobListing: JobListing[]
}) => {
  const [hideJobIds, setHideJobIds] = useLocalStorage<string[]>("hideIDs", [])

  //   const [filterParams, setFilterParams] = useState<JobListingFilter>({})

  const visibleJobListing = jobListing.filter((job) => {
    return !hideJobIds.includes(job.id)
  })

  const { toast } = useToast()

  function handleJobHidden(id: string, jobTitle: string) {
    setHideJobIds((prevIds) => {
      return [...prevIds, id]
    })
    toast({
      title: "Job hidden",
      description: `${jobTitle} will no longer be shown`,
      action: (
        <ToastAction
          onClick={() => {
            setHideJobIds((prevIds) => {
              return [...prevIds].filter((jobId) => jobId != id)
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
    <>
      <JobListingGrid>
        {visibleJobListing?.map((job) => (
          <PublishedJobCard
            jobListing={job}
            key={job.id}
            onHideJobChange={handleJobHidden}
          />
        ))}
      </JobListingGrid>
    </>
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
        <div className="flex -mr-3 -mt-3">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => onHideJobChange(jobListing.id, jobListing.title)}
          >
            <EyeOffIcon className="w-4 h-4 " />
            <div className="sr-only">Hide</div>
          </Button>

          <Button size="icon" variant="ghost" className="rounded-full">
            <Heart className="w-4 h-4 " />
            <div className="sr-only">Favorite</div>
          </Button>
        </div>
      }
      job={jobListing}
      footerBtns={<JobListingDetailDialog job={jobListing} />}
    ></JobListingCard>
  )
}

export default PublishedJobListingGrid
