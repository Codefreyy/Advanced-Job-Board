
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    JOB_LISTING_EXPERIENCE_LEVELS,
    JOB_LISTING_TYPES
} from "../constants/schema"
import { JobListing } from "../constants/types"

const jobListingFilterFormSchema = z.object({
    title: z.string(),
    location: z.string(),
    type: z.enum(JOB_LISTING_TYPES).or(z.literal("")),
    minimumSalary: z.number().or(z.nan()),
    experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS).or(z.literal("")),
    showHidden: z.boolean(),
    onlyShowFavorites: z.boolean(),
})

export type JobListingFilterValues = z.infer<typeof jobListingFilterFormSchema>

export const DEFAULT_VALUES: JobListingFilterValues = {
    title: "",
    location: "",
    type: "",
    minimumSalary: 0,
    experienceLevel: "",
    showHidden: false,
    onlyShowFavorites: false,
}


export function useJobListingFilterForm() {
    const form = useForm<JobListingFilterValues>({
        resolver: zodResolver(jobListingFilterFormSchema),
        defaultValues: DEFAULT_VALUES,
        mode: "onChange",
    })

    const values = form.watch()

    function getFilteredJobListings(
        jobListings: JobListing[],
        hiddenIds: string[],
        favoriteIds: string[]
    ) {
        return jobListings.filter(job => {
            if (!job.title.toLowerCase().match(values.title.toLowerCase())) {
                return false
            }

            if (
                !job.location.toLowerCase().match(values.location.toLowerCase())
            ) {
                return false
            }

            if (
                !isNaN(values.minimumSalary) &&
                job.salary < values.minimumSalary
            ) {
                return false
            }

            if (values.type !== "" && job.type !== values.type) {
                return false
            }

            if (
                values.experienceLevel !== "" &&
                job.experienceLevel !== values.experienceLevel
            ) {
                return false
            }

            if (!values.showHidden && hiddenIds.includes(job.id)) {
                return false
            }

            if (values.onlyShowFavorites && !favoriteIds.includes(job.id)) {
                return false
            }

            return true
        })
    }
    return { form, getFilteredJobListings }
}