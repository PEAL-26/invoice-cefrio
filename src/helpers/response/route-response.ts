import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { INTERNAL_SERVER_ERROR_MESSAGE } from './messages';

export function responseError(error: any) {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const meta = error.meta as any;
      return NextResponse.json(
        { errors: [{ message: `O ${meta?.target[0]} já existe.` }] },
        { status: 400 },
      );
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { errors: [{ message: `Recurso não encontrado.` }] },
        { status: 400 },
      );
    }
  }
  
  if (error instanceof ZodError) {
    const errors = error.errors.map((err) => ({ message: `${err.path[0]} ${err.message}` }));
    return NextResponse.json({ errors }, { status: 400 });
  }

  return NextResponse.json(
    { errors: [{ message: INTERNAL_SERVER_ERROR_MESSAGE }] },
    { status: 500 },
  );
}
