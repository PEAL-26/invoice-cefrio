"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useList } from "./use-list";
import { CreateEditCustomerDialog } from "./create-edit-modal";
import { ReactLoading } from "@/libs/react-loading";

export function ListCustomers() {
  const {
    response,
    handleOpenDialog,
    id,
    isOpenDialog,
    setIsOpenDialog,
    handleDelete,
  } = useList();

  return (
    <>
      <div className="flex-col space-y-8 flex h-full">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Clientes</h2>
            <p className="text-muted-foreground">Listagem de clientes</p>
          </div>

          <Button onClick={() => handleOpenDialog()}>Novo</Button>
        </div>
        {response.isLoading && !response.isError ? (
          <div className="flex justify-center items-center  h-full">
            <ReactLoading
              type="spinningBubbles"
              color={"#1B3D7A"}
              height={90}
              width={90}
            />
          </div>
        ) : (
          <DataTable
            response={response}
            columns={columns({
              onEdit: handleOpenDialog,
              onDelete: handleDelete,
            })}
          />
        )}
      </div>
      <CreateEditCustomerDialog
        id={id}
        onClose={setIsOpenDialog}
        open={isOpenDialog}
      />
    </>
  );
}
