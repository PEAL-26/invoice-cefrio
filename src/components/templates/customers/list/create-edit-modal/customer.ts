import { z } from "zod";

export const customerSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .min(2, {
      message: "O nome deve ter pelo menos 2 caracteres",
    })
    .max(255, {
      message: "O nome não deve ter mais de 255 caracteres",
    }),
  address: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email().optional(),
  taxpayer: z.string().optional(),
  telephone: z.string().optional(),
});

export type CustomerSchemaType = z.infer<typeof customerSchema>;

export const defaultValues: Partial<CustomerSchemaType> = {};
