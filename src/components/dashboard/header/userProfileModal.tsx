import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import UserProfileCard, { User } from "./userProfileCard"

interface Props {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UserProfileModal({ user, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-2 border-none bg-transparent shadow-none dark:bg-transparent">
        <DialogTitle className="sr-only">Perfil de usuario</DialogTitle>
        <DialogDescription className="sr-only">
        </DialogDescription>
        <UserProfileCard user={user} />
      </DialogContent>
    </Dialog>
  )
}