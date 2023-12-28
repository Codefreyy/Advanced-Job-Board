import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const JobListingGrid = () => {
  return (
    <section className="grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Card className="w-100" key={idx}>
          <CardHeader>
            <CardTitle className="text-lg">Frontend Developer</CardTitle>
            <CardContent></CardContent>
          </CardHeader>
        </Card>
      ))}
    </section>
  )
}

export default JobListingGrid
