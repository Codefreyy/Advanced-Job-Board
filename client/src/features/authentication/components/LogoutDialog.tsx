import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

type LogOutProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const LogoutDialog = ({ isOpen, onOpenChange }: LogOutProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Loggin Out</DialogTitle>
        </DialogHeader>
        <LoadingSpinner className="w-12 h-12"></LoadingSpinner>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutDialog
