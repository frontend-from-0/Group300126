import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface WarningDialogProps {
  open: boolean;
  title?: string;
  description?: string | ReactNode;
  onClose: () => void;
}

export function WarningDialog({ open, title, description, onClose}: WarningDialogProps) {
  return (
  <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
    <DialogContent>
      <DialogHeader>
        {!!title ? <DialogTitle>{title}</DialogTitle> : <></>}
        {!!description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : (
          <></>
        )}
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}
