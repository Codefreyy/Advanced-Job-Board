import { baseApi } from "@/services/baseApi";
import { jobListingFormSchema } from '../../../../../api/src/constants/schemas/jobListings';
import { z } from "zod";

/**
 * GET /job-listings/my-listings
 * This route will return all the job listings for the currently logged in user (even if they are not published
 */
export function getAllMyListings() {
    return baseApi.get('/job-listings/my-listings').then(res => z.array(jobListingFormSchema).parseAsync(res.data))
}

/**
 * GET /job-listings/published
 * This route will return all the published job listings. This is useful for getting the job listings to display on the job board.
 */
export function getPublishedListings() {
    return baseApi.get('job-listings/published').then(res => res.data)
}

/**
 * POST /job-listings
 * This route will create a new job listing for the currently logged in user. It will return the new job listing that was created.
 */
export function createNewJobListing(data: z.infer<typeof jobListingFormSchema>) {
    return baseApi.post('/job-listings', data).then(res => jobListingFormSchema.parseAsync(res.data))
}