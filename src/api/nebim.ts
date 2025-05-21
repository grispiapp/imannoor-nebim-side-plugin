export const NEBIM_API_URL = "https://imannoor.grispi.app";

type OrderListItem = {
  OrderDate: string;
  DocumentNumber: string;
  OrderNumber: string;
  Cancellable: number;
  OrderStatus: string;
};

export type SearchOrderByPhonePayload = {
  phone: string;
};

export type SearchOrderByPhoneResponse = {
  statusCode: number;
  data: OrderListItem[];
};

export const searchOrderByPhone = async (
  phoneNumber: string,
  options: {
    token: string;
  }
): Promise<SearchOrderByPhoneResponse> => {
  const response = await fetch(
    `${NEBIM_API_URL}/nebim/search-orders-by-phone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options.token}`,
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Sipariş aranamadı");
  }

  return response.json();
};
