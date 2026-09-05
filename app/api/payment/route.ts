import { NextRequest, NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { prisma } from "@/lib/prisma";

type CheckoutItem = {
  id?: string;
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CheckoutBody = {
  items: CheckoutItem[];

  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
};

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutBody;

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        {
          error: "Cart kosong",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.firstName || !body.email) {
      return NextResponse.json(
        {
          error: "Nama dan email wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    const total = body.items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0,
    );

    if (!Number.isFinite(total) || total <= 0) {
      return NextResponse.json(
        {
          error: "Total transaksi tidak valid",
        },
        {
          status: 400,
        },
      );
    }

    const orderNumber = `SC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await prisma.order.create({
      data: {
        id: crypto.randomUUID(),

        orderNumber,

        status: "PENDING",

        total: Math.round(total),

        firstName: body.firstName,

        lastName: body.lastName || null,

        email: body.email,

        phone: body.phone || null,

        address: body.address || null,

        city: body.city || null,

        zipCode: body.zipCode || null,

        items: {
          create: body.items.map((item) => ({
            id: crypto.randomUUID(),

            productId: item.productId || item.id || null,

            name: item.name,

            price: Math.round(Number(item.price)),

            quantity: Number(item.quantity),

            image: item.image || null,
          })),
        },
      },

      include: {
        items: true,
      },
    });

    /**
     * MIDTRANS
     */
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: order.orderNumber,

        gross_amount: order.total,
      },

      customer_details: {
        first_name: order.firstName,

        last_name: order.lastName || "",

        email: order.email,

        phone: order.phone || "",
      },
    });

    /**
     * Simpan Snap Token
     */
    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        snapToken: transaction.token,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      snapToken: transaction.token,
    });
  } catch (error) {
    console.error("PAYMENT CREATE ERROR:", error);

    return NextResponse.json(
      {
        error: "Gagal membuat pembayaran",
      },
      {
        status: 500,
      },
    );
  }
}
