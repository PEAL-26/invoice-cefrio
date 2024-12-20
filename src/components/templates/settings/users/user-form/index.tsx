'use client';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { CheckboxFormFieldControl, InputFormFieldControl } from '@/components/ui/form-fields';
import { Loading } from '@/components/ui/loading';

import { UserFormProps } from './types';
import { useUserForm } from './use-user-form';

export function UserForm(props: UserFormProps) {
  const { userId, onCancel } = props;
  const { isLoadingData, isSaving, form, handleSubmit } = useUserForm(props);

  if (isLoadingData) return <Loading />;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputFormFieldControl
            label="Nome"
            control={form.control}
            name="name"
            isLoading={isSaving}
          />
        </div>
        <div>
          <InputFormFieldControl
            label="Abreviação"
            control={form.control}
            name="abbreviation"
            isLoading={isSaving}
          />
        </div>
        <div>
          <InputFormFieldControl
            label="Conta"
            control={form.control}
            name="account"
            isLoading={isSaving}
          />
        </div>
        <div>
          <InputFormFieldControl
            label="IBAN"
            control={form.control}
            name="iban"
            isLoading={isSaving}
          />
        </div>
        <div>
          <CheckboxFormFieldControl
            label="Mostrar na Factura?"
            control={form.control}
            name="show"
            isLoading={isSaving}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">{userId ? 'Salvar Alterações' : 'Adicionar'}</Button>
        </div>
      </form>
    </FormProvider>
  );
}
