import { z } from "zod";

export const productSchema = z.object({
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
  unitMeasure: z.string().optional().default(""),
  price: z.coerce.number().optional().default(0),
  iva: z.coerce.number().optional().default(0),
});

export type ProductSchemaType = z.infer<typeof productSchema>;

export const defaultValues: Partial<ProductSchemaType> = {};
