import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { JobListing } from "../constants/types"
import { Badge } from "@/components/ui/badge"
import {
  Banknote,
  CalendarDays,
  ExternalLink,
  GraduationCap,
} from "lucide-react"
import { formatCurrency } from "@/utils/formatters"
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"

type JobListingDetailDialogProps = {
  job: JobListing
}

const JobListingDetailDialog = ({ job }: JobListingDetailDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View More</Button>
      </DialogTrigger>
      <DialogContent>
        {" "}
        <DialogHeader>
          <div className="flex gap-4 justify-between">
            <div>
              <DialogTitle className="text-lg flex justify-between">
                {job.title}
              </DialogTitle>
              <DialogDescription className="flex flex-col">
                <div>{job.companyName}</div>
                <div>{job.location}</div>
              </DialogDescription>
            </div>
          </div>

          <div className="flex gap-1 justify-start flex-wrap">
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <Banknote className="w-4 h-4"></Banknote>
              {formatCurrency(job.salary)}
            </Badge>
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <CalendarDays className="w-4 h-4"></CalendarDays>
              {job.type}
            </Badge>
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <GraduationCap className="w-4 h-4"></GraduationCap>
              {job.experienceLevel}
            </Badge>
          </div>
          <div></div>
        </DialogHeader>
        <div>
          <Button asChild>
            <a href={job.applyUrl}>
              {" "}
              Apply On Company Site
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <MarkdownRenderer className="overflow-y-auto pr-6">
          {job.description}
        </MarkdownRenderer>
      </DialogContent>
    </Dialog>
  )
}

export default JobListingDetailDialog
