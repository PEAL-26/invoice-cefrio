export interface DeleteModalProps {
  open?: boolean;
  onOpenChange?(open: boolean): void;
  onOk?(): void;
  title?: string;
  descriptions?: string;
  cancelText?: string;
  okText?: string;
}
