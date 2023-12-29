import { Button } from "@/components/ui/button"
import { deleteListing } from "@/features/job-listing/services/jobs"
import { useState } from "react"
import { Link } from "react-router-dom"
import { JobListing } from "../constants/types"
import JobListingCard from "./JobListingCard"
import JobListingGrid from "./JobListingGrid"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type MyJobListingGridProps = {
  jobListings: JobListing[]
}

const MyJobListingGrid = ({ jobListings }: MyJobListingGridProps) => {
  const [deletedJobListingIds, setDeletedJobListingIds] = useState<string[]>([])

  const visibleJobListing = jobListings.filter(
    (jobListing) => !deletedJobListingIds.includes(jobListing.id)
  )

  async function deleteJobListing(deletedId: string) {
    await deleteListing(deletedId)
    setDeletedJobListingIds((ids) => [...ids, deletedId])
  }
  return (
    <JobListingGrid>
      {visibleJobListing.map((job) => (
        <MyJobListingCard
          jobListing={job}
          key={job.id}
          deleteJobListing={deleteJobListing}
        />
      ))}
    </JobListingGrid>
  )
}

type MyJobListingCardProps = {
  jobListing: JobListing
  deleteJobListing: (id: string) => void
}

function MyJobListingCard({
  jobListing,
  deleteJobListing,
}: MyJobListingCardProps) {
  return (
    <JobListingCard
      job={jobListing}
      footerBtns={
        <>
          <DeleteJobListingDialog
            deleteListing={() => deleteJobListing(jobListing.id)}
          />
          <Button variant="outline">
            <Link to={`/jobs/${jobListing.id}/edit`}>Edit</Link>
          </Button>
        </>
      }
    />
  )
}

const DeleteJobListingDialog = ({
  deleteListing,
}: {
  deleteListing: () => void
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="ghost">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          Are you sure you want to delete this job listing?
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your job
          listing and any remaining time will not be refunded.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteListing}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MyJobListingGrid
