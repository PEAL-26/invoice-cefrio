import { responseError } from "../../../../helpers/response/route-response";
import { prisma } from "../../../../libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = paramsSchema.parse(params);

    const response = await prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        payments: true,
        products: true,
      },
    });

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    return responseError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params, ...rest }: { params: { id: string } }
) {
  try {
    const { id } = paramsSchema.parse(params);

    await prisma.invoice.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return responseError(error);
  }
}
