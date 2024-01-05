import JobListingCard from "./JobListingCard"
import JobListingDetailDialog from "./JobListingDetailDialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/shadcnUtils"
import { JobListing } from "../constants/types"
import { EyeOffIcon, EyeIcon, Heart } from "lucide-react"

type PublishedJobCardProps = {
  jobListing: JobListing
  onHideJobChange: (jobId: string, jobTitle: string) => void
  onFavoriteJobChange: (jobId: string) => void
  isFavorite: boolean
  isHidden: boolean
}

function PublishedJobCard({
  jobListing,
  onHideJobChange,
  onFavoriteJobChange,
  isFavorite,
  isHidden,
}: PublishedJobCardProps) {
  const hiddenIcon = isHidden ? (
    <EyeOffIcon className="w-4 h-4" />
  ) : (
    <EyeIcon className="w-4 h-4" />
  )
  return (
    <JobListingCard
      className={isHidden ? "opacity-50" : undefined}
      headerDetails={
        <div className="flex -mr-3 -mt-3">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => onHideJobChange(jobListing.id, jobListing.title)}
          >
            {hiddenIcon}
            <div className="sr-only">{isHidden ? "Hidden" : "Not hidden"}</div>
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
            <div className="sr-only">
              {isFavorite ? "Favorite" : "Not Favorite"}
            </div>
          </Button>
        </div>
      }
      job={jobListing}
      footerBtns={<JobListingDetailDialog job={jobListing} />}
    ></JobListingCard>
  )
}

export { PublishedJobCard }
