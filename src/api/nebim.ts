export const NEBIM_API_URL = "http://localhost:8080";

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

export type SearchOrderByPhoneResponse = OrderListItem[];

export const searchOrderByPhone = async (
  phoneNumber: string
): Promise<SearchOrderByPhoneResponse> => {
  const response = await fetch(`${NEBIM_API_URL}/search-orders-by-phone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_number: phoneNumber,
    }),
  });

  if (!response.ok) {
    throw new Error("Sipariş aranamadı");
  }

  return response.json();
};
