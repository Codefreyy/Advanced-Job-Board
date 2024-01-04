import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Control, FieldValues, Path, PathValue, useForm } from "react-hook-form"
import { z } from "zod"

const JOB_LISTING_TYPES = [
  "Full Time",
  "Part Time",
  "Internship",
  "Any",
] as const
const JOB_LISTING_EXPERIENCE_LEVELS = [
  "Junior",
  "Mid-Level",
  "Senior",
  "Any",
] as const

const jobListingFilterFormSchema = z.object({
  title: z.string(),
  location: z.string(),
  type: z.enum(JOB_LISTING_TYPES),
  salary: z.number(),
  experienceLevel: z.enum(JOB_LISTING_EXPERIENCE_LEVELS),
})

type JobListingFilterValues = z.infer<typeof jobListingFilterFormSchema>

const DEFAULT_VALUES: JobListingFilterValues = {
  title: "",
  location: "",
  type: "Any",
  salary: 0,
  experienceLevel: "Any",
}

type JobListingFilterFormProps = {
  onSubmit: (jobFilters: JobListingFilterValues) => void
  initialFilter?: JobListingFilterValues
}

function JobListingFilterForm({
  onSubmit,
  initialFilter = DEFAULT_VALUES,
}: JobListingFilterFormProps) {
  const form = useForm<JobListingFilterValues>({
    resolver: zodResolver(jobListingFilterFormSchema),
    defaultValues: initialFilter,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <JobSelectFormField
            control={form.control}
            name="type"
            label="Type"
            options={JOB_LISTING_TYPES}
          />
          <JobSelectFormField
            control={form.control}
            name="experienceLevel"
            label="Experience Level"
            options={JOB_LISTING_EXPERIENCE_LEVELS}
          />
        </div>
      </form>
    </Form>
  )
}

type JobSelectFormFieldProps<T extends FieldValues> = {
  label: string
  control: Control<T>
  name: Path<T>
  options: readonly PathValue<T, Path<T>>[]
}

function JobSelectFormField<T extends FieldValues>({
  label,
  control,
  name,
  options,
}: JobSelectFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(val) =>
              field.onChange(val as PathValue<T, Path<T>>)
            }
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

export default JobListingFilterForm
