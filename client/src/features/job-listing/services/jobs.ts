import { baseApi } from "@/services/baseApi";
import { jobListingFormSchema } from '../../../../../api/src/constants/schemas/jobListings';
import { z } from "zod";
import { JOB_LISTING_DURATIONS } from '../../../../../api/src/constants/types';
import { jobListingSchema } from "../constants/schema";

/**
 * GET /job-listings/my-listings
 * This route will return all the job listings for the currently logged in user (even if they are not published
 */

export function getAllMyListings() {
    return baseApi.get('/job-listings/my-listings').then(res => z.array(jobListingSchema).parseAsync(res.data))
}


/**
 * GET /job-listings/published
 * This route will return all the published job listings. This is useful for getting the job listings to display on the job board.
 */
export function getPublishedListings() {
    return baseApi.get('job-listings/published').then(res => z.array(jobListingSchema).parseAsync(res.data))
}

/**
 * POST /job-listings
 * This route will create a new job listing for the currently logged in user. It will return the new job listing that was created.
 */
export function createNewJobListing(data: z.infer<typeof jobListingFormSchema>) {
    return baseApi.post('/job-listings', data).then(res => jobListingFormSchema.parseAsync(res.data))
}

export function deleteListing(id: string) {
    return baseApi.delete(`/job-listings/${id}`)
}

export function getJobListing(id: string) {
    return baseApi.get(`/job-listings/${id}`).then(
        res => jobListingFormSchema.parseAsync(res.data)
    )
}

/**
 * @param id 
 * PUT /job-listings/:id - This route will update the job listing with the given id. This will only work if the user is authenticated and the owner of the job listing. It will return the updated job listing.
 */
export function editJobListing(id: string, data: z.infer<typeof jobListingFormSchema>) {
    return baseApi.put(`/job-listings/${id}`, data).then(
        res => jobListingFormSchema.parseAsync(res.data)
    )
}

export function createPublishPaymentIntent(
    id: string,
    duration: (typeof JOB_LISTING_DURATIONS)[number]
) {
    return baseApi
        .post<{ clientSecret: string }>(
            `/job-listings/${id}/create-publish-payment-intent`,
            { duration }
        )
        .then(res => res.data)
}