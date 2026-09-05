import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: {
    params: {
      orderNumber: string;
    };
  },
) {
  try {
    const order =
      await prisma.order.findUnique({
        where: {
          orderNumber:
            context.params.orderNumber,
        },
        include: {
          items: true,
        },
      });

    if (!order) {
      return NextResponse.json(
        {
          error: "Order tidak ditemukan",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Gagal mengambil order",
      },
      { status: 500 },
    );
  }
}