import { z } from "zod";
import { jobListingFormSchema } from "./schema";

export type JobListing = z.infer<typeof jobListingFormSchema>