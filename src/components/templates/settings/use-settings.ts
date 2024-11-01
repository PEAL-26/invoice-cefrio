import { companyService, getCompanyFirst } from "@/services/companies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { companySchema, CompanySchemaType } from "./schema";
import {
  toastResponseError,
  toastResponseRegisterSuccess,
} from "@/helpers/response/response";
import { createFormData } from "@/helpers/form-data";
import { useMultipleFileUploads } from "@/hooks/use-multiple-file-uploads";
import { useVercelBlobUpload } from "@/hooks/use-vercel-blob-upload";

export function useSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const { uploads, progress: uploadProgress } = useMultipleFileUploads();
  const vercel = useVercelBlobUpload();

  const form = useForm<CompanySchemaType>({
    resolver: zodResolver(companySchema),
    mode: "onChange",
  });

  const handleSubmit = async (data: CompanySchemaType) => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      let logo = undefined;
      if (data.logo?.file) {
        // const imageFormData = createFormData(data.logo?.file);
        const blob = await vercel.upload(data.logo.file)
        
        console.log(blob);
    
        // const [imageFileName] = await uploads([imageFormData]);
        // logo =
        //   imageFileName && imageFileName?.length > 0
        //     ? imageFileName[0]
        //     : undefined;
      }

      // await companyService.create({
      //   ...data,
      //   logo,
      // });

      // toastResponseRegisterSuccess(data?.id);
      // await loadingCompany();
    } catch (error) {
      toastResponseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadingCompany = async () => {
    const company = await getCompanyFirst();

    if (company) {
      form.setValue("id", company.id);
      form.setValue("name", company.name);
      form.setValue("telephone", company?.telephone || undefined);
      form.setValue("address", company?.address || undefined);
      form.setValue("email", company?.email || undefined);
      form.setValue("site", company?.site || undefined);
      form.setValue("taxpayer", company?.taxpayer || undefined);
      form.setValue("location", company?.location || undefined);
      form.setValue("logo.url", company?.logo || undefined);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoadingPage(true);
      await loadingCompany();
      setIsLoadingPage(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
    isLoading,
    isLoadingPage,
    uploadProgress,
  };
}
