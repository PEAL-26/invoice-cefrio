import { END_CONSUMER } from '@/constants/customer';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { paginationData, setPagination } from '../../../helpers/pagination';
import { responseError } from '../../../helpers/response/route-response';
import { getAllParams } from '../../../helpers/search-params';
import { prisma } from '../../../libs/prisma';

const listParamsSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});

export async function GET(req: NextRequest, res: NextResponse) {
  const { q = '', page, size } = listParamsSchema.parse(getAllParams(req.url));
  const { limit: take, offset: skip } = setPagination({ size, page });

  const queryParams: Prisma.CustomerWhereInput = {
    OR: [
      {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
      {
        telephone: {
          contains: q,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: q,
          mode: 'insensitive',
        },
      },
    ],
    id: {
      not: END_CONSUMER.id,
    },
  };

  const [total, customers] = await Promise.all([
    prisma.customer.count({
      where: queryParams,
    }),
    prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        taxpayer: true,
      },
      where: queryParams,
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: customers,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

const customerSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string({ required_error: 'Campo Obrigatório.' }),
  address: z.string().optional(),
  location: z.string().optional(),
  email: z.string().optional(),
  taxpayer: z.string().optional(),
  telephone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      id = randomUUID(),
      name,
      address,
      location,
      email,
      taxpayer,
      telephone,
    } = customerSchema.parse(data);

    let customer = await prisma.customer.findFirst({ where: { id } });

    if (customer) {
      customer = await prisma.customer.update({
        data: {
          name,
          address,
          location,
          email,
          taxpayer,
          telephone,
        },
        where: { id },
      });
    } else {
      customer = await prisma.customer.create({
        data: {
          id,
          name,
          address,
          location,
          email,
          taxpayer,
          telephone,
        },
      });
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
