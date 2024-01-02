import { loader } from "./loader"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { PageHeader } from "@/components/ui/PageHeader"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Suspense } from "react"

export function OrderCompletePage() {
  const { messagePromise } = useDeferredLoaderData<typeof loader>()

  return (
    <div className="flex flex-col items-center">
      <PageHeader
        subtitle={
          <Suspense fallback="Payment processing...">
            <Await resolve={messagePromise}>{(message) => message}</Await>
          </Suspense>
        }
      >
        Order Complete
      </PageHeader>
      <Button asChild>
        <Link to="/jobs/my-listings">View your job listings</Link>
      </Button>
    </div>
  )
}
