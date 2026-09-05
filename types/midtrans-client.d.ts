declare module "midtrans-client" {
  interface CustomerDetails {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;

    billing_address?: {
      first_name?: string;
      last_name?: string;
      email?: string;
      phone?: string;
      address?: string;
      city?: string;
      postal_code?: string;
      country_code?: string;
    };
  }

  interface ItemDetail {
    id?: string;
    price: number;
    quantity: number;
    name: string;
    brand?: string;
    category?: string;
    merchant_name?: string;
  }

  interface SnapParameter {
    transaction_details: {
      order_id: string;
      gross_amount: number;
    };

    customer_details?: CustomerDetails;

    item_details?: ItemDetail[];

    credit_card?: {
      secure?: boolean;
    };

    enabled_payments?: string[];

    callbacks?: {
      finish?: string;
    };
  }

  export class Snap {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });

    createTransaction(
      parameter: SnapParameter
    ): Promise<{
      token: string;
      redirect_url?: string;
    }>;

    createTransactionToken(
      parameter: SnapParameter
    ): Promise<string>;
  }
}