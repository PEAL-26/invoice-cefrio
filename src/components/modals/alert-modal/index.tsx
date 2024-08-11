import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { DeleteModalProps } from './types';

export function AlertModal(props: DeleteModalProps) {
  const {
    open,
    onOpenChange,
    onOk,
    title = 'Você tem certeza absoluta?',
    descriptions = 'Essa ação não pode ser desfeita. Isso excluirá permanentemente os dados da base de  dados.',
    cancelText = 'Cancelar',
    okText = 'Remover',
  } = props;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{descriptions}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onOk} className="text-white">
            {okText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
