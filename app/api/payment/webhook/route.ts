import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

type MidtransNotification = {
  order_id?: string;
  status_code?: string;
  gross_amount?: string;
  signature_key?: string;
  transaction_status?: string;
  payment_type?: string;
  transaction_id?: string;
  fraud_status?: string;
};

export async function POST(request: NextRequest) {
  try {
    const notification =
      (await request.json()) as MidtransNotification;

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      payment_type,
      transaction_id,
      fraud_status,
    } = notification;

    if (
      !order_id ||
      !status_code ||
      !gross_amount ||
      !signature_key
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Midtrans notification",
        },
        { status: 400 },
      );
    }

    /*
     * Verifikasi signature Midtrans
     *
     * SHA512:
     * order_id + status_code + gross_amount + server_key
     */
    const serverKey =
      process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      console.error(
        "MIDTRANS_SERVER_KEY belum tersedia",
      );

      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error",
        },
        { status: 500 },
      );
    }

    const expectedSignature =
      crypto
        .createHash("sha512")
        .update(
          order_id +
            status_code +
            gross_amount +
            serverKey,
        )
        .digest("hex");

    if (signature_key !== expectedSignature) {
      console.error(
        "Invalid Midtrans signature",
      );

      return NextResponse.json(
        {
          success: false,
          message: "Invalid signature",
        },
        { status: 403 },
      );
    }

    /*
     * Cari order berdasarkan orderNumber
     */
    const order = await prisma.order.findUnique({
      where: {
        orderNumber: order_id,
      },
    });

    if (!order) {
      console.error(
        "Order tidak ditemukan:",
        order_id,
      );

      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 },
      );
    }

    /*
     * Tentukan status order
     */
    let newStatus = order.status;

    if (
      transaction_status === "settlement"
    ) {
      newStatus = "PAID";
    } else if (
      transaction_status === "capture" &&
      fraud_status === "accept"
    ) {
      newStatus = "PAID";
    } else if (
      transaction_status === "pending"
    ) {
      newStatus = "PENDING";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "failure"
    ) {
      newStatus = "FAILED";
    } else if (
      transaction_status === "expire"
    ) {
      newStatus = "EXPIRED";
    }

    /*
     * Update order
     */
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: newStatus,

        paymentType:
          payment_type || order.paymentType,

        transactionId:
          transaction_id ||
          order.transactionId,
      },
    });

    console.log(
      `Order ${order.orderNumber}: ${order.status} -> ${newStatus}`,
    );

    return NextResponse.json({
      success: true,
      orderId: order.orderNumber,
      status: newStatus,
    });
  } catch (error) {
    console.error(
      "MIDTRANS WEBHOOK ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Webhook processing failed",
      },
      { status: 500 },
    );
  }
}