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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { useToast } from "@/components/ui/use-toast"
import {
  createPublishPaymentIntent,
  deleteListing,
} from "@/features/job-listing/services/jobs"
import { stripePromise } from "@/lib/stripe"
import { formatCurrency } from "@/utils/formatters"
import { Elements } from "@stripe/react-stripe-js"
import { differenceInDays, formatDistanceStrict, isAfter } from "date-fns"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { JOB_LISTING_DURATIONS } from "../../../../../api/src/constants/types"
import { getJobListingPriceInCents } from "../../../../../api/src/utils/getJobListingPriceInCents"
import { useTheme } from "../../../hooks/useTheme"
import { JobListing } from "../constants/types"
import { CheckoutForm } from "./CheckoutForm"
import JobListingCard from "./JobListingCard"
import JobListingGrid from "./JobListingGrid"

type MyJobListingGridProps = {
  jobListings: JobListing[]
}

const MyJobListingGrid = ({ jobListings }: MyJobListingGridProps) => {
  const [deletedJobListingIds, setDeletedJobListingIds] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const visibleJobListing = useMemo(() => {
    return jobListings
      .filter((jobListing) => !deletedJobListingIds.includes(jobListing.id))
      .sort(sortJobListing)
  }, [jobListings, deletedJobListingIds])

  async function deleteJobListing(deletedId: string) {
    setIsDeleting(true)
    try {
      await deleteListing(deletedId)
      setIsDeleting(false)
      setDeletedJobListingIds((ids) => [...ids, deletedId])
      toast({
        title: "Success",
        description: `This job listing is deleted successfully.`,
      })
    } catch {
      setIsDeleting(false)
      toast({
        title: "Error",
        description: `This Job Listing is not deleted successfully.`,
      })
    }
  }
  return (
    <>
      {isDeleting && (
        <div className="flex gap-2 mb-2">
          <LoadingSpinner /> <span className="text-slate-300">Deleting...</span>
        </div>
      )}
      <JobListingGrid>
        {visibleJobListing.map((job) => (
          <MyJobListingCard
            jobListing={job}
            key={job.id}
            deleteJobListing={deleteJobListing}
          />
        ))}
      </JobListingGrid>
    </>
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
  const [selectedDuration, setSelectedDuration] =
    useState<(typeof JOB_LISTING_DURATIONS)[number]>()
  const status = getJobListingStatus(jobListing.expiresAt)
  const [clientSecret, setClientSecret] = useState<string>()
  const { isDark } = useTheme()
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)

  return (
    <JobListingCard
      job={jobListing}
      headerDetails={
        <div>
          <Badge variant={getBadgeStyle(status)} className="rounded">
            {status}
            {status == "Active" &&
              jobListing.expiresAt != null &&
              ` - ${getRemainingActiveDaysText(jobListing.expiresAt)}`}
          </Badge>
        </div>
      }
      footerBtns={
        <>
          <DeleteJobListingDialog
            deleteListing={() => deleteJobListing(jobListing.id)}
          />
          <Button variant="outline">
            <Link to={`/jobs/${jobListing.id}/edit`}>Edit</Link>
          </Button>
          <Dialog
            open={selectedDuration != null}
            onOpenChange={(isOpen) => {
              if (isOpen) return
              setSelectedDuration(undefined)
              setClientSecret("")
            }}
          >
            <DialogContent>
              <DialogTitle>{`${getJobListingButtonText(status)} Job Listing: ${
                jobListing.title
              } for ${selectedDuration} days`}</DialogTitle>
              <DialogDescription>
                This is a non-refundable purchase.
              </DialogDescription>
              {clientSecret &&
                selectedDuration != null &&
                (isPaymentLoading ? (
                  "loading"
                ) : (
                  <Elements
                    options={{
                      clientSecret,
                      appearance: { theme: isDark ? "night" : "stripe" },
                    }}
                    stripe={stripePromise}
                  >
                    <CheckoutForm
                      amount={getJobListingPriceInCents(selectedDuration) / 100}
                    />
                  </Elements>
                ))}
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{getJobListingButtonText(status)}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {JOB_LISTING_DURATIONS.map((duration) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    setSelectedDuration(duration)
                    setIsPaymentLoading(true)
                    const { clientSecret } = await createPublishPaymentIntent(
                      jobListing.id,
                      duration
                    )
                    setClientSecret(clientSecret)
                    setIsPaymentLoading(false)
                  }}
                >
                  {duration} Days -{" "}
                  {formatCurrency(getJobListingPriceInCents(duration) / 100)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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

function getJobListingStatus(expiresAt: Date | null): string {
  if (expiresAt == null) return "Draft"
  if (isAfter(expiresAt, new Date())) {
    return "Active"
  } else {
    return "Expired"
  }
}

function getRemainingActiveDaysText(expiresAt: Date) {
  return `${formatDistanceStrict(expiresAt, new Date(), {
    unit: "day",
  })} days left.`
}

function getBadgeStyle(status: ReturnType<typeof getJobListingStatus>) {
  switch (status) {
    case "Active":
      return "default"
    case "Draft":
      return "secondary"
    case "Expired":
      return "destructive"
  }
}

function getJobListingButtonText(
  status: ReturnType<typeof getJobListingStatus>
) {
  switch (status) {
    case "Active":
      return "Extend"
    case "Draft":
      return "Publish"
    case "Expired":
      return "Republish"
  }
}

function sortJobListing(a: JobListing, b: JobListing) {
  if (a.expiresAt == b.expiresAt) {
    return 0
  } else if (a.expiresAt == null) {
    return -1
  } else if (b.expiresAt == null) {
    return 1
  } else {
    return differenceInDays(a.expiresAt, b.expiresAt)
  }
}

export default MyJobListingGrid
