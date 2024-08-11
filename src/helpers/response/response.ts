import { toast } from '@/components/ui/use-toast';
import { AxiosError, AxiosResponse } from 'axios';
import { INTERNAL_SERVER_ERROR_MESSAGE } from './messages';

export function getResponse<T = any, D = any>(response: AxiosResponse<T, D>) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
}

export function toastResponseError(error: any) {
  let message = INTERNAL_SERVER_ERROR_MESSAGE;
  
  if (error instanceof Error) {
    message = error.message;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as any;
    if (data?.errors) {
      message = data.errors
        .map((_error: any) => _error.message)
        .join(', ')
        .toString();
    }
  }

  toast({
    duration: 5000,
    variant: 'destructive',
    title: 'Oops! Algo deu errado.',
    description: message,
  });
}

export function toastResponseRegisterSuccess(id: string | null | undefined) {
  toast({
    duration: 5000,
    variant: 'success',
    title: 'Sucesso',
    description: `Registro ${id ? 'alterado' : 'feito'} com sucesso`,
  });
}
