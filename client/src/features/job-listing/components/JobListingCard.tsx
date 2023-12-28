import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency } from "@/utils/formatters"
import { cn } from "@/utils/shadcnUtils"
import { Banknote, CalendarDays, GraduationCap } from "lucide-react"
import { ReactNode } from "react"
import { JobListing } from "../constants/types"

type JobListingCardProps = {
  className?: string
  job: JobListing
  headerDetails?: ReactNode
  footerBtns?: ReactNode
}

const JobListingCard = ({
  className,
  job,
  headerDetails,
  footerBtns,
}: JobListingCardProps) => {
  return (
    <Card className={cn("h-full flex flex-col", className)} key={job.id}>
      <CardHeader>
        <div className="flex gap-4 justify-between">
          <div>
            <CardTitle className="text-lg flex justify-between">
              {job.title}
            </CardTitle>
            <CardDescription className="flex flex-col">
              <div>{job.companyName}</div>
              <div>{job.location}</div>
            </CardDescription>
          </div>
          {headerDetails}
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
      </CardHeader>

      <CardContent className="flex-grow">{job.description}</CardContent>
      <CardFooter className="flex justify-end gap-2 items-stretch">
        {/* <Button variant="ghost">Delelte</Button>
        <Button variant="outline">Edit</Button>
        <Button type="submit">Publish</Button> */}
      </CardFooter>
    </Card>
  )
}

export default JobListingCard
