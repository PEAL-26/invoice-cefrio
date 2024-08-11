import { z } from "zod";
import { randomUUID } from "crypto";
import { prisma } from "../../../libs/prisma";
import { Prisma } from "@prisma/client";
import { getAllParams } from "../../../helpers/search-params";
import { NextRequest, NextResponse } from "next/server";
import { responseError } from "../../../helpers/response/route-response";
import { paginationData, setPagination } from "../../../helpers/pagination";

const listParamsSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});

export async function GET(req: NextRequest, res: NextResponse) {
  const { q = "", page, size } = listParamsSchema.parse(getAllParams(req.url));
  const { limit: take, offset: skip } = setPagination({ size, page });

  const queryParams: Prisma.ProductWhereInput = {
    OR: [
      {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
    ],
  };

  const [total, products] = await Promise.all([
    prisma.product.count({
      where: queryParams,
    }),
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        unitMeasure: true,
        price: true,
        iva: true,
      },
      where: queryParams,
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: products,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string({ required_error: "Campo Obrigatório." }),
  unitMeasure: z.string().optional(),
  price: z.coerce.string().optional(),
  iva: z.coerce.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      id = randomUUID(),
      name,
      unitMeasure,
      price,
      iva,
    } = productSchema.parse(data);

    await prisma.product.upsert({
      create: {
        id,
        name,
        unitMeasure,
        price,
        iva,
      },
      update: { name, unitMeasure, price, iva },
      where: { id },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
