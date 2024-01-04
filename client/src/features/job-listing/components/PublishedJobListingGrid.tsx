import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { cn } from "@/utils/shadcnUtils"
import { EyeOffIcon, Heart, HeartCrack } from "lucide-react"
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
  const [hideJobIds, setHideJobIds] = useLocalStorage<string[]>(
    "hideJobIDs",
    []
  )
  const [favoriteJobIds, setFavoriteJobIds] = useLocalStorage<string[]>(
    "favoriteJobIds",
    []
  )

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

  function handleFavoriteJobChange(id: string) {
    setFavoriteJobIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((jobId) => jobId !== id)
      }
      return [...prevIds, id]
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
            onFavoriteJobChange={handleFavoriteJobChange}
            isFavorite={favoriteJobIds.includes(job.id)}
          />
        ))}
      </JobListingGrid>
    </>
  )
}

type PublishedJobCardProps = {
  jobListing: JobListing
  onHideJobChange: (jobId: string, jobTitle: string) => void
  onFavoriteJobChange: (jobId: string) => void
  isFavorite: boolean
}

function PublishedJobCard({
  jobListing,
  onHideJobChange,
  onFavoriteJobChange,
  isFavorite,
}: PublishedJobCardProps) {
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

          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => onFavoriteJobChange(jobListing.id)}
          >
            <Heart
              className={cn(
                "w-4 h-4 ",
                isFavorite && "fill-red-500 stroke-red-500"
              )}
            />
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
