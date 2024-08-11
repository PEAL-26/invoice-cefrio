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

  const queryParams: Prisma.InvoiceWhereInput = {
    OR: [],
  };

  const [total, invoices] = await Promise.all([
    prisma.invoice.count({
      where: queryParams,
    }),
    prisma.invoice.findMany({
      select: {
        id: true,
        number: true,
        type: true,
        customer: true,
        total: true,
      },
      where: queryParams,
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: invoices,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

const invoiceSchema = z.object({
  id: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { id = randomUUID() } = invoiceSchema.parse(data);

    // await prisma.invoice.upsert({
    //   create: {
    //     id,
    //   },
    //   update: {},
    //   where: { id },
    // });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
