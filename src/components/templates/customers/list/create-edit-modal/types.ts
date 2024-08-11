export interface DialogProps {
  open?: boolean;
  onClose?(state: boolean): void;
  id?: string;
}

export interface UseDialogProps {
  open?: boolean;
  onClose?(state: boolean): void;
  id?: string;
}
