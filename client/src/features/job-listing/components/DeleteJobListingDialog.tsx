import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const DeleteJobListingDialog = ({
  deleteListing,
}: {
  deleteListing: () => void
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="ghost">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          Are you sure you want to delete this job listing?
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your job
          listing and any remaining time will not be refunded.
        </AlertDialogDescription>
        <AlertDialogFooter onClick={deleteListing}>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteJobListingDialog
