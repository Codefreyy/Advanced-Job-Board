import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import {
  JobListingFilterForm,
  JobListingGrid,
  JobListingSkeletonGrid,
  PublishedJobCard,
  useJobListingFilterForm,
} from "@/features/job-listing"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { loader } from "./Loader"

export function JobListings() {
  const [hideJobIds, setHideJobIds] = useLocalStorage<string[]>(
    "hideJobIDs",
    []
  )
  const [favoriteJobIds, setFavoriteJobIds] = useLocalStorage<string[]>(
    "favoriteJobIds",
    []
  )
  const { jobListingPromise } = useDeferredLoaderData<typeof loader>()
  const { form, getFilteredJobListings } = useJobListingFilterForm()

  const { toast } = useToast()

  function handleJobHiddenChange(id: string, jobTitle: string) {
    setHideJobIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((jobId) => jobId !== id)
      }
      return [...prevIds, id]
    })

    if (hideJobIds.includes(id)) return

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
          altText="Click show hidden in the filter section to show hidden jobs 
          and then click the show button in the card to show the job again "
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

  return (
    <>
      <PageHeader
        btnSection={
          <Button variant="outline" asChild className="whitespace-nowrap">
            <Link to="/jobs/new">Create Listing</Link>
          </Button>
        }
      >
        Job Listings
      </PageHeader>
      <JobListingFilterForm form={form} />
      <Suspense fallback={<JobListingSkeletonGrid amount={6} />}>
        <Await resolve={jobListingPromise}>
          {(jobListings) => {
            const filteredJobs = getFilteredJobListings(
              jobListings,
              hideJobIds,
              favoriteJobIds
            )

            if (!filteredJobs || !filteredJobs.length) {
              return (
                <div className="text-slate-400">
                  No matching job Listings found
                </div>
              )
            }
            return (
              <JobListingGrid>
                {filteredJobs?.map((job) => {
                  return (
                    <PublishedJobCard
                      jobListing={job}
                      key={job.id}
                      onHideJobChange={handleJobHiddenChange}
                      onFavoriteJobChange={handleFavoriteJobChange}
                      isFavorite={favoriteJobIds.includes(job.id)}
                      isHidden={hideJobIds.includes(job.id)}
                    />
                  )
                })}
              </JobListingGrid>
            )
          }}
        </Await>
      </Suspense>
    </>
  )
}
